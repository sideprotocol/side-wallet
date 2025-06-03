import { BalanceItem } from '@/shared/types';
import { SideBridgeParams } from '@/ui/services/bridge';
import { createSlice } from '@reduxjs/toolkit';

import { updateVersion } from '../global/actions';

export interface ChainItem {
  id: string;
  name: string;
  logo: string;
}

export interface BridgeState {
  base: string;
  exponent: number;
  bridgeAmount: string;
  from: ChainItem;
  to: ChainItem;
  balance: string;
  fee: number;
  feeSummary: any[];
  loading: boolean;
  selectTokenModalShow: boolean;
  hoverExchange: boolean;
  isDeposit: boolean;
  params: SideBridgeParams;
  bridgeAsset: BalanceItem;
}

export const initialState: BridgeState = {
  base: 'sat',
  exponent: 8,
  bridgeAmount: '',
  from: {} as ChainItem,
  to: {} as ChainItem,
  balance: '',
  fee: 20,
  isDeposit: true,
  feeSummary: [],
  loading: false,
  selectTokenModalShow: false,
  hoverExchange: false,
  params: {} as SideBridgeParams,
  bridgeAsset: {} as BalanceItem
};

const slice = createSlice({
  name: 'bridge',
  initialState,
  reducers: {
    reset(state) {
      return initialState;
    },
    update(
      state,
      action: {
        payload: {
          base?: string;
          exponent?: number;
          bridgeAmount?: string;
          from?: ChainItem;
          to?: ChainItem;
          balance?: string;
          fee?: number;
          feeSummary?: any[];
          loading?: boolean;
          selectTokenModalShow?: boolean;
          hoverExchange?: boolean;
          isDeposit?: boolean;
          params?: SideBridgeParams;
          bridgeAsset?: BalanceItem;
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

export const BridgeActions = slice.actions;
export default slice.reducer;
