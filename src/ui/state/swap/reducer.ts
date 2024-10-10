import { IPoolItem, LimitOrderConfig, SwapRouteResult } from '@/ui/services/dex/type';
import { Coin } from '@cosmjs/stargate';
import { createSlice } from '@reduxjs/toolkit';

import { updateVersion } from '../global/actions';

export interface SwapState {
  tokenModalShow: boolean;
  swapTop: boolean;
  modalTokenType: string;
  tokenLoading: boolean;
  detailOpen: boolean;
  swapLoading: boolean;
  loading: boolean;
  searchTokenValue: string;
  hoverExchange: boolean;
  pools: IPoolItem[];
  dexConfig: never;
  responseLoading: boolean;
  reloadDataTrigger: string;
  reEstimateTrigger: boolean;
  preSwapTx: string;
  swapRouteResult: SwapRouteResult;
  swapPair: {
    native: Coin;
    remote: Coin;
  };
  balances: Record<string, { available: string; raw: string }>;
  senderAddress: string;
  slippage: string;
  showValidDetail: boolean;
  slippageIsAuto: boolean;
  slippageModalShow: boolean;
  marketClass: null;
  chainTokenListMap: Record<string, Coin[]>;
  mode: 'normal' | 'limit';
  limitRate: string;
  limitExpire: {
    text: string;
    value: number;
  };
  limitType: string;
  rateModified: boolean;
  isRateExchanged: boolean;
  cancelOrderLoading: boolean;
  executingId: string;
  LimitOrderConfig: LimitOrderConfig;
  allPools: IPoolItem[];
  marketPrice: string;
}

export const initialState: SwapState = {
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
    remote: { amount: '', denom: 'uusdc' } as Coin
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
  allPools: [] as IPoolItem[],
  marketPrice: ''
};

const slice = createSlice({
  name: 'swap',
  initialState,
  reducers: {
    reset(state) {
      return initialState;
    },
    update(
      state,
      action: {
        payload: {
          tokenModalShow?: boolean;
          swapTop?: boolean;
          modalTokenType?: string;
          tokenLoading?: boolean;
          detailOpen?: boolean;
          swapLoading?: boolean;
          loading?: boolean;
          searchTokenValue?: string;
          hoverExchange?: boolean;
          pools?: IPoolItem[];
          dexConfig?: never;
          responseLoading?: boolean;
          reloadDataTrigger?: string;
          reEstimateTrigger?: boolean;
          preSwapTx?: string;
          swapRouteResult?: SwapRouteResult;
          swapPair?: {
            native: Coin;
            remote: Coin;
          };
          balances?: Record<string, { available: string; raw: string }>;
          senderAddress?: string;
          slippage?: string;
          showValidDetail?: boolean;
          slippageIsAuto?: boolean;
          slippageModalShow?: boolean;
          marketClass?: null;
          chainTokenListMap?: Record<string, Coin[]>;
          mode?: 'normal' | 'limit';
          limitRate?: string;
          limitExpire?: {
            text: string;
            value: number;
          };
          limitType?: string;
          rateModified?: boolean;
          isRateExchanged?: boolean;
          cancelOrderLoading?: boolean;
          executingId?: string;
          LimitOrderConfig?: LimitOrderConfig;
          allPools?: IPoolItem[];
          marketPrice?: string;
        };
      }
    ) {
      const { payload } = action;
      state = Object.assign({}, state, payload);
      return state;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(updateVersion, (state) => {
      // todo
    });
  }
});

export const SwapActions = slice.actions;
export default slice.reducer;
