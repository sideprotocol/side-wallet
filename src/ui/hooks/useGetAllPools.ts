import { useQuery } from 'react-query';

import { sideChain } from '@/shared/constant';
// import { useWalletContext } from "@/ui/components/WalletContext";
import { IPoolItem } from '@/ui/services/dex/type';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { swapStore } from '@/ui/stores/SwapStore';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';

import useGetAllPairs from './useGetAllPairs';
import { useGetSideBalanceList } from './useGetSideBalanceList';

export default function useGetAllPools() {
  const currentAccount = useCurrentAccount();
  const { balanceList } = useGetSideBalanceList(currentAccount?.address);
  const { data: pairs } = useGetAllPairs();

  const { data, isLoading: loading } = useQuery({
    queryKey: ['getAllPools'],
    enabled: !!pairs.length,
    queryFn: async () => {
      // debugger;
      if (!currentAccount?.address) return;
      // debugger;
      const cosmWasmClient = await CosmWasmClient.connect(sideChain.restUrl);

      // debugger;
      const pools = await Promise.all(
        pairs.map(async (p) => {
          const address = p.contract_addr;
          const msg = {
            pool: {}
          };
          const pool = await cosmWasmClient.queryContractSmart(address, msg);
          const assetsMeta = pool.assets.map((a: any) => {
            return balanceList.find((item) => item.denom === a.info.native_token.denom);
          });

          // debugger;
          return {
            ...pool,
            contract_addr: address,
            pair: p,
            assetsMeta: assetsMeta?.reduce((pre: any, cur: any) => {
              return {
                ...pre,
                [cur.base]: cur
              };
            }, {})
          };
        })
      );

      swapStore.allPools = pools;
      console.log('pools: ', pools);

      return pools as IPoolItem[];
    }
  });

  return {
    data: (data || []).filter((item) => !!item.total_share),
    loading
  };
}
