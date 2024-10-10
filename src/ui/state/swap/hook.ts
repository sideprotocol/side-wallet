import { useCallback } from 'react';

import services from '@/ui/services';

import { AppState } from '..';
import { useAppDispatch, useAppSelector } from '../hooks';
import { SwapActions } from './reducer';

export function useSwapState(): AppState['swap'] {
  return useAppSelector((state) => state.swap);
}

export function useRefreshData() {
  const dispatch = useAppDispatch();
  return useCallback(
    (cb) => {
      setTimeout(async () => {
        await services.dex.refreshPoolData();
        await cb?.();
        dispatch(SwapActions.update({ reloadDataTrigger: Date.now().toString() }));
      }, 1000);
    },
    [dispatch]
  );
}
