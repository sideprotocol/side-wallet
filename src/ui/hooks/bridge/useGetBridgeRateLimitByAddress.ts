import { useQuery } from 'react-query';

import services from '@/ui/services';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useEnvironment } from '@/ui/state/environment/hooks';

export function useGetBridgeRateLimitByAddress() {
  const currentAccount = useCurrentAccount();
  const { sideChain } = useEnvironment();
  const { data, isLoading } = useQuery({
    queryKey: ['getBridgeRateLimitByAddress', { address: currentAccount.address }],
    queryFn: async () => {
      return services.bridge.getRateLimitByAddress(currentAccount.address, sideChain.restUrl);
    }
  });

  return {
    data,
    loading: isLoading
  };
}
