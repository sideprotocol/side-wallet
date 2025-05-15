import { load, save } from 'redux-localstorage-simple';

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import accounts from './accounts/reducer';
import bridge from './bridge/reducer';
import environment from './environment/reducer';
import { updateVersion } from './global/actions';
import global from './global/reducer';
import keyrings from './keyrings/reducer';
import lending from './lending/reducer';
import settings from './settings/reducer';
import swap from './swap/reducer';
import transactions from './transactions/reducer';
import ui from './ui/reducer';

const PERSISTED_KEYS: string[] = ['ui'];
const store = configureStore({
  reducer: {
    accounts,
    transactions,
    settings,
    global,
    keyrings,
    ui,
    bridge,
    swap,
    lending,
    environment
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true }).concat(save({ states: PERSISTED_KEYS, debounce: 1000 })),
  preloadedState: load({ states: PERSISTED_KEYS, disableWarnings: true })
});

store.dispatch(updateVersion());

setupListeners(store.dispatch);

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
