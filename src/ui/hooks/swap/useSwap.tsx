import BigNumber from 'bignumber.js';
import toast from 'react-hot-toast';

import { CHAINS_ENUM } from '@/shared/constant';
import ToastView from '@/ui/components/ToastView';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import { useNavigate } from '@/ui/pages/MainRoute';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useAppDispatch } from '@/ui/state/hooks';
import { useSwapState } from '@/ui/state/swap/hook';
import { SwapActions } from '@/ui/state/swap/reducer';
import { useSignAndBroadcastTxRaw } from '@/ui/state/transactions/hooks/cosmos';
import createExecuteMessage from '@/ui/utils/createExecuteMessage';
import { toUnitAmount } from '@/ui/utils/formatter';
import { coin } from '@cosmjs/stargate';

export function useSwap() {
  const { slippage, swapPair, swapRouteResult } = useSwapState();
  const { DEX_ROUTER_CONTRACT } = useEnvironment();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const currentAccount = useCurrentAccount();
  const { signAndBroadcastTxRaw } = useSignAndBroadcastTxRaw();
  const { pools, returnToken } = swapRouteResult;
  const { native } = swapPair;
  const { balanceList } = useGetSideBalanceList(currentAccount?.address);
  const assetIn = balanceList.find((item) => item.denom === native.denom);

  const unitAmount = toUnitAmount(native.amount, assetIn?.asset?.exponent || 6);

  const minReceived =
    swapRouteResult?.pools?.length === 1 && swapRouteResult.pools[0].pairType.includes('transmuter')
      ? swapPair.remote.amount
      : BigNumber(returnToken?.amount || '0')
          .times(BigNumber(1).minus(BigNumber(slippage).div(100)))
          .toFixed(0, BigNumber.ROUND_DOWN);

  const msg = {
    execute_swap_operations: {
      operations: pools?.map((p) => {
        return {
          astro_swap: {
            offer_asset_info: {
              native_token: {
                denom: p.offerToken.denom
              }
            },
            ask_asset_info: {
              native_token: {
                denom: p.returnToken.denom
              }
            }
          }
        };
      }),
      minimum_receive: minReceived,
      max_spread: '0.5'
    }
  };

  async function swap() {
    try {
      if (!currentAccount?.address) return;
      const funds = [coin(unitAmount, native.denom)];
      dispatch(SwapActions.update({ swapLoading: true }));
      const txMsg = createExecuteMessage({
        message: msg,
        senderAddress: currentAccount?.address,
        contractAddress: DEX_ROUTER_CONTRACT,
        funds
      });

      console.log('txMsg: ', txMsg);
      const result = await signAndBroadcastTxRaw({
        messages: [txMsg],
        memo: '',
        gas: BigNumber('600000').times(pools.length).toFixed()
      });
      dispatch(SwapActions.update({ swapLoading: false }));
      navigate('TxSuccessScreen', { txid: result.tx_response.txhash, chain: CHAINS_ENUM.SIDE });
      // confirmTx(result?.tx_response?.txhash);
    } catch (error) {
      toast.custom(
        (t) => (
          <ToastView toaster={t} type="fail">
            <div style={{ color: '#000000', marginBottom: '6px', fontSize: '12px', fontWeight: '500' }}>
              {(error as Error).message}
            </div>
          </ToastView>
        ),
        { duration: 5000 }
      );
      dispatch(SwapActions.update({ swapLoading: false }));
    }
  }

  return {
    swap
  };
}
