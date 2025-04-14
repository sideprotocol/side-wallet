import { useQuery } from 'react-query';

import { sideChain } from '@/shared/constant';
import { useWallet } from '@/ui/utils';

import { SkipClient } from '../../../../core/skip-go';

export default function useSkipClient() {
  const wallet = useWallet();

  const { data: skipClient } = useQuery({
    queryKey: ['initSkipClient'],
    queryFn: async () => {
      return new SkipClient({
        getCosmosSigner: async () => {
          const offlineSigner = await wallet.getOfflineSigner(sideChain.chainID);
          if (!offlineSigner) throw new Error('init offline signer error');
          return offlineSigner;
        }
        // apiURL: '/api/skip'
      });
    }
  });

  return {
    skipClient
  };
}
