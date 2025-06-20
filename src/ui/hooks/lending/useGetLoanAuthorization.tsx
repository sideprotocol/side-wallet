import { useMemo } from 'react';
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
    enabled: loan && loan.authorizations.length > 0
  });

  const canClaim = useMemo(() => {
    return (
      !loading &&
      loanAuthorization &&
      loanAuthorization.status === 'AUTHORIZATION_STATUS_REJECTED' &&
      loanAuthorization.deposits.every((deposit) => deposit.status == 'DEPOSIT_STATUS_VERIFIED')
    );
  }, [loading, loanAuthorization]);

  return {
    loading,
    loanAuthorization,
    canClaim
  };
}
