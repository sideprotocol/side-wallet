import { useState } from 'react';

import { sideLendingMessageComposer } from '@/codegen/src';
import services from '@/ui/services';
import { GetTxByHashResponse } from '@/ui/services/tx/types';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useSignAndBroadcastTxRaw } from '@/ui/state/transactions/hooks/cosmos';

export function useRepay() {
  const { signAndBroadcastTxRaw } = useSignAndBroadcastTxRaw();
  const currentAccount = useCurrentAccount();
  const [loading, setLoading] = useState(false);
  const [tx, setTx] = useState('');
  const { sideChain } = useEnvironment();

  const repay = async ({ loan_id }: { loan_id: string }) => {
    try {
      setLoading(true);

      const msg = sideLendingMessageComposer.withTypeUrl.repay({
        borrower: currentAccount.address,
        loanId: loan_id
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
        setTx(hashResponse.tx_response.txhash);
      }
    } catch (err) {
      const error = err as Error;
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    repay,
    loading,
    tx
  };
}
