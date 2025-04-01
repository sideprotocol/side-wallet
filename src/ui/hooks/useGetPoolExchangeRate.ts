import { useQuery } from 'react-query';

import { sideChain } from '@/shared/constant';

import services from '../services';

export default function useGetPoolExchangeRate({ poolId }: { poolId: string }) {
  const { data, isLoading: loading } = useQuery({
    queryKey: ['GetPoolExchangeRate'],
    queryFn: async () => {
      return services.lending.getLendingPoolsExchangeRate({ pool_id: poolId }, { baseURL: sideChain.restUrl });
    },
    enabled: !!poolId
  });

  return {
    data: data?.exchange_rate || '',
    loading
  };
}
