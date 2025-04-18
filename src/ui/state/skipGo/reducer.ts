import { Asset, Chain, RouteConfig } from '@/core/skip-go';
import { createSlice } from '@reduxjs/toolkit';

import { updateVersion } from '../global/actions';

export interface SkipGoState {
  sourceAsset?: Asset;
  sourceAssetChain?: Chain;
  destAsset?: Asset;
  destAssetChain?: Chain;
  amountOut: string;
  routeConfig: RouteConfig;
}

export const initialState: SkipGoState = {
  sourceAsset: undefined,
  sourceAssetChain: undefined,
  destAsset: undefined,
  destAssetChain: undefined,
  amountOut: '',
  routeConfig: {
    goFast: true
  }
};

const slice = createSlice({
  name: 'skipGo',
  initialState,
  reducers: {
    reset(state) {
      return initialState;
    },
    update(
      state,
      action: {
        payload: {
          sourceAsset?: Asset;
          sourceAssetChain?: Chain;
          destAsset?: Asset;
          destAssetChain?: Chain;
          amountOut?: string;
          routeConfig?: RouteConfig;
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

export const SkipGoActions = slice.actions;
export default slice.reducer;
