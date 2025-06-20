import { useQuery } from 'react-query';

import services from '@/ui/services';
import { useEnvironment } from '@/ui/state/environment/hooks';

export function useGetLiquidationById({ liquidation_id, enabled }: { liquidation_id?: string; enabled?: boolean }) {
  const { sideChain } = useEnvironment();

  const { data, isLoading: loading } = useQuery({
    queryKey: ['getLiquidationById', { liquidation_id }],
    queryFn: async () => {
      return services.lending.getLiquidationById(liquidation_id!, { baseURL: sideChain.restUrl });
    },
    enabled: enabled || !!liquidation_id
  });

  return { data, loading };
}
