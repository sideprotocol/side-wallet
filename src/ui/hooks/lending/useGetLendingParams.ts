import { useQuery } from 'react-query';

import services from '@/ui/services';
import { useEnvironment } from '@/ui/state/environment/hooks';

export function useGetLendingParams() {
  const { sideChain } = useEnvironment();
  const { data } = useQuery({
    queryKey: ['getLendingParams', { sideChain }],
    queryFn: async () => {
      return services.lending.getLeadingParams({ baseURL: sideChain.restUrl });
    }
  });

  return {
    data
  };
}
