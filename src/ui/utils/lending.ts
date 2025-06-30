import * as bip341 from 'bitcoinjs-lib/src/payments/bip341';
import { Buffer } from 'buffer';

import { NetworkType } from '@/shared/types';
import { bitcoin } from '@unisat/wallet-sdk/lib/bitcoin-core';
import { toXOnly } from '@unisat/wallet-sdk/lib/utils';

import { Dcm, GetCetInfoResponse } from '../services/lending/types';

export interface DepositToLendingAgency {
  feeRate: number;
  cetInfos: GetCetInfoResponse;
  activeDcms: Dcm[];
}

export function hexPubKeyToTaprootAddress(pubkeyHex: string, networkType: NetworkType): string {
  const pubkey = Buffer.from(pubkeyHex, 'hex');
  const xOnlyPubkey = toXOnly(pubkey);
  const { address } = bitcoin.payments.p2tr({
    internalPubkey: xOnlyPubkey,
    network: networkType === NetworkType.MAINNET ? bitcoin.networks.bitcoin : bitcoin.networks.testnet
  });

  if (!address) {
    throw new Error('Failed to generate taproot address');
  }

  return address;
}

export async function prepareApply({
  params,
  depositTxIds,
  depositTxs,
  networkType
}: {
  params: DepositToLendingAgency;
  depositTxIds?: string[];
  depositTxs?: string[];
  networkType: NetworkType;
}) {
  const { feeRate, cetInfos, activeDcms } = params;
  const dcm = activeDcms?.[0];
  const network = networkType === NetworkType.MAINNET ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;

  if (!dcm) {
    throw new Error('No active dcm found.');
  }

  // send btc to collateral address

  const outputValue =
    depositTxs?.reduce((pre, cur) => {
      const depositTxPsbt = bitcoin.Psbt.fromBase64(cur);
      return pre + depositTxPsbt.txOutputs[0].value;
    }, 0) || 0;

  // generate repayment cet
  const getRepaymentSignatureParams = async (refundAddress: string) => {
    const repaymentPsbt = new bitcoin.Psbt({ network });
    const repaymentPsbtToFee = new bitcoin.Psbt({ network });

    if (depositTxs?.length && depositTxIds) {
      depositTxs.forEach((depositTx, index) => {
        const depositTxPsbt = bitcoin.Psbt.fromBase64(depositTx);
        repaymentPsbt.addInput({
          hash: depositTxIds[index],
          index: 0,
          witnessUtxo: {
            script: depositTxPsbt.txOutputs[0].script,
            value: depositTxPsbt.txOutputs[0].value
          },
          tapLeafScript: [
            {
              leafVersion: bip341.LEAF_VERSION_TAPSCRIPT,
              controlBlock: Buffer.from(cetInfos.repayment_cet_info.script.control_block, 'hex'),
              script: Buffer.from(cetInfos.repayment_cet_info.script.script, 'hex')
            }
          ]
        });
        repaymentPsbtToFee.addInput({
          hash: depositTxIds[index],
          index: 0,
          witnessUtxo: {
            script: depositTxPsbt.txOutputs[0].script,
            value: depositTxPsbt.txOutputs[0].value
          }
        });
      });
    }

    repaymentPsbtToFee.addOutput({
      address: refundAddress,
      value: outputValue
    });

    const repaymentTxTemp = bitcoin.Transaction.fromBuffer(repaymentPsbtToFee.data.getTransaction());
    repaymentTxTemp.ins.forEach((_, index) => {
      repaymentTxTemp.ins[index].witness = [
        Buffer.alloc(64),
        Buffer.alloc(64),
        Buffer.alloc(Buffer.from(cetInfos.repayment_cet_info.script.script, 'hex').length),
        Buffer.alloc(Buffer.from(cetInfos.repayment_cet_info.script.control_block, 'hex').length)
      ];
    });
    const vsize = repaymentTxTemp.virtualSize();
    const feeAmount = Math.ceil(vsize * feeRate);
    repaymentPsbt.addOutput({
      address: refundAddress,
      value: outputValue - feeAmount
    });
    const script = Buffer.from(cetInfos.repayment_cet_info.script.script, 'hex');

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

    const sigHashHexs = sighashes.map((sigHash) => sigHash.toString('hex'));

    return {
      sigHashHexs,
      repaymentCet: repaymentPsbt.toBase64(),
      repaymentPsbtHex: repaymentPsbt.toHex(),
      repaymentPsbt
    };
  };

  const getLiquidationAdaptorSignatureParams = async () => {
    const leafHash = bip341.tapleafHash({
      output: Buffer.from(cetInfos.liquidation_cet_info.script.script, 'hex')
    });
    const dcmPsbtToFee = new bitcoin.Psbt({ network });
    const dcmPsbt = new bitcoin.Psbt({ network });
    const dcmAddress = hexPubKeyToTaprootAddress(dcm.pubkey, networkType);

    if (depositTxs?.length && depositTxIds) {
      depositTxs.forEach((depositTx, index) => {
        const depositTxPsbt = bitcoin.Psbt.fromBase64(depositTx);

        dcmPsbt.addInput({
          hash: depositTxIds[index],
          index: 0,
          witnessUtxo: {
            script: depositTxPsbt.txOutputs[0].script,
            value: depositTxPsbt.txOutputs[0].value
          }
        });

        dcmPsbtToFee.addInput({
          hash: depositTxIds[index],
          index: 0,
          witnessUtxo: {
            script: depositTxPsbt.txOutputs[0].script,
            value: depositTxPsbt.txOutputs[0].value
          }
        });
      });
    }

    dcmPsbtToFee.addOutput({
      address: dcmAddress,
      value: outputValue
    });

    const dcmTxTemp = bitcoin.Transaction.fromBuffer(dcmPsbtToFee.data.getTransaction());

    dcmTxTemp.ins.forEach((_, index) => {
      dcmTxTemp.ins[index].witness = [
        Buffer.alloc(64),
        Buffer.alloc(64),
        Buffer.alloc(Buffer.from(cetInfos.liquidation_cet_info.script.script, 'hex').length),
        Buffer.alloc(Buffer.from(cetInfos.liquidation_cet_info.script.control_block, 'hex').length)
      ];
    });

    const vsize = dcmTxTemp.virtualSize();
    const feeAmount = Math.ceil(vsize * feeRate);

    dcmPsbt.addOutput({
      address: dcmAddress,
      value: outputValue - feeAmount
    });

    const dcmTx = bitcoin.Transaction.fromBuffer(dcmPsbt.data.getTransaction());

    const sighashes = dcmPsbt.data.inputs.map((_, index) => {
      const sighashType = dcmPsbt.data.inputs[index].sighashType || bitcoin.Transaction.SIGHASH_DEFAULT;

      const prevOutScripts = dcmPsbt.data.inputs.map((input) =>
        input.witnessUtxo ? input.witnessUtxo.script : Buffer.alloc(0)
      );
      const prevOutValues = dcmPsbt.data.inputs.map((input) => (input.witnessUtxo ? input.witnessUtxo.value : 0));

      return dcmTx.hashForWitnessV1(index, prevOutScripts, prevOutValues, sighashType, leafHash);
    });

    const sigHashHexs = sighashes.map((sigHash) => sigHash.toString('hex'));

    return {
      sigHashHexs,
      liquidationCet: dcmPsbt.toBase64()
    };
  };

  return {
    getLiquidationAdaptorSignatureParams,
    getRepaymentSignatureParams
  };
}
