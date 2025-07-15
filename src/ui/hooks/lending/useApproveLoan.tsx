import { useState } from 'react';
import toast from 'react-hot-toast';

import { sideLendingMessageComposer } from '@/codegen/src';
import ToastView from '@/ui/components/ToastView';
import { useNavigate } from '@/ui/pages/MainRoute';
import services from '@/ui/services';
import { Loan } from '@/ui/services/lending/types';
import { GetTxByHashResponse } from '@/ui/services/tx/types';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useNetworkType } from '@/ui/state/settings/hooks';
import { useSignAndBroadcastTxRaw } from '@/ui/state/transactions/hooks/cosmos';
import { useWallet } from '@/ui/utils';
import { prepareApply } from '@/ui/utils/lending';
import { Box } from '@mui/material';

import { useGetDepositInfo } from './useGetDepositInfo';
import { useGetDlcDcms } from './useGetDlcDcms';

export function useApproveLoan(loan?: Loan) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tx, setTx] = useState('');
  const { sideChain } = useEnvironment();

  const currentAccount = useCurrentAccount();

  const { refetch } = useGetDepositInfo(loan);

  const { signAndBroadcastTxRaw } = useSignAndBroadcastTxRaw();

  const wallet = useWallet();
  const networkType = useNetworkType();
  const { activeDcms } = useGetDlcDcms();

  const approveLoan = async ({ feeRate, refundAddress }: { feeRate: number; refundAddress: string }) => {
    try {
      if (!loan) {
        throw new Error('Loan not found');
      }

      setLoading(true);

      let depositTxs: string[] = [],
        txids: string[] = [],
        realCollateralAmount = '0';

      while (!depositTxs.length) {
        try {
          const { data } = await refetch();
          if (data) {
            if (data.depositEnough) {
              depositTxs = data.txBase64s;
              txids = data.txids;
              realCollateralAmount = `${data.realCollateralAmount}`;
            }
          }
        } catch (err) {
          await new Promise((r) => setTimeout(r, 1000));
        }
      }

      const cetInfos = await services.lending.getCetInfo(
        {
          loan_id: loan.vault_address,
          collateral_amount: `${realCollateralAmount}${'sat'}`
        },
        { baseURL: sideChain.restUrl }
      );

      if (!cetInfos) {
        throw new Error('Cet info not found');
      }

      const { getRepaymentSignatureParams, getLiquidationAdaptorSignatureParams } = await prepareApply({
        params: {
          feeRate,
          cetInfos: cetInfos,
          activeDcms: activeDcms
        },
        depositTxIds: txids || [],
        depositTxs: depositTxs || [],
        networkType
      });

      const { sigHashHexs, liquidationCet } = await getLiquidationAdaptorSignatureParams();
      const { sigHashHexs: repaymentSigHashHexs, repaymentCet } = await getRepaymentSignatureParams(refundAddress);

      const liquidationAdaptorSignatures = await Promise.all(
        sigHashHexs.map((sigHashHex) => wallet.signAdaptor(sigHashHex, cetInfos.liquidation_cet_info.signature_point))
      );

      const defaultLiquidationAdaptorSignatures = await Promise.all(
        sigHashHexs.map((sigHashHex) =>
          wallet.signAdaptor(sigHashHex, cetInfos.default_liquidation_cet_info.signature_point)
        )
      );

      const repaymentSignatures = await wallet.signSnorr(repaymentSigHashHexs);

      const msg = sideLendingMessageComposer.withTypeUrl.submitCets({
        borrower: currentAccount.address,
        loanId: loan.vault_address,
        depositTxs: depositTxs || [],
        liquidationCet: liquidationCet,
        liquidationAdaptorSignatures: liquidationAdaptorSignatures,
        defaultLiquidationAdaptorSignatures: defaultLiquidationAdaptorSignatures,
        repaymentCet: repaymentCet,
        repaymentSignatures: repaymentSignatures
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
        navigate('TxFailScreen', { error: hashResponse.tx_response.raw_log });
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
      if (error.message.includes('invalid liquidation cet: invalid adaptor signature: invalid cet')) {
        navigate('TxFailScreen', {
          error:
            'This loan is no longer available, possibly due to using a different device. Please cancel the request and reclaim your collateral. Next time, try to complete Step 2 promptly on the same device.'
        });
      } else {
        navigate('TxFailScreen', { error: error.message });
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    approveLoan,
    loading,
    tx
  };
}
