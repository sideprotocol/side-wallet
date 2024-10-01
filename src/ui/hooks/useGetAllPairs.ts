import { useQuery } from 'react-query';

import { DEX_CONTRACT, sideChain } from '@/shared/constant';
import { IPairItem } from '@/ui/services/dex/type';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';

export default function useGetAllPairs() {
  const { data, isLoading: loading } = useQuery({
    queryKey: ['getAllPairs'],
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
