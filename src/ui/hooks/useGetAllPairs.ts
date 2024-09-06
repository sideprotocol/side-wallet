import { useQuery } from 'react-query';

import { SIDERPC_URL_TESTNET } from '@/shared/constant';
import { NetworkType } from '@/shared/types';
import { DEX_CONTRACT } from '@/ui/constants';
// import { useWalletContext } from "@/components/WalletContext";
import { IPairItem } from '@/ui/services/dex/type';
import { useNetworkType } from '@/ui/state/settings/hooks';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';

export default function useGetAllPairs() {
  // const { client, curChain } = useWalletContext();
  const networkType = useNetworkType();
  const restUrl = networkType === NetworkType.TESTNET ? SIDERPC_URL_TESTNET : SIDERPC_URL_TESTNET;
  // debugger;
  const { data, isLoading: loading } = useQuery({
    queryKey: ['getAllPairs'],
    queryFn: async () => {
      const msg = {
        pairs: {
          limit: 1000
        }
      };

      const cosmWasmClient = await CosmWasmClient.connect(restUrl);

      const result = await cosmWasmClient.queryContractSmart(DEX_CONTRACT, msg);

      return result.pairs as IPairItem[];
    }
  });

  return {
    data: data || [],
    loading
  };
}
