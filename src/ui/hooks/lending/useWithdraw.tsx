import { Coin } from 'cosmwasm';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { sideLendingMessageComposer } from '@/codegen/src';
import ToastView from '@/ui/components/ToastView';
import services from '@/ui/services';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useSignAndBroadcastTxRaw } from '@/ui/state/transactions/hooks/cosmos';
import { Box } from '@mui/material';

export function useWithdraw() {
  const [loading, setLoading] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const { sideChain } = useEnvironment();
  const [tx, setTx] = useState('');

  const currentAccount = useCurrentAccount();

  const { signAndBroadcastTxRaw } = useSignAndBroadcastTxRaw();

  const withdraw = async ({ shares }: { shares: Coin }) => {
    try {
      setLoading(true);
      const msg = sideLendingMessageComposer.withTypeUrl.removeLiquidity({
        ytokens: shares,
        lender: currentAccount.address
      });
      const result = await signAndBroadcastTxRaw({
        messages: [msg],
        memo: ''
      });
      setLoading(false);
      confirmTx(result.tx_response.txhash);
    } catch (err) {
      setLoading(false);
      const error = err as Error;
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
    }
  };

  const confirmTx = async (txHash: string) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    try {
      setLoading(true);
      const result = await services.tx.getTxByHash(txHash, {
        baseURL: sideChain.restUrl
      });
      setLoading(false);
      if (result.tx_response.code === 0) {
        setTx(txHash);
      } else {
        toast.custom((t) => (
          <ToastView toaster={t} type="fail">
            <Box
              sx={{
                mb: '6px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
              {result.tx_response.raw_log}
            </Box>
          </ToastView>
        ));
      }
    } catch (err) {
      timer.current = setTimeout(() => {
        confirmTx(txHash);
      }, 1000);
    }
  };

  return {
    withdraw,
    loading,
    tx
  };
}
