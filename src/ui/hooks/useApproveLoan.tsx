import { Coin } from 'cosmwasm';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { sideLendingMessageComposer } from '@/codegen/src';
import { isProduction, sideChain } from '@/shared/constant';
import { useNavigate } from '@/ui/pages/MainRoute';
import { Box } from '@mui/material';
import { bitcoin } from '@unisat/wallet-sdk/lib/bitcoin-core';

import ToastView from '../components/ToastView';
import services from '../services';
import { LiquidationEvent } from '../services/lending/types';
import { GetTxByHashResponse } from '../services/tx/types';
import { useCurrentAccount } from '../state/accounts/hooks';
import { useSignAndBroadcastTxRaw } from '../state/transactions/hooks/cosmos';
import { useWallet } from '../utils';
import { prepareApply } from '../utils/lending';

export async function buildPsbtFromTxHex(txid: string) {
  const txHex = await services.bridge.getTxHex(txid);
  const tx = bitcoin.Transaction.fromHex(txHex);
  const psbt = new bitcoin.Psbt({ network: isProduction ? bitcoin.networks.bitcoin : bitcoin.networks.testnet });

  psbt.setVersion(tx.version);

  tx.ins.forEach((input, _) => {
    const inputData: {
      hash: Buffer;
      index: number;
      sequence: number;
      witness?: Buffer[];
    } = {
      hash: input.hash,
      index: input.index,
      sequence: input.sequence
    };
    if (input.witness && input.witness.length > 0) {
      inputData.witness = input.witness;
    }
    psbt.addInput(inputData);
  });

  tx.outs.forEach((output) => {
    psbt.addOutput({
      script: output.script,
      value: output.value
    });
  });

  psbt.setLocktime(tx.locktime);

  return psbt;
}

export default function useApproveLoan(loan_id: string) {
  const [loading, setLoading] = useState(false);

  const currentAccount = useCurrentAccount();

  const navigate = useNavigate();

  const { signAndBroadcastTxRaw } = useSignAndBroadcastTxRaw();

  const wallet = useWallet();

  const approveLoan = async ({
    depositTxId,
    psbtHex,
    feeRate,
    borrowAmount,
    collateralAmount,
    loanId,
    liquidationEvent,
    refundAddress
  }: {
    depositTxId: string;
    psbtHex: string;
    feeRate: number;
    borrowAmount: Coin;
    collateralAmount: Coin;
    loanId: string;
    liquidationEvent: LiquidationEvent;
    refundAddress: string;
  }) => {
    try {
      setLoading(true);

      const cetInfos = await services.lending.getCetInfo(
        {
          loan_id: loanId,
          collateral_amount: `${collateralAmount.amount}sat`
        },
        {
          baseURL: sideChain.restUrl
        }
      );

      const { liquidationCet, getRepaymentSignatureParams, getLiquidationAdaptorSignatureParams } = await prepareApply({
        params: {
          collateralAddress: loanId,
          collateralAmount: collateralAmount,
          borrowAmount,
          cetInfos,
          restUrl: sideChain.restUrl,
          feeRate
        },
        psbtHex,
        depositTxId: depositTxId,
        senderAddress: currentAccount.address
      });

      if (!liquidationEvent?.event_id) {
        throw new Error('No liquidation event found.');
      }

      if (!cetInfos) {
        throw new Error('No Cet info found.');
      }

      const { sigHashHex } = getLiquidationAdaptorSignatureParams();

      const liquidationAdaptorSignature = await wallet.signAdaptor(
        sigHashHex,
        cetInfos.liquidation_cet_info.signature_point
      );

      const defaultLiquidationAdaptorSignature = await wallet.signAdaptor(
        sigHashHex,
        cetInfos.default_liquidation_cet_info.signature_point
      );

      const { sigHashHex: repaymentSigHashHex, repaymentCet } = getRepaymentSignatureParams(refundAddress);

      let repaymentSignature = '';

      await wallet.signSnorr(repaymentSigHashHex).then((res) => {
        repaymentSignature = res;
      });

      debugger;

      console.log({
        repaymentSignature
      });

      const msg = sideLendingMessageComposer.withTypeUrl.submitCets({
        borrower: currentAccount.address,
        loanId: loan_id,
        depositTx: (await buildPsbtFromTxHex(depositTxId)).toBase64(),
        liquidationCet: liquidationCet,
        liquidationAdaptorSignatures: [liquidationAdaptorSignature],
        defaultLiquidationAdaptorSignatures: [defaultLiquidationAdaptorSignature], //
        repaymentCet: repaymentCet, // sign psbt
        repaymentSignatures: [repaymentSignature] // sighash,
      });

      const result = await signAndBroadcastTxRaw({
        messages: [msg],
        memo: ''
      });

      let hashResponse: GetTxByHashResponse | null = null;
      while (!hashResponse) {
        try {
          hashResponse = await services.tx.getTxByHash(result.tx_response.txhash, {
            baseURL: sideChain.restUrl
          });
        } catch (err) {
          await new Promise((r) => setTimeout(r, 1000));
        }
      }
      if (hashResponse.tx_response.code === 0) {
        navigate('ApproveSuccessScreen', {
          loanId: loan_id
        });
      } else {
        toast.custom((t) => (
          <ToastView toaster={t} type="fail">
            <Box
              sx={{
                mb: '6px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
              {hashResponse.tx_response.raw_log}
            </Box>
          </ToastView>
        ));
      }
    } catch (err) {
      const error = err as Error;

      console.log({ error });

      toast.custom((t) => (
        <ToastView toaster={t} type="fail">
          <Box
            sx={{
              mb: '6px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
            {error.message}
          </Box>
        </ToastView>
      ));
    } finally {
      setLoading(false);
    }
  };

  return {
    approveLoan,
    loading
  };
}
