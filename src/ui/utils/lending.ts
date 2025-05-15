import { Psbt } from 'bitcoinjs-lib';
import * as bip341 from 'bitcoinjs-lib/src/payments/bip341';
import { Buffer } from 'buffer';
import { Coin } from 'cosmwasm';

import { NetworkType } from '@/shared/types';
import { bitcoin } from '@unisat/wallet-sdk/lib/bitcoin-core';
import { toXOnly } from '@unisat/wallet-sdk/lib/utils';

import services from '../services';

export interface DepositToLendingAgency {
  borrowAmount: Coin;
  collateralAmount: Coin;
  collateralAddress: string;
  restUrl: string;
  feeRate: number;
}

export function hexPubKeyToTaprootAddress(pubkeyHex: string, networkType: NetworkType): string {
  const pubkey = Buffer.from(pubkeyHex, 'hex');
  const xOnlyPubkey = toXOnly(pubkey);
  const { address } = bitcoin.payments.p2tr({
    pubkey: xOnlyPubkey,
    network: networkType === NetworkType.MAINNET ? bitcoin.networks.bitcoin : bitcoin.networks.testnet
  });

  if (!address) {
    throw new Error('Failed to generate taproot address');
  }

  return address;
}

export async function prepareApply({
  params,
  senderAddress,
  depositTxIds,
  depositTxs,
  networkType
}: {
  params: DepositToLendingAgency;
  senderAddress: string;
  depositTxIds?: string[];
  depositTxs?: string[];
  networkType: NetworkType;
}) {
  const { restUrl, feeRate, collateralAddress } = params;

  const activeAgencies = await services.lending.getDlcDcms({ status: 0 }, { baseURL: restUrl });

  const dcm = activeAgencies?.dcms?.[0];

  if (!dcm) {
    throw new Error('No active dcm found.');
  }

  // send btc to collateral address
  const network = networkType === NetworkType.MAINNET ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;

  const agencyPsbtToFee = new Psbt({ network });

  const agencyPsbt = new Psbt({ network });

  const outputValue =
    depositTxs?.reduce((pre, cur) => {
      const depositTxPsbt = bitcoin.Psbt.fromBase64(cur);
      return pre + depositTxPsbt.txOutputs[0].value;
    }, 0) || 0;

  //   generate liquidation cet
  if (depositTxs?.length && depositTxIds) {
    depositTxs.forEach((depositTx, index) => {
      const depositTxPsbt = bitcoin.Psbt.fromBase64(depositTx);
      agencyPsbtToFee.addInput({
        hash: depositTxIds[index],
        index: 0,
        witnessUtxo: {
          script: depositTxPsbt.txOutputs[0].script,
          value: depositTxPsbt.txOutputs[0].value
        }
      });
    });
  }

  if (depositTxs?.length && depositTxIds) {
    depositTxs.forEach((depositTx, index) => {
      const depositTxPsbt = bitcoin.Psbt.fromBase64(depositTx);

      agencyPsbt.addInput({
        hash: depositTxIds[index],
        index: 0,
        witnessUtxo: {
          script: depositTxPsbt.txOutputs[0].script,
          value: depositTxPsbt.txOutputs[0].value
        }
      });
    });
  }

  const agencyAddress = hexPubKeyToTaprootAddress(dcm.pubkey, networkType);

  agencyPsbtToFee.addOutput({
    address: agencyAddress,
    value: outputValue
  });

  const agencyTxTemp = bitcoin.Transaction.fromBuffer(agencyPsbtToFee.data.getTransaction());

  agencyTxTemp.ins.forEach((_, index) => {
    agencyTxTemp.ins[index].witness = [Buffer.alloc(64), Buffer.alloc(64), Buffer.alloc(70), Buffer.alloc(65)];
  });

  const vsize = agencyTxTemp.virtualSize();
  const feeAmount = Math.ceil(vsize * feeRate);

  agencyPsbt.addOutput({
    address: agencyAddress,
    value: outputValue - feeAmount
  });

  // generate repayment cet

  const getRepaymentSignatureParams = async (refundAddress: string) => {
    const cetInfos = await services.lending.getCetInfo(
      {
        loan_id: collateralAddress!,
        collateral_amount: `${outputValue}sat`
      },
      {
        baseURL: restUrl
      }
    );

    const repaymentPsbt = new bitcoin.Psbt({ network });

    if (depositTxs?.length && depositTxIds) {
      depositTxs.forEach((depositTx, index) => {
        const depositTxPsbt = bitcoin.Psbt.fromBase64(depositTx);
        repaymentPsbt.addInput({
          hash: depositTxIds[index],
          index: 0,
          witnessUtxo: {
            script: depositTxPsbt.txOutputs[0].script,
            value: depositTxPsbt.txOutputs[0].value
          }
        });
      });
    }

    repaymentPsbt.addOutput({
      address: refundAddress || senderAddress,
      value: outputValue - feeAmount
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

    const sigHashHexs = sighashes.map((sighash) => sighash.toString('hex'));

    return {
      sigHashHexs,
      repaymentCet: repaymentPsbt.toBase64(),
      cetInfos
    };
  };

  const getLiquidationAdaptorSignatureParams = async () => {
    const cetInfos = await services.lending.getCetInfo(
      {
        loan_id: collateralAddress!,
        collateral_amount: `${outputValue}sat`
      },
      {
        baseURL: restUrl
      }
    );

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

    const sigHashHexs = sighashes.map((sighash) => sighash.toString('hex'));

    return {
      sigHashHexs,
      cetInfos
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
