import dayjs from 'dayjs';
import { useState } from 'react';
import { useQuery } from 'react-query';

import services from '@/ui/services';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useEnvironment } from '@/ui/state/environment/hooks';

export function useGetLoansData() {
  const currentAccount = useCurrentAccount();
  const [pageSize, setPageSize] = useState(10);
  const [pageNum, setPageNum] = useState(0);
  const { sideChain, SERVICE_BASE_URL } = useEnvironment();

  const { data, isLoading: loading } = useQuery({
    queryKey: ['getLoansData'],
    queryFn: async () => {
      const result = await services.lending.getLoans(
        { 'pagination.limit': `${pageSize}`, 'pagination.offset': `${pageNum}` },
        { baseURL: sideChain.restUrl }
      );
      const loans = result.loans.filter((item) => item.borrower === currentAccount.address);

      for (let i = 0; i < loans.length; i++) {
        if (!+loans[i].collateral_amount) {
          const loanCex = await services.lending.getLoanByIdCex(
            { vaultAddress: loans[i].vault_address },
            { baseURL: SERVICE_BASE_URL }
          );
          const collateralAmount = +loanCex.collateralAmount || +loanCex.expectedCollateralAmount;
          loans[i].collateral_amount = `${collateralAmount}`;
        }
      }
      loans.sort((a, b) => dayjs(b.create_at).unix() - dayjs(a.create_at).unix());
      return loans;
    }
  });

  return {
    data: data || [],
    loading,
    pageNum,
    setPageNum,
    pageSize,
    setPageSize
  };
}
