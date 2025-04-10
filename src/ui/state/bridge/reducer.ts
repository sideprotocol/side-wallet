import { bitcoinChain, sideChain } from '@/shared/constant';
import { BalanceItem, ShortChain } from '@/shared/types';
import { createSlice } from '@reduxjs/toolkit';

import { updateVersion } from '../global/actions';

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
  bridgeAsset: BalanceItem | null;
  bridgeAmount: string;
  from: ShortChain;
  to: ShortChain;
  fee: number;
  feeSummary: any[];
  loading: boolean;
  accountUtxo: UTXOAddress | null;
}

export const initialState: BridgeState = {
  bridgeAsset: null,
  bridgeAmount: '',
  from: bitcoinChain,
  to: sideChain,
  fee: 20,
  feeSummary: [],
  loading: false,
  accountUtxo: null
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
          bridgeAsset?: BalanceItem;
          bridgeAmount?: string;
          from?: ShortChain;
          to?: ShortChain;
          fee?: number;
          feeSummary?: any[];
          loading?: boolean;
          accountUtxo?: UTXOAddress | null;
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
