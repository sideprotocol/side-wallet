import { useQuery } from 'react-query';

import services from '../services';
import { useEnvironment } from '../state/environment/hooks';

export default function useGetLendingParams() {
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
