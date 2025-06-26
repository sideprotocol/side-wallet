import { useQuery } from 'react-query';

import services from '@/ui/services';
import { useEnvironment } from '@/ui/state/environment/hooks';

export function useGetDlcEventCount() {
  const { sideChain } = useEnvironment();
  const { data, isLoading: loading } = useQuery({
    queryKey: ['getDlcEventCount'],
    queryFn: async () => {
      return services.lending.getDlcEventCount({ baseURL: sideChain.restUrl });
    }
  });

  return {
    loading,
    data
  };
}
