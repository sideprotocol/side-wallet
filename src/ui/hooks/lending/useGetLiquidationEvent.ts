import { useQuery } from 'react-query';

import { BalanceItem } from '@/shared/types';
import services from '@/ui/services';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { toUnitAmount } from '@/ui/utils/formatter';

import useGetBitcoinBalanceList from '../useGetBitcoinBalanceList';

export function useGetLiquidationEvent({
  bitcoinAmount,
  borrowToken,
  borrowTokenAmount,
  poolId,
  maturity
}: {
  bitcoinAmount: string;
  borrowToken?: BalanceItem;
  borrowTokenAmount: string;
  poolId: string;
  maturity?: string;
}) {
  const currentAccount = useCurrentAccount();
  const { sideChain } = useEnvironment();
  const { balanceList: bitcoinBalanceList } = useGetBitcoinBalanceList(currentAccount?.address);

  const bitcoinToken = bitcoinBalanceList.find((item) => item.denom === 'sat');

  const { data, refetch, isLoading } = useQuery({
    queryKey: [
      'getLiquidationEvent',
      { bitcoinAmount, borrowTokenAmount, bitcoinPrice: bitcoinToken?.denomPrice, maturity, sideChain }
    ],
    queryFn: async () => {
      return services.lending.getLiquidationEvent(
        {
          collateral_amount: `${toUnitAmount(bitcoinAmount, bitcoinToken!.asset.exponent)}${bitcoinToken!.denom}`,
          borrow_amount: `${toUnitAmount(borrowTokenAmount, borrowToken?.asset.exponent || 6)}${borrowToken?.denom}`,
          pool_id: poolId,
          maturity: maturity!
        },
        { baseURL: sideChain.restUrl }
      );
    },
    enabled: !!bitcoinToken && !!borrowToken && !!+bitcoinAmount && !!maturity && !!poolId && !!+borrowTokenAmount
  });

  return {
    liquidationEvent: data,
    refetch,
    isLoading
  };
}
