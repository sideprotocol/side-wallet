import { useQuery } from 'react-query';

import services from '@/ui/services';
import { useEnvironment } from '@/ui/state/environment/hooks';

export function useGetLoanById({ loanId }: { loanId: string }) {
  const { sideChain } = useEnvironment();
  const { data } = useQuery({
    queryKey: ['getLoanById', { loanId, sideChain }],
    queryFn: async () => {
      return services.lending.getLoanById(loanId, { baseURL: sideChain.restUrl });
    }
  });

  return {
    loan: data
  };
}
