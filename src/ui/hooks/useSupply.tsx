import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { sideLendingMessageComposer } from '@/codegen/src';
import ToastView from '@/ui/components/ToastView';
import { useNavigate } from '@/ui/pages/MainRoute';
import { useSignAndBroadcastTxRaw } from '@/ui/state/transactions/hooks/cosmos';
import { Coin } from '@cosmjs/amino';
import { Box } from '@mui/material';

import services from '../services';
import { useCurrentAccount } from '../state/accounts/hooks';
import { useEnvironment } from '../state/environment/hooks';

export default function useSupply() {
  const { sideChain } = useEnvironment();

  const [loading, setLoading] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [supplyTokenAmount, setSupplyTokenAmount] = useState('0');
  const { signAndBroadcastTxRaw } = useSignAndBroadcastTxRaw();
  const navigate = useNavigate();
  const [tx, setTx] = useState('');

  const currentAccount = useCurrentAccount();

  const supply = async ({ pool_id, amount }: { pool_id: string; amount: Coin }) => {
    try {
      setLoading(true);
      const msg = sideLendingMessageComposer.withTypeUrl.addLiquidity({
        amount,
        poolId: pool_id,
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
        toast.custom((t) => (
          <ToastView toaster={t} type="success" txHashUrl={`${sideChain.explorerUrl}/tx/${result.tx_response.txhash}`}>
            <Box
              sx={{
                mb: '6px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
              Liquidity Added!
            </Box>
          </ToastView>
        ));
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
    supply,
    loading,
    supplyTokenAmount,
    setSupplyTokenAmount,
    tx
  };
}
