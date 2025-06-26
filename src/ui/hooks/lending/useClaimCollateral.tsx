import { Coin } from 'cosmwasm';
import { useState } from 'react';

import { sideLendingMessageComposer } from '@/codegen/src';
import services from '@/ui/services';
import { GetTxByHashResponse } from '@/ui/services/tx/types';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useNetworkType } from '@/ui/state/settings/hooks';
import { useSignAndBroadcastTxRaw } from '@/ui/state/transactions/hooks/cosmos';
import { useWallet } from '@/ui/utils';
import { prepareApply } from '@/ui/utils/lending';

import { useGetDepositTx } from './useGetDepositTx';

export function useClaimCollateral(loan_id?: string) {
  const currentAccount = useCurrentAccount();
  const [loading, setLoading] = useState(false);
  const { signAndBroadcastTxRaw } = useSignAndBroadcastTxRaw();
  const { sideChain } = useEnvironment();
  const [tx, setTx] = useState('');
  const wallet = useWallet();
  const networkType = useNetworkType();

  const { refetch } = useGetDepositTx(loan_id);

  const claim = async ({
    feeRate,
    borrowAmount,
    collateralAmount,
    loanId
  }: {
    feeRate: number;
    borrowAmount: Coin;
    collateralAmount: Coin;
    loanId: string;
  }) => {
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

      const { getRepaymentSignatureParams } = await prepareApply({
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
