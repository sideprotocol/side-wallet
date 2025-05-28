import { Inscription } from '@/shared/types';
import { createSlice } from '@reduxjs/toolkit';

import { updateVersion } from '../global/actions';

export interface UIState {
  assetTabKey: AssetTabKey;
  ordinalsAssetTabKey: OrdinalsAssetTabKey;
  atomicalsAssetTabKey: AtomicalsAssetTabKey;
  uiTxCreateScreen: {
    toInfo: {
      address: string;
      domain: string;
      inscription?: Inscription;
    };
    inputAmount: string;
    enableRBF: boolean;
    feeRate: number;
  };
  uiTxCreateSendSideScreen: {
    toInfo: {
      address: string;
      domain: string;
    };
    base: string;
    inputAmount: string;
    fee: string;
    feeDenom: string;
    memo?: string;
  };
}

export enum AssetTabKey {
  ORDINALS,
  // ATOMICALS,
  RUNES
}

export enum OrdinalsAssetTabKey {
  ALL,
  BRC20,
  BRC20_5BYTE
}

export enum AtomicalsAssetTabKey {
  ALL,
  ARC20,
  OTHERS
}

export const initialState: UIState = {
  assetTabKey: AssetTabKey.ORDINALS,
  ordinalsAssetTabKey: OrdinalsAssetTabKey.ALL,
  atomicalsAssetTabKey: AtomicalsAssetTabKey.ARC20,
  uiTxCreateScreen: {
    toInfo: {
      address: '',
      domain: '',
      inscription: undefined
    },
    inputAmount: '',
    enableRBF: false,
    feeRate: 1
  },
  uiTxCreateSendSideScreen: {
    toInfo: {
      address: '',
      domain: ''
    },
    base: '',
    inputAmount: '',
    fee: '600',
    feeDenom: 'uside',
    memo: ''
  }
};

const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    reset(state) {
      return initialState;
    },
    updateAssetTabScreen(
      state,
      action: {
        payload: {
          assetTabKey?: AssetTabKey;
          ordinalsAssetTabKey?: OrdinalsAssetTabKey;
          atomicalsAssetTabKey?: AtomicalsAssetTabKey;
        };
      }
    ) {
      const { payload } = action;
      if (payload.assetTabKey !== undefined) {
        state.assetTabKey = payload.assetTabKey;
      }
      if (payload.ordinalsAssetTabKey !== undefined) {
        state.ordinalsAssetTabKey = payload.ordinalsAssetTabKey;
      }
      if (payload.atomicalsAssetTabKey !== undefined) {
        state.atomicalsAssetTabKey = payload.atomicalsAssetTabKey;
      }
      return state;
    },
    updateTxCreateScreen(
      state,
      action: {
        payload: {
          toInfo?: {
            address: string;
            domain: string;
            inscription?: Inscription;
          };
          inputAmount?: string;
          enableRBF?: boolean;
          feeRate?: number;
        };
      }
    ) {
      console.log('updateTxCreateScreen', action.payload);
      if (action.payload.toInfo !== undefined) {
        state.uiTxCreateScreen.toInfo = action.payload.toInfo;
      }
      if (action.payload.inputAmount !== undefined) {
        state.uiTxCreateScreen.inputAmount = action.payload.inputAmount;
      }
      if (action.payload.enableRBF !== undefined) {
        state.uiTxCreateScreen.enableRBF = action.payload.enableRBF;
      }
      if (action.payload.feeRate !== undefined) {
        state.uiTxCreateScreen.feeRate = action.payload.feeRate;
      }
    },
    updateTxCreateSendSideScreen(
      state,
      action: {
        payload: {
          toInfo?: {
            address: string;
            domain: string;
          };
          base?: string;
          inputAmount?: string;
          fee?: string;
          feeDenom?: string;
          memo?: string;
        };
      }
    ) {
      if (action.payload.toInfo !== undefined) {
        state.uiTxCreateSendSideScreen.toInfo = action.payload.toInfo;
      }
      if (action.payload.base !== undefined) {
        state.uiTxCreateSendSideScreen.base = action.payload.base;
      }
      if (action.payload.inputAmount !== undefined) {
        state.uiTxCreateSendSideScreen.inputAmount = action.payload.inputAmount;
      }
      if (action.payload.fee !== undefined) {
        state.uiTxCreateSendSideScreen.fee = action.payload.fee;
      }
      if (action.payload.feeDenom !== undefined) {
        state.uiTxCreateSendSideScreen.feeDenom = action.payload.feeDenom;
      }
      if (action.payload.memo !== undefined) {
        state.uiTxCreateSendSideScreen.memo = action.payload.memo;
      }
    },
    resetTxCreateScreen(state) {
      state.uiTxCreateScreen = initialState.uiTxCreateScreen;
      state.uiTxCreateSendSideScreen = initialState.uiTxCreateSendSideScreen;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(updateVersion, (state) => {
      // todo
      if (!state.assetTabKey) {
        state.assetTabKey = AssetTabKey.ORDINALS;
      }
      if (!state.ordinalsAssetTabKey) {
        state.ordinalsAssetTabKey = OrdinalsAssetTabKey.ALL;
      }
      if (!state.atomicalsAssetTabKey) {
        state.atomicalsAssetTabKey = AtomicalsAssetTabKey.ARC20;
      }
      if (!state.uiTxCreateScreen) {
        state.uiTxCreateScreen = initialState.uiTxCreateScreen;
      }
    });
  }
});

export const uiActions = slice.actions;
export default slice.reducer;
