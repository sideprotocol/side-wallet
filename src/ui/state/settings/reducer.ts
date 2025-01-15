import { ChainType, DEFAULT_LOCKTIME } from '@/shared/constant';
import { AddressType, NetworkType, WalletConfig } from '@/shared/types';
import { createSlice } from '@reduxjs/toolkit';

import { updateVersion } from '../global/actions';

export interface SettingsState {
  locale: string;
  addressType: AddressType;
  networkType: NetworkType;
  walletConfig: WalletConfig;
  skippedVersion: string;
  autoLockTime: number;
  chainType?: ChainType;
}

export const initialState: SettingsState = {
  locale: 'English',
  addressType: AddressType.P2TR,
  networkType: NetworkType.MAINNET,
  chainType: ChainType.BITCOIN_MAINNET,
  walletConfig: {
    version: '',
    moonPayEnabled: true,
    statusMessage: ''
  },
  skippedVersion: '',
  autoLockTime: DEFAULT_LOCKTIME
};

const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    reset(state) {
      return initialState;
    },
    updateSettings(
      state,
      action: {
        payload: {
          locale?: string;
          addressType?: AddressType;
          networkType?: NetworkType;
          walletConfig?: WalletConfig;
          skippedVersion?: string;
          autoLockTime?: number;
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
      if (!state.networkType) {
        // state.networkType = NetworkType.MAINNET;
        state.networkType = NetworkType.TESTNET;
      }
    });
  }
});

export const settingsActions = slice.actions;
export default slice.reducer;
