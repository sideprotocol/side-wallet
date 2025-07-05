import { useQuery } from 'react-query';

import services from '@/ui/services';
import { useEnvironment } from '@/ui/state/environment/hooks';

export function useGetCetInfo({ loanId, collateral_amount }: { loanId?: string; collateral_amount: string }) {
  const { sideChain } = useEnvironment();

  const { data } = useQuery({
    queryKey: ['getCetInfo', { loanId }],
    queryFn: async () => {
      return services.lending.getCetInfo(
        {
          loan_id: loanId!,
          collateral_amount
        },
        { baseURL: sideChain.restUrl }
      );
    },
    enabled: !!loanId
  });

  return {
    cetInfos: data
  };
}
