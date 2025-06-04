import { useMemo } from 'react';

import { BITCOIN_CHAINS_MAP, ChainType } from '@/shared/constant';
import { IChain, NetworkType } from '@/shared/types';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useNetworkType } from '@/ui/state/settings/hooks';

export function useGetAllBridgeChains() {
  const { chains } = useEnvironment();
  const networkType = useNetworkType();

  return useMemo(() => {
    let btcChain: IChain | null = null;
    const chainType = networkType === NetworkType.MAINNET ? ChainType.BITCOIN_MAINNET : ChainType.BITCOIN_TESTNET;
    btcChain = {
      chainID: '',
      name: BITCOIN_CHAINS_MAP[chainType].label,
      prefix: '',
      rpcUrl: '',
      restUrl: '',
      denom: '',
      hdPath: '',
      logo: BITCOIN_CHAINS_MAP[chainType].icon,
      faucetUrl: '',
      explorerUrl: '',
      isBitcoin: true
    };
    return [btcChain, ...chains];
  }, [networkType, chains]);
}
