import {
  DEX_CONTRACT_MAINNET,
  DEX_ROUTER_CONTRACT_MAINNET,
  SERVICE_BASE_URL_MAINNET,
  SIDE_BRIDGEEXPLORER_URL_MAINNET,
  SIDE_BTC_EXPLORER_MAINNET,
  SIDE_CHAIN_MAINNET,
  SIDE_STATION_URL_MAINNET,
  UNISAT_IO_API_MAINNET,
  UNISAT_RUNE_URL_MAINNET,
  UNISAT_SERVICE_ENDPOINT_MAINNET
} from '@/shared/constant';
import { createSlice } from '@reduxjs/toolkit';

import { updateVersion } from '../global/actions';

export interface EnvironmentState {
  UNISAT_RUNE_URL: string;
  DEX_CONTRACT: string;
  DEX_ROUTER_CONTRACT: string;
  SERVICE_BASE_URL: string;
  SIDE_BTC_EXPLORER: string;
  UNISAT_SERVICE_ENDPOINT: string;
  UNISAT_IO_API: string;
  SIDE_STATION_URL: string;
  SIDE_BRIDGEEXPLORER_URL: string;
  sideChain: typeof SIDE_CHAIN_MAINNET;
}

export const initialState: EnvironmentState = {
  UNISAT_RUNE_URL: UNISAT_RUNE_URL_MAINNET,
  DEX_CONTRACT: DEX_CONTRACT_MAINNET,
  DEX_ROUTER_CONTRACT: DEX_ROUTER_CONTRACT_MAINNET,
  SERVICE_BASE_URL: SERVICE_BASE_URL_MAINNET,
  SIDE_BTC_EXPLORER: SIDE_BTC_EXPLORER_MAINNET,
  UNISAT_SERVICE_ENDPOINT: UNISAT_SERVICE_ENDPOINT_MAINNET,
  UNISAT_IO_API: UNISAT_IO_API_MAINNET,
  SIDE_STATION_URL: SIDE_STATION_URL_MAINNET,
  SIDE_BRIDGEEXPLORER_URL: SIDE_BRIDGEEXPLORER_URL_MAINNET,
  sideChain: SIDE_CHAIN_MAINNET
};

const slice = createSlice({
  name: 'environment',
  initialState,
  reducers: {
    reset(state) {
      return initialState;
    },
    updateEnvironment(
      state,
      action: {
        payload: {
          UNISAT_RUNE_URL?: string;
          DEX_CONTRACT?: string;
          DEX_ROUTER_CONTRACT?: string;
          SERVICE_BASE_URL?: string;
          SIDE_BTC_EXPLORER?: string;
          UNISAT_SERVICE_ENDPOINT?: string;
          UNISAT_IO_API?: string;
          SIDE_STATION_URL?: string;
          SIDE_BRIDGEEXPLORER_URL?: string;
          sideChain?: typeof SIDE_CHAIN_MAINNET;
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

export const environmentActions = slice.actions;
export default slice.reducer;
