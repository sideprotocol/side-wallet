import { useQuery } from 'react-query';

import services from '@/ui/services';
import { useEnvironment } from '@/ui/state/environment/hooks';

export function useGetCetInfo({ loanId }: { loanId?: string }) {
  const { sideChain } = useEnvironment();

  const { data } = useQuery({
    queryKey: ['getCetInfo', { loanId }],
    queryFn: async () => {
      return services.lending.getCetInfo(
        {
          loan_id: loanId!
        },
        { baseURL: sideChain.restUrl }
      );
    },
    enabled: !!loanId
  });

  return {
    cetInfos: data
  };
}
