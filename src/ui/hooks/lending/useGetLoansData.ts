import dayjs from 'dayjs';
import { useState } from 'react';
import { useQuery } from 'react-query';

import services from '@/ui/services';
import { useEnvironment } from '@/ui/state/environment/hooks';

export function useGetLoansData() {
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

      for (let i = 0; i < result.loans.length; i++) {
        if (!+result.loans[i].collateral_amount) {
          const loanCex = await services.lending.getLoanByIdCex(
            { vaultAddress: result.loans[i].vault_address },
            { baseURL: SERVICE_BASE_URL }
          );
          const collateralAmount = +loanCex.collateralAmount || +loanCex.expectedCollateralAmount;
          result.loans[i].collateral_amount = `${collateralAmount}`;
        }
      }
      result.loans.sort((a, b) => dayjs(b.create_at).unix() - dayjs(a.create_at).unix());
      return result.loans;
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
