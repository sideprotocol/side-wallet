import { useQuery } from 'react-query';

import { sideChain } from '@/shared/constant';

import services from '../services';

export default function useGetLoanById({ loanId }: { loanId: string }) {
  const { data } = useQuery({
    queryKey: ['getLoanById', { loanId }],
    queryFn: async () => {
      return services.lending.getLoanById(loanId, { baseURL: sideChain.restUrl });
    }
  });

  return {
    loan: data
  };
}
