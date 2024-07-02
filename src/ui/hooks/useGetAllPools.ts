import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { useQuery } from 'react-query';

// import { useWalletContext } from "@/ui/components/WalletContext";
import { IPoolItem } from '@/ui/services/dex/type';
import useGetAllPairs from './useGetAllPairs';
import { findAssetIcon } from '@/ui/utils/swap';
import { swapStore } from '@/ui/stores/SwapStore';
import { NetworkType } from '@/shared/types';
import { SIDEREST_URL_MAINNET, SIDEREST_URL_TESTNET } from '@/shared/constant';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useNetworkType } from '@/ui/state/settings/hooks';

export default function useGetAllPools() {
  // const { client, curChain } = useWalletContext();
  const networkType = useNetworkType();
  const currentAccount = useCurrentAccount();
  const { data: pairs } = useGetAllPairs();
  const restUrl = networkType === NetworkType.MAINNET ? SIDEREST_URL_MAINNET : SIDEREST_URL_TESTNET;

  const { data, isLoading: loading } = useQuery({
    queryKey: ['getAllPools'],
    enabled: !!pairs.length,
    queryFn: async () => {
      // debugger;
      if (!currentAccount?.address) return;
      // debugger;
      const cosmWasmClient = await CosmWasmClient.connect(restUrl);

      // debugger;
      const pools = await Promise.all(
        pairs.map(async (p) => {
          const address = p.contract_addr;
          const msg = {
            pool: {},
          };
          const pool = await cosmWasmClient.queryContractSmart(address, msg);

          const assetsMeta = pool.assets.map((a: any) => {
            return findAssetIcon({
              denom: a.info.native_token.denom,
              amount: '',
            });
          });

          // debugger;
          return {
            ...pool,
            contract_addr: address,
            pair: p,
            assetsMeta: assetsMeta.reduce((pre: any, cur: any) => {
              return {
                ...pre,
                [cur.base]: cur,
              };
            }, {}),
          };
        })
      );

      swapStore.allPools = pools;
      console.log('pools: ', pools);
      debugger;

      return pools as IPoolItem[];
    },
  });

  return {
    data: (data || []).filter((item) => !!item.total_share),
    loading,
  };
}
