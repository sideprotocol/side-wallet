import { useQuery } from 'react-query';

import useSkipClient from './useSkipClient';

export default function useGetSkipChains() {
  const { skipClient } = useSkipClient();

  const { data: skipChains } = useQuery({
    queryKey: ['getSkipChains'],
    queryFn: async () => {
      return skipClient!.chains({
        includeEVM: true,
        includeSVM: true
      });
    },
    enabled: !!skipClient
  });

  return {
    skipChains
  };
}
