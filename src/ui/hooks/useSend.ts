import { useEffect, useMemo, useState } from 'react';

import { CHAINS_ENUM } from '@/shared/constant';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';

import { useNavigate } from '../pages/MainRoute';
import { useSignAndBroadcastTxRaw } from '../state/transactions/hooks/cosmos';
import { useUiTxCreateSendSideScreen, useUpdateUiTxCreateSendSideScreen } from '../state/ui/hooks';
import { parseUnitAmount } from '../utils';
import { useGetSideBalanceList } from './useGetSideBalanceList';

export function useSend() {
  const navigate = useNavigate();
  const { signAndBroadcastTxRaw, estimateGasFee } = useSignAndBroadcastTxRaw();
  const currentAccount = useCurrentAccount();
  const uiState = useUiTxCreateSendSideScreen();
  const setUiState = useUpdateUiTxCreateSendSideScreen();
  const [loading, setLoading] = useState(false);
  const { balanceList } = useGetSideBalanceList(currentAccount.address);
  const { toInfo, base: denom, inputAmount, fee, feeDenom, memo } = uiState;

  const { curToken, feeToken } = useMemo(() => {
    const curToken = balanceList.find((item) => item.denom === denom);
    const feeToken = balanceList.find((item) => item.denom === feeDenom);
    return {
      curToken,
      feeToken
    };
  }, [balanceList.length, denom, feeDenom]);

  useEffect(() => {
    estimateFee();
  }, []);

  async function estimateFee() {
    const msg = {
      typeUrl: '/cosmos.bank.v1beta1.MsgSend',
      value: {
        fromAddress: currentAccount.address,
        toAddress: currentAccount.address,
        amount: [
          {
            amount: parseUnitAmount('1', 6),
            denom: 'uside'
          }
        ]
      }
    };

    const { tx } = await estimateGasFee({
      messages: [msg],
      feeAmount: fee,
      feeDenom: feeDenom
    });

    const coin = tx.fee.amount[0];

    const feeEstimate = coin.amount;

    setUiState({
      fee: feeEstimate
    });
  }

  const handleSubmit = async (options?: { text?: string; title?: string }) => {
    try {
      if (!curToken) {
        throw new Error('Token not found');
      }

      setLoading(true);
      const msg = {
        typeUrl: '/cosmos.bank.v1beta1.MsgSend',
        value: {
          fromAddress: currentAccount.address,
          toAddress: toInfo.address,
          amount: [
            {
              amount: parseUnitAmount(inputAmount, curToken.asset.exponent),
              denom: curToken.denom
            }
          ]
        }
      };
      const result = await signAndBroadcastTxRaw({
        messages: [msg],
        feeAmount: fee,
        feeDenom: feeDenom,
        memo
      });
      navigate('TxSuccessScreen', {
        txid: result.tx_response.txhash,
        chain: CHAINS_ENUM.SIDE,
        text: options?.text,
        title: options?.title
      });
    } catch (err) {
      const errorString = err instanceof Error ? err.message : typeof err == 'string' ? err : '';

      navigate('TxFailScreen', { error: errorString });
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
    loading,
    curToken,
    feeToken,
    memo,
    inputAmount,
    fee: fee || '0',
    estimateFee,
    toInfo
  };
}
