import { useState } from 'react';
import { useQuery } from 'react-query';

import services from '@/ui/services';
import { GetLoanInterestResponse, LoanStatus } from '@/ui/services/lending/types';
import { useEnvironment } from '@/ui/state/environment/hooks';

export function useGetLoanCurrentInterest({
  loan_id,
  loanStatus,
  tag
}: {
  loan_id?: string;
  loanStatus?: LoanStatus;
  tag?: string;
}) {
  const { sideChain } = useEnvironment();
  const [isChange, setIsChange] = useState(false);
  const [previousData, setPreviousData] = useState<GetLoanInterestResponse | undefined>(undefined);

  const { data, isLoading: loading } = useQuery({
    queryKey: ['getLoanCurrentInterest', { loan_id, loanStatus }, tag],
    queryFn: async () => {
      const newData = await services.lending.getLoanCurrentInterest(loan_id!, { baseURL: sideChain.restUrl });
      if (previousData && previousData.interest.amount !== newData?.interest.amount) {
        setIsChange(true);
        setTimeout(() => {
          setIsChange(false);
        }, 2000);
      }
      setPreviousData(newData);
      return newData;
    },
    refetchInterval: 5000,
    enabled: !!loan_id && !!loanStatus
  });

  return { data, loading, isChange };
}
