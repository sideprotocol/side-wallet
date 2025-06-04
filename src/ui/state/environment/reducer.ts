import { SERVICE_BASE_URL_MAINNET, SIDE_CHAIN_MAINNET } from '@/shared/constant';
import { IChain } from '@/shared/types';
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
  sideChain: IChain;
  chains: IChain[];
}

export const initialState: EnvironmentState = {
  UNISAT_RUNE_URL: '',
  DEX_CONTRACT: '',
  DEX_ROUTER_CONTRACT: '',
  SERVICE_BASE_URL: SERVICE_BASE_URL_MAINNET,
  SIDE_BTC_EXPLORER: '',
  UNISAT_SERVICE_ENDPOINT: '',
  UNISAT_IO_API: '',
  SIDE_STATION_URL: '',
  SIDE_BRIDGEEXPLORER_URL: '',
  sideChain: SIDE_CHAIN_MAINNET,
  chains: []
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
          sideChain?: IChain;
          chains?: IChain[];
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
