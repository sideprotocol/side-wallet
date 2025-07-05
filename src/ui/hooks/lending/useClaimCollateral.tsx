import { useState } from 'react';
import { useQueryClient } from 'react-query';

import { sideLendingMessageComposer } from '@/codegen/src';
import services from '@/ui/services';
import { GetTxByHashResponse } from '@/ui/services/tx/types';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useNetworkType } from '@/ui/state/settings/hooks';
import { useSignAndBroadcastTxRaw } from '@/ui/state/transactions/hooks/cosmos';
import { useWallet } from '@/ui/utils';
import { prepareApply } from '@/ui/utils/lending';

import { useGetCetInfo } from './useGetCetInfo';
import { useGetDepositTx } from './useGetDepositTx';
import { useGetDlcDcms } from './useGetDlcDcms';

export function useClaimCollateral(loan_id: string, collateralAmount: string) {
  const queryClient = useQueryClient();
  const currentAccount = useCurrentAccount();
  const [loading, setLoading] = useState(false);
  const { signAndBroadcastTxRaw } = useSignAndBroadcastTxRaw();
  const { sideChain } = useEnvironment();
  const [tx, setTx] = useState('');
  const wallet = useWallet();
  const networkType = useNetworkType();
  const { refetch } = useGetDepositTx(loan_id);

  const { cetInfos } = useGetCetInfo({ loanId: loan_id || '', collateral_amount: `${collateralAmount}sat` });
  const { activeDcms } = useGetDlcDcms();

  const claim = async ({ feeRate }: { feeRate: number }) => {
    try {
      setLoading(true);
      let depositTxs: string[] = [];
      let txids: string[] | undefined = undefined;
      while (!depositTxs.length) {
        try {
          const { data } = await refetch();
          if (data) {
            depositTxs = data.txBase64s;

            txids = data?.txids;
          }
        } catch (err) {
          await new Promise((r) => setTimeout(r, 1000));
        }
      }
      if (!cetInfos) {
        throw new Error('Cet info not found');
      }

      const { getRepaymentSignatureParams } = await prepareApply({
        params: {
          feeRate,
          cetInfos,
          activeDcms
        },
        depositTxIds: txids || [],
        depositTxs: depositTxs || [],
        networkType
      });

      const { sigHashHexs: repaymentSigHashHexs, repaymentCet } = await getRepaymentSignatureParams(
        currentAccount.address
      );

      const signatures = await wallet.signSnorr(repaymentSigHashHexs);

      if (!signatures) throw new Error('Unknown error.');

      const msg = sideLendingMessageComposer.withTypeUrl.redeem({
        borrower: currentAccount.address,
        loanId: loan_id!,
        tx: repaymentCet,
        signatures: signatures
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
        queryClient.invalidateQueries({ queryKey: ['getDlcMeta'] });
        queryClient.invalidateQueries({ queryKey: ['getLoanById'] });
        queryClient.invalidateQueries({ queryKey: ['getLoanAuthorization'] });
        queryClient.invalidateQueries({ queryKey: ['getLoanDeposits'] });
        setTx(result.tx_response.txhash);
      }
    } catch (err) {
      const error = err as Error;
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    claim,
    loading,
    tx
  };
}
