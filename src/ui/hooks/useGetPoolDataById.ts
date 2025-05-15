import { useQuery } from 'react-query';

import services from '../services';
import { useEnvironment } from '../state/environment/hooks';

export default function useGetPoolDataById({ poolId }: { poolId: string }) {
  const { sideChain } = useEnvironment();
  const { data: lendingPool, isLoading: loading } = useQuery({
    queryKey: ['getLendingPoolsData', { poolId, sideChain }],
    queryFn: async () => {
      return services.lending.getLeadingPoolById(poolId, { baseURL: sideChain.restUrl });
    }
  });

  return {
    data: lendingPool,
    loading
  };
}
