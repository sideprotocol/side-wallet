import { useQuery } from 'react-query';

import services from '@/ui/services';
import { useEnvironment } from '@/ui/state/environment/hooks';

export function useGetBtcStoreParams() {
  const { SERVICE_BASE_URL } = useEnvironment();
  const { data, isLoading } = useQuery({
    queryKey: ['btcStoreParams', { SERVICE_BASE_URL }],
    queryFn: async () => {
      const minPurchaseAmount = await services.btcStore.getMinPurchaseAmount({ baseURL: SERVICE_BASE_URL });
      const maxPurchaseAmount = await services.btcStore.getMaxPurchaseAmount({ baseURL: SERVICE_BASE_URL });
      const btcVaultAddress = await services.btcStore.getBtcVaultAddress({ baseURL: SERVICE_BASE_URL });
      const sidePriceInSats = await services.btcStore.getSidePriceInSats({ baseURL: SERVICE_BASE_URL });

      return {
        minPurchaseAmount,
        maxPurchaseAmount,
        btcVaultAddress,
        sidePriceInSats
      };
    }
  });

  return {
    params: isLoading ? null : data,
    isLoading
  };
}
