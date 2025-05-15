import { useQuery } from 'react-query';

import services from '../services';
import { useEnvironment } from '../state/environment/hooks';

export default function useGetLoanById({ loanId }: { loanId: string }) {
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
