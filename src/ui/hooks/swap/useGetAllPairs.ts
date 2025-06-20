import { useQuery } from 'react-query';

import { IPairItem } from '@/ui/services/dex/type';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';

export function useGetAllPairs() {
  const { DEX_CONTRACT, sideChain } = useEnvironment();
  const { data, isLoading: loading } = useQuery({
    queryKey: ['getAllPairs', { DEX_CONTRACT }],
    queryFn: async () => {
      const msg = {
        pairs: {
          limit: 1000
        }
      };

      const cosmWasmClient = await CosmWasmClient.connect(sideChain.restUrl);

      const result = await cosmWasmClient.queryContractSmart(DEX_CONTRACT, msg);

      return result.pairs as IPairItem[];
    }
  });

  return {
    data: data || [],
    loading
  };
}
