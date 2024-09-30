import { SIDE_CHAINID_MAINNET, SIDE_CHAINID_TESTNET, SIDE_CHAINS } from '@/shared/constant';
import { NetworkType } from '@/shared/types';

import { useNetworkType } from '../state/settings/hooks';

export function useIsTestNet() {
  const networkType = useNetworkType();
  return networkType === NetworkType.TESTNET;
}

export function useCurChain() {
  const isTestNet = useIsTestNet();
  const chainId = isTestNet ? SIDE_CHAINID_TESTNET : SIDE_CHAINID_MAINNET;
  return SIDE_CHAINS.find((item) => item.chainID === chainId)!;
}

export function useGetUrlList() {
  const UNISAT_RUNE_URL = 'https://api-t2.unisat.io/icon-v1/icon/runes';
  return {
    UNISAT_RUNE_URL
  };
}
