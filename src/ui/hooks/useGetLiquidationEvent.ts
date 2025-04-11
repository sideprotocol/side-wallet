import { useQuery } from 'react-query';

import { sideChain } from '@/shared/constant';
import { BalanceItem } from '@/shared/types';

import services from '../services';
import { useCurrentAccount } from '../state/accounts/hooks';
import { toUnitAmount } from '../utils/formatter';
import useGetBitcoinBalanceList from './useGetBitcoinBalanceList';

export default function useGetLiquidationEvent({
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

  const { balanceList: bitcoinBalanceList } = useGetBitcoinBalanceList(currentAccount?.address);

  const bitcoinToken = bitcoinBalanceList.find((item) => item.denom === 'sat');

  const { data } = useQuery({
    queryKey: [
      'getLiquidationEvent',
      { bitcoinAmount, borrowTokenAmount, bitcoinPrice: bitcoinToken?.denomPrice, maturity }
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
    enabled: !!bitcoinToken && !!borrowToken
  });

  return {
    liquidationEvent: data
  };
}
