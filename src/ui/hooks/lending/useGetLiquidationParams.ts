import { useQuery } from 'react-query';

import services from '@/ui/services';
import { useEnvironment } from '@/ui/state/environment/hooks';

export function useGetLiquidationParams() {
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
