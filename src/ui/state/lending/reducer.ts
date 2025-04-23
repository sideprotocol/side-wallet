import { createSlice } from '@reduxjs/toolkit';

import { updateVersion } from '../global/actions';

export interface LendingState {
  poolTokenDenom: string;
  operationTab: 'supply' | 'withdraw';
  maturity: string | undefined;
}

export const initialState: LendingState = {
  poolTokenDenom: 'uusdc',
  operationTab: 'supply',
  maturity: undefined
};

const slice = createSlice({
  name: 'lending',
  initialState,
  reducers: {
    reset(state) {
      return initialState;
    },
    update(
      state,
      action: {
        payload: {
          poolTokenDenom?: string;
          operationTab?: 'supply' | 'withdraw';
          maturity?: string;
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

export const LendingActions = slice.actions;
export default slice.reducer;
