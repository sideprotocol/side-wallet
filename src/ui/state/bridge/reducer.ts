import { BalanceItem, FeeSummary, IChain } from '@/shared/types';
import { SideBridgeParams } from '@/ui/services/bridge';
import { createSlice } from '@reduxjs/toolkit';

import { updateVersion } from '../global/actions';

export interface ChainItem {
  id: string;
  name: string;
  logo: string;
}

export interface BridgeState {
  fromChain: IChain | null;
  toChain: IChain | null;
  fromAsset: BalanceItem | null;
  toAsset: BalanceItem | null;
  fromAddress: string;
  toAddress: string;
  bridgeAmount: string;
  balance: string;
  params: SideBridgeParams | null;
  fee: number;
  feeSummary: FeeSummary['list'];
}

export const initialState: BridgeState = {
  fromChain: null,
  toChain: null,
  fromAsset: null,
  toAsset: null,
  fromAddress: '',
  toAddress: '',
  bridgeAmount: '',
  balance: '0',
  params: null,
  fee: 20,
  feeSummary: []
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
          fromChain?: IChain | null;
          toChain?: IChain | null;
          fromAsset?: BalanceItem | null;
          toAsset?: BalanceItem | null;
          fromAddress?: string;
          toAddress?: string;
          bridgeAmount?: string;
          balance?: string;
          params?: SideBridgeParams | null;
          fee?: number;
          feeSummary?: FeeSummary['list'];
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
