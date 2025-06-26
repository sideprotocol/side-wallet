import { Coin } from 'cosmwasm';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { sideLendingMessageComposer } from '@/codegen/src';
import ToastView from '@/ui/components/ToastView';
import services from '@/ui/services';
import { GetTxByHashResponse } from '@/ui/services/tx/types';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useNetworkType } from '@/ui/state/settings/hooks';
import { useSignAndBroadcastTxRaw } from '@/ui/state/transactions/hooks/cosmos';
import { useWallet } from '@/ui/utils';
import { prepareApply } from '@/ui/utils/lending';
import { Box } from '@mui/material';

import { useGetDepositTx } from './useGetDepositTx';

export function useApproveLoan(loan_id: string, collateralAmount: string) {
  const [loading, setLoading] = useState(false);
  const [tx, setTx] = useState('');

  const currentAccount = useCurrentAccount();

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
    refundAddress
  }: {
    feeRate: number;
    borrowAmount: Coin;
    collateralAmount: Coin;
    loanId: string;
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
        setTx(result.tx_response.txhash);
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
    depositTxs,
    tx
  };
}
