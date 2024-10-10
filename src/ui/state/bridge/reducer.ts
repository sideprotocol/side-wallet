import { createSlice } from '@reduxjs/toolkit';

import { updateVersion } from '../global/actions';

export interface ChainItem {
  id: string;
  name: string;
  logo: string;
}

export interface DepositBTCBridge {
  amount: number;
  fee: number;
  to?: string;
  isSign?: boolean;
}

interface Status {
  confirmed: boolean;
  block_height: number;
  block_hash: string;
  block_time: number;
}

export interface UTXOAddress {
  txid: string;
  vout: number;
  status: Status;
  value: number;
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
  accountUtxo: UTXOAddress | null;
  hoverExchange: boolean;
}

export const initialState: BridgeState = {
  base: 'sat',
  exponent: 8,
  bridgeAmount: '',
  from: {} as ChainItem,
  to: {} as ChainItem,
  balance: '',
  fee: 20,
  feeSummary: [],
  loading: false,
  selectTokenModalShow: false,
  accountUtxo: null,
  hoverExchange: false
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
          accountUtxo?: UTXOAddress | null;
          hoverExchange?: boolean;
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
