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

  const { hasAuthorizedCanClaim, noAuthorizeCanClaim, isRedeeming } = useMemo(() => {
    let hasAuthorizedCanClaim = false,
      noAuthorizeCanClaim = false,
      isRedeeming = false;
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
    } else if (
      loanDeposits &&
      loanDeposits.deposits.length &&
      loanDeposits.deposits.some((deposit) => deposit.status == 'DEPOSIT_STATUS_REDEEMING')
    ) {
      isRedeeming = true;
    }
    return {
      hasAuthorizedCanClaim,
      noAuthorizeCanClaim,
      isRedeeming
    };
  }, [loanAuthorization, loanDeposits]);

  return {
    loading,
    loanAuthorization,
    hasAuthorizedCanClaim,
    noAuthorizeCanClaim,
    isRedeeming
  };
}
