import { useQuery } from 'react-query';

import services from '@/ui/services';
import { Loan } from '@/ui/services/lending/types';
import { useEnvironment } from '@/ui/state/environment/hooks';

export function useGetLoanAuthorization(loan?: Loan) {
  const { sideChain } = useEnvironment();
  const { data: loanAuthorization, isLoading: loading } = useQuery({
    queryKey: ['getLoanAuthorization', { loan_id: loan?.vault_address, loan_status: loan?.status }],
    queryFn: async () => {
      return services.lending.getLoanAuthorization(
        { loan_id: loan!.vault_address, id: loan!.authorizations[0].id },
        { baseURL: sideChain.restUrl }
      );
    },

    refetchIntervalInBackground: true,
    enabled: loan?.status === 'Rejected'
  });
  return {
    loading,
    loanAuthorization
  };
}
