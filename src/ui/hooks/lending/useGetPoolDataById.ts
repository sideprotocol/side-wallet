import { useQuery } from 'react-query';

import services from '@/ui/services';
import { useEnvironment } from '@/ui/state/environment/hooks';

export function useGetPoolDataById({ poolId }: { poolId?: string }) {
  const { sideChain } = useEnvironment();
  const { data: lendingPool, isLoading: loading } = useQuery({
    queryKey: ['getLendingPoolsData', { poolId, sideChain }],
    queryFn: async () => {
      return services.lending.getLeadingPoolById(poolId!, { baseURL: sideChain.restUrl });
    },
    enabled: !!poolId
  });

  return {
    data: lendingPool,
    loading
  };
}
