import { useQuery } from 'react-query';

import services from '../services';
import { useEnvironment } from '../state/environment/hooks';

export default function useGetDlcEventById(id?: string) {
  const { sideChain } = useEnvironment();
  const { data: dlcEvent, isLoading: loading } = useQuery({
    queryKey: ['getDlcEventById', { id, sideChain }],
    queryFn: async () => {
      return services.lending.getDlcEventById(id!, { baseURL: sideChain.restUrl });
    },
    enabled: !!id,
    refetchIntervalInBackground: true
  });

  return {
    loading,
    dlcEvent
  };
}
