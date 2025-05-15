import { useCallback } from 'react';

import services from '@/ui/services';

import { AppState } from '..';
import { useEnvironment } from '../environment/hooks';
import { useAppDispatch, useAppSelector } from '../hooks';
import { SwapActions } from './reducer';

export function useSwapState(): AppState['swap'] {
  return useAppSelector((state) => state.swap);
}

export function useRefreshData() {
  const dispatch = useAppDispatch();
  const { SERVICE_BASE_URL } = useEnvironment();
  return useCallback(
    (cb) => {
      setTimeout(async () => {
        await services.dex.refreshPoolData({ baseURL: SERVICE_BASE_URL });
        await cb?.();
        dispatch(SwapActions.update({ reloadDataTrigger: Date.now().toString() }));
      }, 1000);
    },
    [dispatch]
  );
}
