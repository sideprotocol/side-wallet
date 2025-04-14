import { Psbt } from 'bitcoinjs-lib';
import * as bip341 from 'bitcoinjs-lib/src/payments/bip341';
import { Buffer } from 'buffer';
import { Coin } from 'cosmwasm';

import { isProduction } from '@/shared/constant';
import { toXOnly } from '@unisat/wallet-sdk/lib/utils';

import services from '../services';
import { GetCetInfoResponse } from '../services/lending/types';
import { bitcoin } from './bitcoin-core';

export interface DepositToLendingAgency {
  borrowAmount: Coin;
  collateralAmount: Coin;
  collateralAddress: string;
  restUrl: string;
  feeRate: number;
  cetInfos: GetCetInfoResponse;
}

export function hexPubKeyToTaprootAddress(pubkeyHex: string): string {
  const pubkey = Buffer.from(pubkeyHex, 'hex');
  const xOnlyPubkey = toXOnly(pubkey);
  const { address } = bitcoin.payments.p2tr({
    pubkey: xOnlyPubkey,
    network: isProduction ? bitcoin.networks.bitcoin : bitcoin.networks.testnet
  });

  if (!address) {
    throw new Error('Failed to generate taproot address');
  }

  return address;
}

export async function prepareApply({
  params,
  psbtHex,
  senderAddress,
  depositTxId
}: {
  params: DepositToLendingAgency;
  senderAddress: string;
  psbtHex: string;
  depositTxId: string;
}) {
  const { restUrl, feeRate, collateralAddress, cetInfos } = params;

  const activeAgencies = await services.lending.getDlcDcms({ status: 3 }, { baseURL: restUrl });

  const dcm = activeAgencies?.dcms?.[0];

  if (!dcm) {
    throw new Error('No active dcm found.');
  }

  // send btc to collateral address
  const network = isProduction ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;

  const psbt = Psbt.fromHex(psbtHex, {
    network
  });

  const agencyPsbtToFee = new Psbt({ network });

  const agencyPsbt = new Psbt({ network });
  const collateralOutput = psbt.txOutputs.find(
    (out) => bitcoin.address.fromOutputScript(out.script, network) === collateralAddress
  );
  const collateralOutputIndex = psbt.txOutputs.findIndex(
    (out) => bitcoin.address.fromOutputScript(out.script, network) === collateralAddress
  );

  if (!collateralOutput) {
    throw new Error('Cannot find collateral output in the first transaction');
  }

  //   generate liquidation cet
  agencyPsbt.addInput({
    hash: depositTxId,
    index: collateralOutputIndex,
    witnessUtxo: {
      script: collateralOutput.script,
      value: collateralOutput.value
    }
  });

  agencyPsbtToFee.addInput({
    hash: depositTxId,
    index: collateralOutputIndex,
    witnessUtxo: {
      script: collateralOutput.script,
      value: collateralOutput.value
    }
  });

  const agencyAddress = hexPubKeyToTaprootAddress(dcm.pubkey);

  agencyPsbtToFee.addOutput({
    address: agencyAddress,
    value: collateralOutput.value
  });

  const agencyTxTemp = bitcoin.Transaction.fromBuffer(agencyPsbtToFee.data.getTransaction());

  agencyTxTemp.ins.forEach((_, index) => {
    agencyTxTemp.ins[index].witness = [Buffer.alloc(64), Buffer.alloc(64), Buffer.alloc(70), Buffer.alloc(65)];
  });

  const vsize = agencyTxTemp.virtualSize();
  const feeAmount = Math.ceil(vsize * feeRate);

  agencyPsbt.addOutput({
    address: agencyAddress,
    value: collateralOutput.value - feeAmount
  });

  // generate repayment cet

  const getRepaymentSignatureParams = (refundAddress: string) => {
    const repaymentPsbt = new bitcoin.Psbt({ network });

    repaymentPsbt.addInput({
      hash: depositTxId,
      index: collateralOutputIndex,
      witnessUtxo: {
        script: collateralOutput.script,
        value: collateralOutput.value
      }
    });

    repaymentPsbt.addOutput({
      address: refundAddress || senderAddress,
      value: collateralOutput.value - feeAmount
    });

    const script = Buffer.from(cetInfos.repayment_cet_info.script, 'hex');

    const leafHash = bip341.tapleafHash({
      output: script
    });

    const repaymentTx = bitcoin.Transaction.fromBuffer(repaymentPsbt.data.getTransaction());

    const sighashes = repaymentPsbt.data.inputs.map((_, index) => {
      const sighashType = repaymentPsbt.data.inputs[index].sighashType || bitcoin.Transaction.SIGHASH_DEFAULT;

      const prevOutScripts = repaymentPsbt.data.inputs.map((input) =>
        input.witnessUtxo ? input.witnessUtxo.script : Buffer.alloc(0)
      );
      const prevOutValues = repaymentPsbt.data.inputs.map((input) => (input.witnessUtxo ? input.witnessUtxo.value : 0));

      return repaymentTx.hashForWitnessV1(index, prevOutScripts, prevOutValues, sighashType, leafHash);
    });

    const sigHash = sighashes[0];

    const sigHashHex = sigHash.toString('hex');

    return {
      sigHashHex,
      repaymentCet: repaymentPsbt.toBase64()
    };
  };

  const getLiquidationAdaptorSignatureParams = () => {
    const script = Buffer.from(cetInfos.liquidation_cet_info.script, 'hex');

    const leafHash = bip341.tapleafHash({
      output: script
    });

    const agencyTx = bitcoin.Transaction.fromBuffer(agencyPsbt.data.getTransaction());

    const sighashes = agencyPsbt.data.inputs.map((_, index) => {
      const sighashType = agencyPsbt.data.inputs[index].sighashType || bitcoin.Transaction.SIGHASH_DEFAULT;

      const prevOutScripts = agencyPsbt.data.inputs.map((input) =>
        input.witnessUtxo ? input.witnessUtxo.script : Buffer.alloc(0)
      );
      const prevOutValues = agencyPsbt.data.inputs.map((input) => (input.witnessUtxo ? input.witnessUtxo.value : 0));

      return agencyTx.hashForWitnessV1(index, prevOutScripts, prevOutValues, sighashType, leafHash);
    });

    const sigHash = sighashes[0];

    const sigHashHex = sigHash.toString('hex');

    return {
      sigHashHex
    };
  };

  return {
    getLiquidationAdaptorSignatureParams,
    getRepaymentSignatureParams,
    liquidationCet: agencyPsbt.toBase64(),
    agencyId: dcm.id,
    agencyAddress
  };
}
