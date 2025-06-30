import { useQuery } from 'react-query';

import services from '@/ui/services';
import { useEnvironment } from '@/ui/state/environment/hooks';

export function useGetDlcDcms() {
  const { sideChain } = useEnvironment();

  const { data } = useQuery({
    queryKey: ['getDlcDcms'],
    queryFn: async () => {
      return services.lending.getDlcDcms({ status: 0 }, { baseURL: sideChain.restUrl });
    }
  });

  return {
    activeDcms: data?.dcms || []
  };
}
