import { Coin } from 'cosmwasm';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { sideLendingMessageComposer } from '@/codegen/src';
import { NetworkType } from '@/shared/types';
import { useNavigate } from '@/ui/pages/MainRoute';
import { Box } from '@mui/material';
import { bitcoin } from '@unisat/wallet-sdk/lib/bitcoin-core';

import ToastView from '../components/ToastView';
import services from '../services';
import { LiquidationEvent } from '../services/lending/types';
import { GetTxByHashResponse } from '../services/tx/types';
import { useCurrentAccount } from '../state/accounts/hooks';
import { useEnvironment } from '../state/environment/hooks';
import { useNetworkType } from '../state/settings/hooks';
import { useSignAndBroadcastTxRaw } from '../state/transactions/hooks/cosmos';
import { useWallet } from '../utils';
import { prepareApply } from '../utils/lending';
import useGetDepositTx from './useGetDepositTx';

export async function buildPsbtFromTxHex(txid: string) {
  const { SIDE_BTC_EXPLORER } = useEnvironment();
  const networkType = useNetworkType();

  const txHex = await services.bridge.getTxHex(txid, SIDE_BTC_EXPLORER);
  const tx = bitcoin.Transaction.fromHex(txHex);
  const psbt = new bitcoin.Psbt({
    network: networkType === NetworkType.MAINNET ? bitcoin.networks.bitcoin : bitcoin.networks.testnet
  });

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

export default function useApproveLoan(loan_id: string, collateralAmount: string) {
  const [loading, setLoading] = useState(false);

  const currentAccount = useCurrentAccount();

  const navigate = useNavigate();

  const { depositTxs, refetch } = useGetDepositTx(loan_id, collateralAmount);

  const { signAndBroadcastTxRaw } = useSignAndBroadcastTxRaw();

  const wallet = useWallet();
  const networkType = useNetworkType();
  const { sideChain } = useEnvironment();

  const approveLoan = async ({
    feeRate,
    borrowAmount,
    collateralAmount,
    loanId,
    liquidationEvent,
    refundAddress
  }: {
    feeRate: number;
    borrowAmount: Coin;
    collateralAmount: Coin;
    loanId: string;
    liquidationEvent: LiquidationEvent;
    refundAddress: string;
  }) => {
    try {
      setLoading(true);

      let depositTxs: string[] | undefined = undefined;
      let txids: string[] | undefined = undefined;

      while (!depositTxs || !txids) {
        await new Promise((r) => setTimeout(r, 1000));
        const { data } = await refetch();

        depositTxs = data?.txBase64s;
        txids = data?.txids;
      }

      const { liquidationCet, getRepaymentSignatureParams, getLiquidationAdaptorSignatureParams } = await prepareApply({
        params: {
          collateralAddress: loanId,
          collateralAmount: collateralAmount,
          borrowAmount,
          restUrl: sideChain.restUrl,
          feeRate
        },
        depositTxIds: txids || [],
        depositTxs: depositTxs || [],
        senderAddress: currentAccount.address,
        networkType
      });

      if (!liquidationEvent?.event_id) {
        throw new Error('No liquidation event found.');
      }

      const { sigHashHexs, cetInfos } = await getLiquidationAdaptorSignatureParams();

      const liquidationAdaptorSignatures = await Promise.all(
        sigHashHexs.map((sigHashHex) => wallet.signAdaptor(sigHashHex, cetInfos.liquidation_cet_info.signature_point))
      );

      const defaultLiquidationAdaptorSignatures = await Promise.all(
        sigHashHexs.map((sigHashHex) =>
          wallet.signAdaptor(sigHashHex, cetInfos.default_liquidation_cet_info.signature_point)
        )
      );

      const { sigHashHexs: repaymentSigHashHexs, repaymentCet } = await getRepaymentSignatureParams(refundAddress);

      const repaymentSignatures = await wallet.signSnorr(repaymentSigHashHexs);

      const msg = sideLendingMessageComposer.withTypeUrl.submitCets({
        borrower: currentAccount.address,
        loanId: loan_id,
        depositTxs: depositTxs || [],
        liquidationCet: liquidationCet,
        liquidationAdaptorSignatures: liquidationAdaptorSignatures,
        defaultLiquidationAdaptorSignatures: defaultLiquidationAdaptorSignatures, //
        repaymentCet: repaymentCet, // sign psbt
        repaymentSignatures: repaymentSignatures // sighash,
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
    loading,
    depositTxs
  };
}
