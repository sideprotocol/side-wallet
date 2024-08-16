import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { useQuery } from 'react-query';

import { DEX_CONTRACT } from '@/ui/constants';
// import { useWalletContext } from "@/components/WalletContext";
import { IPairItem } from '@/ui/services/dex/type';
import { NetworkType } from '@/shared/types';
import { SIDERPC_URL_TESTNET } from '@/shared/constant';
import { useNetworkType } from '@/ui/state/settings/hooks';

export default function useGetAllPairs() {
  // const { client, curChain } = useWalletContext();
  const networkType = useNetworkType();
  const restUrl = networkType === NetworkType.MAINNET ? SIDERPC_URL_TESTNET : SIDERPC_URL_TESTNET;
  // debugger;
  const { data, isLoading: loading } = useQuery({
    queryKey: ['getAllPairs'],
    queryFn: async () => {

      const msg = {
        pairs: {
          limit: 1000,
        },
      };

      const cosmWasmClient = await CosmWasmClient.connect(restUrl);

      const result = await cosmWasmClient.queryContractSmart(DEX_CONTRACT, msg);

      return result.pairs as IPairItem[];
    },
  });

  return {
    data: data || [],
    loading,
  };
}
