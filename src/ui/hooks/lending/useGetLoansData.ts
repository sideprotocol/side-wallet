import dayjs from 'dayjs';
import { useState } from 'react';
import { useQuery } from 'react-query';

import services from '@/ui/services';
import { useEnvironment } from '@/ui/state/environment/hooks';

export function useGetLoansData() {
  const [pageSize, setPageSize] = useState(10);
  const [pageNum, setPageNum] = useState(0);
  const { sideChain } = useEnvironment();

  const { data, isLoading: loading } = useQuery({
    queryKey: ['getLoansData'],
    queryFn: async () => {
      const result = await services.lending.getLoans(
        { 'pagination.limit': `${pageSize}`, 'pagination.offset': `${pageNum}` },
        { baseURL: sideChain.restUrl }
      );
      return result.loans
        .map((item) => {
          return {
            ...item,
            collateral_amount: +item.collateral_amount ? item.collateral_amount : '0'
          };
        })
        .sort((a, b) => dayjs(b.create_at).unix() - dayjs(a.create_at).unix());
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
