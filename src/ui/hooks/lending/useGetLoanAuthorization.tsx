import { useMemo } from 'react';
import { useQuery } from 'react-query';

import services from '@/ui/services';
import { Loan } from '@/ui/services/lending/types';
import { useEnvironment } from '@/ui/state/environment/hooks';

import useGetLoanDeposits from './useGetLoanDeposits';

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
    enabled: loan && loan.status === 'Rejected'
  });

  const { loanDeposits } = useGetLoanDeposits(loan!);

  const { isRedeeming, canClaim } = useMemo(() => {
    let canClaim = false,
      isRedeeming = false;

    if (
      loan?.status === 'Requested' &&
      loanDeposits &&
      loanDeposits.deposits.length &&
      loanDeposits.deposits.every((deposit) => deposit.status == 'DEPOSIT_STATUS_VERIFIED')
    ) {
      canClaim = true;
    } else if (
      loan?.status === 'Cancelled' &&
      loanDeposits &&
      loanDeposits.deposits.length &&
      loanDeposits.deposits.every((deposit) => deposit.status == 'DEPOSIT_STATUS_VERIFIED')
    ) {
      canClaim = true;
    } else if (
      loan?.status === 'Rejected' &&
      loanAuthorization &&
      loanAuthorization.status === 'AUTHORIZATION_STATUS_REJECTED' &&
      loanAuthorization.deposits.every((deposit) => deposit.status == 'DEPOSIT_STATUS_VERIFIED')
    ) {
      canClaim = true;
    } else if (
      loanDeposits &&
      loanDeposits.deposits.length &&
      loanDeposits.deposits.some((deposit) => deposit.status == 'DEPOSIT_STATUS_REDEEMING')
    ) {
      isRedeeming = true;
    }
    return {
      isRedeeming,
      canClaim
    };
  }, [loanAuthorization, loanDeposits, loan?.status]);

  return {
    loading,
    canClaim,
    isRedeeming
  };
}
