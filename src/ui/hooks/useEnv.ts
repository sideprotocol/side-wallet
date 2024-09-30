import { SIDE_CHAINID_TESTNET, SIDE_CHAINS } from '@/shared/constant';

export function useCurChain() {
  return SIDE_CHAINS.find((item) => item.chainID === SIDE_CHAINID_TESTNET)!;
}

export function useGetUrlList() {
  const UNISAT_RUNE_URL = 'https://api-t2.unisat.io/icon-v1/icon/runes';
  return {
    UNISAT_RUNE_URL
  };
}
