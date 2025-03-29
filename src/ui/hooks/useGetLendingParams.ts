import { useQuery } from 'react-query';

import { sideChain } from '@/shared/constant';

import services from '../services';

export default function useGetLendingParams() {
  const { data } = useQuery({
    queryKey: ['getLendingParams'],
    queryFn: async () => {
      return services.lending.getLeadingParams({ baseURL: sideChain.restUrl });
    }
  });

  return {
    data
  };
}
