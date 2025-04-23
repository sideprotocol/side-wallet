import BigNumber from 'bignumber.js';
import { useQuery } from 'react-query';

import services from '@/ui/services';

import { formatUnitAmount } from '../utils';
import { buildPsbtFromTxHex } from './useApproveLoan';

export default function useGetDepositTx(collateralAddress: string, collateralUnitAmount: string) {
  const {
    data,
    isLoading: loading,
    refetch
  } = useQuery({
    queryKey: ['getDepositTxByCollateralAddress', { collateralAddress, collateralUnitAmount }],
    queryFn: async () => {
      const txs = await services.bridge.getMemPoolTxs(collateralAddress);
      const addressSummary = await services.bridge.getMemPoolAddress(collateralAddress);

      const value =
        addressSummary.chain_stats.funded_txo_sum +
        addressSummary.mempool_stats.funded_txo_sum -
        (addressSummary.chain_stats.spent_txo_sum + addressSummary.mempool_stats.spent_txo_sum);

      if (txs.length === 0) {
        throw new Error('The vault has not yet received your collateral funding.');
      } else if (new BigNumber(value).lt(new BigNumber(collateralUnitAmount))) {
        throw new Error(
          `The vault received only ${formatUnitAmount(
            value.toString(),
            8
          )} BTC. Please send more to reach ${formatUnitAmount(collateralUnitAmount, 8)} BTC.`
        );
      } else {
        console.log({ txs });

        const txBase64s = await Promise.all(
          txs.map(async (tx) => {
            const psbt = await buildPsbtFromTxHex(tx.txid);
            return psbt.toBase64();
          })
        );

        const txids = txs.map((tx) => tx.txid);

        return { txBase64s, txids, value };
      }
    },
    refetchInterval: (data) => {
      return data ? false : 4000;
    },
    refetchIntervalInBackground: true
  });

  return {
    loading,
    depositTxs: data?.txBase64s,
    txids: data?.txids,
    value: data?.value,
    refetch
  };
}
