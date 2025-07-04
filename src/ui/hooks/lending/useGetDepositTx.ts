import BigNumber from 'bignumber.js';
import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import { NetworkType } from '@/shared/types';
import services from '@/ui/services';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useNetworkType } from '@/ui/state/settings/hooks';
import { formatUnitAmount } from '@/ui/utils';
import { bitcoin } from '@unisat/wallet-sdk/lib/bitcoin-core';

async function buildPsbtFromTxHex(txid: string, SIDE_BTC_EXPLORER: string, networkType: NetworkType) {
  const txHex = await services.bridge.getTxHex(txid, SIDE_BTC_EXPLORER);
  const tx = bitcoin.Transaction.fromHex(txHex);
  const psbt = new bitcoin.Psbt({
    network: networkType === NetworkType.MAINNET ? bitcoin.networks.bitcoin : bitcoin.networks.testnet
  });

  psbt.setVersion(tx.version);

  tx.ins.forEach((input, _) => {
    const inputData: {
      hash: Buffer;
      index: number;
      sequence: number;
      witness?: Buffer[];
    } = {
      hash: input.hash,
      index: input.index,
      sequence: input.sequence
    };
    if (input.witness && input.witness.length > 0) {
      inputData.witness = input.witness;
    }
    psbt.addInput(inputData);
  });

  tx.outs.forEach((output) => {
    psbt.addOutput({
      script: output.script,
      value: output.value
    });
  });

  psbt.setLocktime(tx.locktime);

  return psbt;
}

export function useGetDepositTx(collateralAddress = '', collateralUnitAmount = '0') {
  const networkType = useNetworkType();
  const { SIDE_BTC_EXPLORER } = useEnvironment();
  const queryClient = useQueryClient();

  const {
    data,
    isLoading: loading,
    refetch
  } = useQuery({
    queryKey: ['getDepositTxByCollateralAddress', { collateralAddress, collateralUnitAmount, SIDE_BTC_EXPLORER }],
    queryFn: async () => {
      const txs = await services.bridge.getMemPoolTxs(collateralAddress, SIDE_BTC_EXPLORER);
      const addressSummary = await services.bridge.getMemPoolAddress(collateralAddress, SIDE_BTC_EXPLORER);

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
        const txBase64s = await Promise.all(
          txs.map(async (tx) => {
            const psbt = await buildPsbtFromTxHex(tx.txid, SIDE_BTC_EXPLORER, networkType);
            return psbt.toBase64();
          })
        );

        const txids = txs.map((tx) => tx.txid);

        return { txBase64s, txids, value, collateralAddress };
      }
    },
    refetchInterval: (data) => {
      return data ? false : 4000;
    },
    refetchIntervalInBackground: false,
    enabled: !!collateralAddress
  });

  useEffect(() => {
    return () => {
      queryClient.cancelQueries(['getDepositTxByCollateralAddress']);
    };
  }, []);

  return {
    loading,
    depositTxs: data?.txBase64s,
    address: data?.collateralAddress,
    txids: data?.txids,
    value: data?.value,
    refetch
  };
}
