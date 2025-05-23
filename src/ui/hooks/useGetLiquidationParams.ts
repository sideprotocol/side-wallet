import { useQuery } from 'react-query';

import services from '@/ui/services';

import { useEnvironment } from '../state/environment/hooks';

export default function useGetLiquidationParams() {
  const { sideChain } = useEnvironment();
  const { data } = useQuery({
    queryKey: ['getLiquidationParams'],
    queryFn: async () => {
      return services.lending.getLiquidationParams({ baseURL: sideChain.restUrl });
    }
  });

  return {
    data
  };
}
