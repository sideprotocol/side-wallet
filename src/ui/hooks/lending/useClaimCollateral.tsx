import { useState } from 'react';
import { useQueryClient } from 'react-query';

import { sideLendingMessageComposer } from '@/codegen/src';
import services from '@/ui/services';
import { Loan } from '@/ui/services/lending/types';
import { GetTxByHashResponse } from '@/ui/services/tx/types';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useNetworkType } from '@/ui/state/settings/hooks';
import { useSignAndBroadcastTxRaw } from '@/ui/state/transactions/hooks/cosmos';
import { useWallet } from '@/ui/utils';
import { prepareApply } from '@/ui/utils/lending';

import { useGetCetInfo } from './useGetCetInfo';
import { useGetDepositInfo } from './useGetDepositInfo';
import { useGetDlcDcms } from './useGetDlcDcms';
import useGetLoanDeposits from './useGetLoanDeposits';

export function useClaimCollateral(loan?: Loan) {
  const queryClient = useQueryClient();
  const currentAccount = useCurrentAccount();
  const [loading, setLoading] = useState(false);
  const { signAndBroadcastTxRaw } = useSignAndBroadcastTxRaw();
  const { sideChain } = useEnvironment();
  const [tx, setTx] = useState('');
  const wallet = useWallet();
  const networkType = useNetworkType();
  const { refetch } = useGetDepositInfo(loan);

  const { cetInfos } = useGetCetInfo({
    loanId: loan?.vault_address || '',
    collateral_amount: `${loan?.collateral_amount}sat`
  });
  const { activeDcms } = useGetDlcDcms();

  const { loanDeposits } = useGetLoanDeposits(loan);

  const claim = async ({ feeRate }: { feeRate: number }) => {
    try {
      if (!loan) {
        throw new Error('Loan not found');
      }

      setLoading(true);
      let allDepositTxs: string[] = [],
        depositTxs: string[] = [],
        allTxids: string[] = [],
        txids: string[] = [];

      while (!allDepositTxs.length) {
        try {
          const { data } = await refetch();
          if (data) {
            allDepositTxs = data.txBase64s;
            allTxids = data.txids;
          }
        } catch (err) {
          await new Promise((r) => setTimeout(r, 1000));
        }
      }

      // 筛选未提取的txs
      if (loanDeposits?.deposits.length) {
        loanDeposits.deposits.forEach((deposit) => {
          if (deposit.status === 'DEPOSIT_STATUS_VERIFIED') {
            const index = allTxids.findIndex((txid) => txid === deposit.txid);
            if (index !== -1) {
              depositTxs.push(allDepositTxs[index]);
              txids.push(allTxids[index]);
            }
          }
        });
      }

      if (!depositTxs.length) {
        throw new Error('The vault has not yet received your collateral funding.');
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
        loanId: loan.vault_address,
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
        setTx(result.tx_response.txhash);
        queryClient.invalidateQueries({ queryKey: ['getDlcMeta'] });
        queryClient.invalidateQueries({ queryKey: ['getLoanById'] });
        queryClient.invalidateQueries({ queryKey: ['getLoanAuthorization'] });
        queryClient.invalidateQueries({ queryKey: ['getLoanDeposits'] });
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
