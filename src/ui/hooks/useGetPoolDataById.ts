import { useQuery } from 'react-query';

import { sideChain } from '@/shared/constant';

import services from '../services';

export default function useGetPoolDataById({ poolId }: { poolId: string }) {
  const { data: lendingPool, isLoading: loading } = useQuery({
    queryKey: ['getLendingPoolsData'],
    queryFn: async () => {
      return services.lending.getLeadingPoolById(poolId, { baseURL: sideChain.restUrl });
    }
  });

  return {
    data: lendingPool,
    loading
  };
}
