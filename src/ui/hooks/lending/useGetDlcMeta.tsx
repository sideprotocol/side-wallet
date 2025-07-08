import { useQuery } from 'react-query';

import services from '@/ui/services';
import { Loan } from '@/ui/services/lending/types';
import { useEnvironment } from '@/ui/state/environment/hooks';

export function useGetDlcMeta(loan?: Loan) {
  const { sideChain } = useEnvironment();
  const { data: dlcMetaData, isLoading: loading } = useQuery({
    queryKey: ['getDlcMeta', { loan_id: loan?.vault_address }],
    queryFn: async () => {
      return services.lending.getLiquidationDlcMeta({ loan_id: loan!.vault_address }, { baseURL: sideChain.restUrl });
    },
    refetchInterval: (data) => {
      return data?.dlc_meta?.liquidation_cet?.borrower_adaptor_signatures &&
        data?.dlc_meta?.liquidation_cet?.borrower_adaptor_signatures?.length > 0
        ? false
        : 2000;
    },
    refetchIntervalInBackground: true,
    enabled: !!loan?.vault_address && loan?.status === 'Requested'
  });

  return {
    loading,
    dlcMetaData
  };
}
