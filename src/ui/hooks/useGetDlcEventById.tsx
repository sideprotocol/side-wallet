import { useQuery } from 'react-query';

import { sideChain } from '@/shared/constant';

import services from '../services';

export default function useGetDlcEventById(id?: string) {
  const { data: dlcEvent, isLoading: loading } = useQuery({
    queryKey: ['getDlcEventById', { id }],
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
