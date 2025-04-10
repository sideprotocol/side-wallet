import { useEffect, useState } from 'react';

import { useWallet } from '@/ui/utils';
import { Chain, SkipClient } from '@skip-go/client';

export default function useSkipClient() {
  const wallet = useWallet();

  const [skipChains, setSkipChains] = useState<Chain[]>([]);

  const skipClient = new SkipClient({
    // getCosmosSigner: async (chainID) => {
    //   console.log(1);
    //   const offlineSigner = await wallet.getOfflineSigner(chainID);
    //   console.log(2);
    //   if (!offlineSigner) throw new Error('Keplr not installed or chain not added');
    //   return offlineSigner;
    // },
    // apiURL: '/api/skip'
  });

  useEffect(() => {
    // getChains();
    // getAssets();
  }, []);

  const getChains = async () => {
    try {
      const chains = await skipClient.chains({
        includeEVM: true,
        includeSVM: true
      });
      console.log(chains);
      setSkipChains(chains);
    } catch (error) {
      console.error('Error fetching chains:', error);
    }
  };

  const getAssets = async () => {
    try {
      const assets = await skipClient.assets();
      console.log('Assets:', assets);
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  return {
    skipClient,
    skipChains
  };
}
