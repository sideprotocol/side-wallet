import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { BalanceItem } from '@/shared/types';
import services from '@/ui/services';
import { GetLeadingParamsResponse, LeadingPool } from '@/ui/services/lending/types';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { formatUnitAmount } from '@/ui/utils';

import { useGetSideBalanceList } from '../useGetSideBalanceList';
import { useGetLendingParams } from './useGetLendingParams';

export interface PoolDataItem {
  totalSupply: string;
  totalBorrow: string;
  utilization: string;
  contracts: number;
  supplyApy: string;
  borrowApy: string;
  borrowApyMax: string;
  totalSupplyInUsd: string;
  totalBorrowInUsd: string;
  token: BalanceItem;
  baseData: LeadingPool;
  lendingParams: GetLeadingParamsResponse['params'];
  ofBorrowers: number;
  ofSuppliers: number;
  availableAmountInUsd: string;
  tranches: Array<{ maturity: string; total_borrowed: string }>;
}

export function useGetPoolsData() {
  const currentAccount = useCurrentAccount();
  const { sideChain, SERVICE_BASE_URL } = useEnvironment();
  const { balanceList } = useGetSideBalanceList(currentAccount?.address);

  const { data: lendingParams } = useGetLendingParams();
  const { data: lendingPools, isLoading: loading } = useQuery({
    queryKey: ['getLendingPoolsData', { sideChain, SERVICE_BASE_URL }],
    queryFn: async () => {
      return services.lending.getLendingPools({}, { baseURL: sideChain.restUrl });
    }
  });

  const { data: lendingPoolsBase } = useQuery({
    queryKey: ['getLendingPoolsDataBase'],
    queryFn: async () => {
      return services.lending.getLendingPoolsBase({}, { baseURL: SERVICE_BASE_URL });
    }
  });

  const data = useMemo(() => {
    const poolData: PoolDataItem[] = [];
    if (!lendingParams || !lendingPools?.pools || !lendingPoolsBase) {
      return poolData;
    }

    lendingPools.pools.forEach((item) => {
      let token = balanceList.find((o) => o.denom === item.config.lending_asset.denom)!;
      const lendingPoolBase = lendingPoolsBase.content.find((o) => o.tokenDenom === item.config.lending_asset.denom);
      if (!token) {
        return;
      }

      const totalSupply = formatUnitAmount(item.supply.amount, token.asset.exponent);
      const totalBorrow = formatUnitAmount(item.total_borrowed, token.asset.exponent);

      const minBorrowApy = lendingPoolBase?.config.tranches.reduce((min, current) => {
        return Math.min(min, current.borrow_apr / 10);
      }, 1000);
      const maxBorrowApy = lendingPoolBase?.config.tranches.reduce((max, current) => {
        return Math.max(max, current.borrow_apr / 10);
      }, 0);

      poolData.push({
        totalSupply,
        totalBorrow,
        utilization: new BigNumber(+totalBorrow || 0)
          .div(+totalSupply || 1)
          .multipliedBy(100)
          .toFixed(2),
        contracts: lendingPoolBase?.ofContracts || 0,
        supplyApy: lendingPoolBase?.supplyAPY || '0',
        borrowApy: minBorrowApy?.toString() || '0',
        borrowApyMax: maxBorrowApy?.toString() || '0',
        token,
        baseData: item,
        lendingParams: lendingParams.params,
        totalSupplyInUsd: lendingPoolBase?.totalSupplyInDollar || '0',
        totalBorrowInUsd: lendingPoolBase?.totalBorrowInDollar || '0',
        ofBorrowers: lendingPoolBase?.ofBorrowers || 0,
        ofSuppliers: lendingPoolBase?.ofSuppliers || 0,
        availableAmountInUsd: lendingPoolBase?.availableAmountInDollar || '0',
        tranches: lendingPoolBase?.tranches || []
      });
    });

    return poolData;
  }, [lendingParams, lendingPools?.pools, balanceList, lendingPoolsBase]);

  return {
    data: data || [],
    loading
  };
}
