import { useQuery } from 'react-query';

import { SIDERPC_URL_TESTNET } from '@/shared/constant';
import { NetworkType } from '@/shared/types';
// import { useWalletContext } from "@/ui/components/WalletContext";
import { IPoolItem } from '@/ui/services/dex/type';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useNetworkType } from '@/ui/state/settings/hooks';
import { swapStore } from '@/ui/stores/SwapStore';
import { findAssetIcon } from '@/ui/utils/swap';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';

import useGetAllPairs from './useGetAllPairs';
import {useGetSideBalanceList} from '@/ui/hooks/useGetBalance';

export default function useGetAllPools() {
  const currentAccount = useCurrentAccount();
  const { balanceList } = useGetSideBalanceList(currentAccount?.address);
  const networkType = useNetworkType();
  const { data: pairs } = useGetAllPairs();
  // const restUrl = networkType === NetworkType.MAINNET ? SIDERPC_URL_TESTNET : SIDERPC_URL_TESTNET;
  const restUrl = networkType === NetworkType.TESTNET ? SIDERPC_URL_TESTNET : SIDERPC_URL_TESTNET;

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
            pool: {}
          };
          const pool = await cosmWasmClient.queryContractSmart(address, msg);

          // const assetsMeta = pool?.assets?.map((a: any) => {
          //   return findAssetIcon({
          //     denom: a.info.native_token.denom,
          //     amount: ''
          //   });
          // });
          const assetsMeta = pool.assets.map((a: any) => {
            return balanceList.find(item => item.denom === a.info.native_token.denom);
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
