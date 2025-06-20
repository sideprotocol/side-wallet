import { useQuery } from 'react-query';

import services from '@/ui/services';
import { useEnvironment } from '@/ui/state/environment/hooks';

export function useGetDlcMeta(loan_id?: string) {
  const { sideChain } = useEnvironment();
  const { data: dlcMetaData, isLoading: loading } = useQuery({
    queryKey: ['getDlcMeta', { loan_id }],
    queryFn: async () => {
      return services.lending.getLiquidationDlcMeta({ loan_id: loan_id! }, { baseURL: sideChain.restUrl });
    },
    refetchInterval: (data) => {
      return data?.dlc_meta?.liquidation_cet?.borrower_adaptor_signatures &&
        data?.dlc_meta?.liquidation_cet?.borrower_adaptor_signatures?.length > 0
        ? false
        : 2000;
    },
    refetchIntervalInBackground: true,
    enabled: !!loan_id
  });

  return {
    loading,
    dlcMetaData
  };
}
