import { Coin } from 'cosmwasm';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { sideLendingMessageComposer } from '@/codegen/src';
import { useNavigate } from '@/ui/pages/MainRoute';
import { Box } from '@mui/material';

import ToastView from '../components/ToastView';
import services from '../services';
import { useCurrentAccount } from '../state/accounts/hooks';
import { useEnvironment } from '../state/environment/hooks';
import { useSignAndBroadcastTxRaw } from '../state/transactions/hooks/cosmos';

export default function useWithdraw() {
  const [loading, setLoading] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const { sideChain } = useEnvironment();
  const [tx, setTx] = useState('');

  const currentAccount = useCurrentAccount();
  const navigate = useNavigate();

  const { signAndBroadcastTxRaw } = useSignAndBroadcastTxRaw();

  const withdraw = async ({ shares }: { shares: Coin }) => {
    try {
      setLoading(true);
      const msg = sideLendingMessageComposer.withTypeUrl.removeLiquidity({
        stokens: shares,
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
