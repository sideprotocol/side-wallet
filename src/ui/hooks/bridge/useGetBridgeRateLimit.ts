import { useQuery } from 'react-query';

import services from '@/ui/services';
import { useEnvironment } from '@/ui/state/environment/hooks';

export function useGetBridgeRateLimit() {
  const { sideChain } = useEnvironment();
  const { data, isLoading } = useQuery({
    queryKey: ['getBridgeRateLimit'],
    queryFn: async () => {
      return services.bridge.getRateLimit(sideChain.restUrl);
    }
  });

  return {
    data,
    loading: isLoading
  };
}
