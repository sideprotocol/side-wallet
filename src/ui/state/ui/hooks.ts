import { Inscription } from '@/shared/types';

import { AppState } from '..';
import { useAppDispatch, useAppSelector } from '../hooks';
import { uiActions } from './reducer';

export function useUIState(): AppState['ui'] {
  return useAppSelector((state) => state.ui);
}

export function useAssetTabKey() {
  const uiState = useUIState();
  return uiState.assetTabKey;
}

export function useOrdinalsAssetTabKey() {
  const uiState = useUIState();
  return uiState.ordinalsAssetTabKey;
}

export function useAtomicalsAssetTabKey() {
  const uiState = useUIState();
  return uiState.atomicalsAssetTabKey;
}

export function useUiTxCreateScreen() {
  const uiState = useUIState();
  return uiState.uiTxCreateScreen;
}

export function useUpdateUiTxCreateScreen() {
  const dispatch = useAppDispatch();
  return ({
    toInfo,
    inputAmount,
    enableRBF,
    feeRate
  }: {
    toInfo?: { address: string; domain: string; inscription?: Inscription };
    inputAmount?: string;
    enableRBF?: boolean;
    feeRate?: number;
  }) => {
    dispatch(uiActions.updateTxCreateScreen({ toInfo, inputAmount, enableRBF, feeRate }));
  };
}

export function useUiTxCreateSendSideScreen() {
  const uiState = useUIState();
  return uiState.uiTxCreateSendSideScreen;
}

export function useUpdateUiTxCreateSendSideScreen() {
  const dispatch = useAppDispatch();
  return ({
    toInfo,
    base,
    inputAmount,
    fee,
    memo
  }: {
    toInfo?: { address: string; domain: string };
    base?: string;
    inputAmount?: string;
    fee?: string;
    memo?: string;
  }) => {
    dispatch(uiActions.updateTxCreateSendSideScreen({ toInfo, base, inputAmount, fee, memo }));
  };
}

export function useResetUiTxCreateScreen() {
  const dispatch = useAppDispatch();
  return () => {
    dispatch(uiActions.resetTxCreateScreen());
  };
}
