import { useQuery } from 'react-query';

import useSkipClient from './useSkipClient';

export default function useGetChainList() {
  const { skipClient } = useSkipClient();

  const { data: skipAssets } = useQuery({
    queryKey: ['getSkipAssets'],
    queryFn: async () => {
      return skipClient!.assets();
    },
    enabled: !!skipClient
  });

  return {
    skipAssets
  };
}
