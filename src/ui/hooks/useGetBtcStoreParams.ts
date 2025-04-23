import { useQuery } from 'react-query';

import services from '../services';

export default function useGetBtcStoreParams() {
  const { data, isLoading } = useQuery({
    queryKey: ['btcStoreParams'],
    queryFn: async () => {
      const minPurchaseAmount = await services.btcStore.getMinPurchaseAmount();
      const maxPurchaseAmount = await services.btcStore.getMaxPurchaseAmount();
      const btcVaultAddress = await services.btcStore.getBtcVaultAddress();
      const sidePriceInSats = await services.btcStore.getSidePriceInSats();

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
