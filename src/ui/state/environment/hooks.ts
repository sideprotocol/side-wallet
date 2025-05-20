import { useCallback } from 'react';

import {
  DEX_CONTRACT_MAINNET,
  DEX_CONTRACT_TESTNET,
  DEX_ROUTER_CONTRACT_MAINNET,
  DEX_ROUTER_CONTRACT_TESTNET,
  SERVICE_BASE_URL_MAINNET,
  SERVICE_BASE_URL_TESTNET,
  SIDE_BRIDGEEXPLORER_URL_MAINNET,
  SIDE_BRIDGEEXPLORER_URL_TESTNET,
  SIDE_BTC_EXPLORER_MAINNET,
  SIDE_BTC_EXPLORER_TESTNET,
  SIDE_CHAIN_MAINNET,
  SIDE_CHAIN_TESTNET,
  SIDE_STATION_URL_MAINNET,
  SIDE_STATION_URL_TESTNET,
  UNISAT_IO_API_MAINNET,
  UNISAT_IO_API_TESTNET,
  UNISAT_RUNE_URL_MAINNET,
  UNISAT_RUNE_URL_TESTNET,
  UNISAT_SERVICE_ENDPOINT_MAINNET,
  UNISAT_SERVICE_ENDPOINT_TESTNET
} from '@/shared/constant';
import { NetworkType } from '@/shared/types';
import services from '@/ui/services';

import { AppState } from '..';
import { useAppDispatch, useAppSelector } from '../hooks';
import { environmentActions } from './reducer';

export function useEnvironmentState(): AppState['environment'] {
  return useAppSelector((state) => state.environment);
}

export function useEnvironment() {
  const environment = useEnvironmentState();
  return environment;
}

export function useChangeEnvironmentCallback() {
  const dispatch = useAppDispatch();
  return useCallback(
    async (networkType: NetworkType) => {
      let chainID = '';
      try {
        const res = await services.base.getBlocksLatest({
          baseURL: networkType === NetworkType.MAINNET ? SIDE_CHAIN_MAINNET.restUrl : SIDE_CHAIN_TESTNET.restUrl
        });
        chainID = res.block.header.chain_id;
      } catch (err) {
        chainID = networkType === NetworkType.MAINNET ? SIDE_CHAIN_MAINNET.chainID : SIDE_CHAIN_TESTNET.chainID;
      }
      if (networkType === NetworkType.MAINNET) {
        dispatch(
          environmentActions.updateEnvironment({
            UNISAT_RUNE_URL: UNISAT_RUNE_URL_MAINNET,
            DEX_CONTRACT: DEX_CONTRACT_MAINNET,
            DEX_ROUTER_CONTRACT: DEX_ROUTER_CONTRACT_MAINNET,
            SERVICE_BASE_URL: SERVICE_BASE_URL_MAINNET,
            SIDE_BTC_EXPLORER: SIDE_BTC_EXPLORER_MAINNET,
            UNISAT_SERVICE_ENDPOINT: UNISAT_SERVICE_ENDPOINT_MAINNET,
            UNISAT_IO_API: UNISAT_IO_API_MAINNET,
            SIDE_STATION_URL: SIDE_STATION_URL_MAINNET,
            SIDE_BRIDGEEXPLORER_URL: SIDE_BRIDGEEXPLORER_URL_MAINNET,
            sideChain: {
              ...SIDE_CHAIN_MAINNET,
              chainID
            }
          })
        );
      } else {
        dispatch(
          environmentActions.updateEnvironment({
            UNISAT_RUNE_URL: UNISAT_RUNE_URL_TESTNET,
            DEX_CONTRACT: DEX_CONTRACT_TESTNET,
            DEX_ROUTER_CONTRACT: DEX_ROUTER_CONTRACT_TESTNET,
            SERVICE_BASE_URL: SERVICE_BASE_URL_TESTNET,
            SIDE_BTC_EXPLORER: SIDE_BTC_EXPLORER_TESTNET,
            UNISAT_SERVICE_ENDPOINT: UNISAT_SERVICE_ENDPOINT_TESTNET,
            UNISAT_IO_API: UNISAT_IO_API_TESTNET,
            SIDE_STATION_URL: SIDE_STATION_URL_TESTNET,
            SIDE_BRIDGEEXPLORER_URL: SIDE_BRIDGEEXPLORER_URL_TESTNET,
            sideChain: {
              ...SIDE_CHAIN_TESTNET,
              chainID
            }
          })
        );
      }
    },
    [dispatch]
  );
}
