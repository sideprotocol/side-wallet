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

    enabled: loan && loan.status === 'Rejected'
  });

  const { data: loanDeposits } = useQuery({
    queryKey: ['getLoanDeposits', { loan_id: loan?.vault_address, loan_status: loan?.status }],
    queryFn: async () => {
      return services.lending.getLoanDeposits(loan!.vault_address, { baseURL: sideChain.restUrl });
    },
    enabled: loan && loan.status === 'Requested'
  });

  const { hasAuthorizedCanClaim, noAuthorizeCanClaim } = useMemo(() => {
    let hasAuthorizedCanClaim = false;
    let noAuthorizeCanClaim = false;
    if (
      loanAuthorization &&
      loanAuthorization.status === 'AUTHORIZATION_STATUS_REJECTED' &&
      loanAuthorization.deposits.every((deposit) => deposit.status == 'DEPOSIT_STATUS_VERIFIED')
    ) {
      hasAuthorizedCanClaim = true;
    } else if (
      loanDeposits &&
      loanDeposits.deposits.length &&
      loanDeposits.deposits.every((deposit) => deposit.status == 'DEPOSIT_STATUS_VERIFIED')
    ) {
      noAuthorizeCanClaim = true;
    }
    return {
      hasAuthorizedCanClaim,
      noAuthorizeCanClaim
    };
  }, [loanAuthorization, loanDeposits]);

  return {
    loading,
    loanAuthorization,
    hasAuthorizedCanClaim,
    noAuthorizeCanClaim
  };
}
