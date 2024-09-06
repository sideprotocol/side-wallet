import { proxy } from 'valtio';
import { useSnapshot } from 'valtio';

import services from '@/ui/services';
import { IPoolItem, LimitOrderConfig, SwapRouteResult } from '@/ui/services/dex/type';
import { Coin } from '@cosmjs/stargate';

const initData = {
  tokenModalShow: false,
  swapTop: false,
  modalTokenType: '',
  tokenLoading: false,
  detailOpen: false,
  swapLoading: false,
  loading: false,
  searchTokenValue: '',
  hoverExchange: false,
  pools: [] as IPoolItem[],
  dexConfig: {} as never,
  responseLoading: true,
  reloadDataTrigger: Date.now().toString(),
  reEstimateTrigger: false,
  preSwapTx: '',
  swapRouteResult: {} as SwapRouteResult,
  swapPair: {
    native: { amount: '', denom: 'uside' } as Coin,
    remote: { amount: '', denom: '' } as Coin
  },
  balances: {} as Record<string, { available: string; raw: string }>,
  senderAddress: '',
  slippage: '0.25',
  showValidDetail: false,
  slippageIsAuto: true,
  slippageModalShow: false,
  marketClass: null,
  chainTokenListMap: {} as Record<string, Coin[]>,
  mode: 'normal' as 'normal' | 'limit',
  limitRate: '',
  limitExpire: {
    text: '7 Days',
    value: 7 * 24 * 60 * 60 * 1000
  },
  limitType: 'Fill or Kill',
  rateModified: false,
  isRateExchanged: false,
  cancelOrderLoading: false,
  executingId: '',
  LimitOrderConfig: {} as LimitOrderConfig,
  allPools: [] as IPoolItem[]
};

export const swapStore = proxy(initData);

export const useSwapStore = () => {
  window.swapStore = swapStore;
  return useSnapshot(swapStore);
};

export const refreshData = (cb) => {
  setTimeout(async () => {
    await services.dex.refreshPoolData();
    await cb?.();

    swapStore.reloadDataTrigger = Date.now().toString();
  }, 1000);
};
