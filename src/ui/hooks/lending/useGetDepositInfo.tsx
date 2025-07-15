import BigNumber from 'bignumber.js';
import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import { NetworkType } from '@/shared/types';
import services from '@/ui/services';
import { Loan } from '@/ui/services/lending/types';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useNetworkType } from '@/ui/state/settings/hooks';
import { formatUnitAmount } from '@/ui/utils';
import { analyzeTransaction, AnalyzeTransactionResult } from '@/ui/utils/mempool';
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

export function useGetDepositInfo(loan?: Loan) {
  const { SIDE_BTC_EXPLORER } = useEnvironment();
  const networkType = useNetworkType();
  const queryClient = useQueryClient();
  const collateralUnitAmount = loan?.collateral_amount || '0';

  const {
    data,
    isLoading: loading,
    refetch,
    isSuccess
  } = useQuery({
    queryKey: ['getDepositTxByCollateralAddress', { collateralAddress: loan?.vault_address, collateralUnitAmount }],
    queryFn: async () => {
      const txs = await services.bridge.getMemPoolTxs(loan!.vault_address, SIDE_BTC_EXPLORER);
      const addressSummary = await services.bridge.getMemPoolAddress(loan!.vault_address, SIDE_BTC_EXPLORER);

      let realCollateralAmount =
          addressSummary.chain_stats.funded_txo_sum +
          addressSummary.mempool_stats.funded_txo_sum -
          (addressSummary.chain_stats.spent_txo_sum + addressSummary.mempool_stats.spent_txo_sum),
        txBase64s: string[] = [],
        txids: string[] = [],
        depositEnough = false,
        errorMessage = '',
        txDatas: AnalyzeTransactionResult[] = [];

      if (txs.length === 0) {
        errorMessage = 'The vault has not yet received your collateral funding.';
      } else {
        const txsResult = await Promise.all(
          txs.map(async (tx) => {
            const txData = analyzeTransaction(tx, loan!.vault_address);
            const txid = tx.txid;
            const txHex = await services.bridge.getTxHex(txid, SIDE_BTC_EXPLORER);
            return {
              txHex,
              txid,
              txData
            };
          })
        );

        txBase64s = await Promise.all(
          txsResult.map(async ({ txid }) => {
            const psbt = await buildPsbtFromTxHex(txid, SIDE_BTC_EXPLORER, networkType);
            return psbt.toBase64();
          })
        );

        txids = txs.map((tx) => tx.txid);
        txDatas = txsResult.map((item) => item.txData);

        if (new BigNumber(realCollateralAmount).lt(new BigNumber(collateralUnitAmount))) {
          errorMessage = `The vault received only ${formatUnitAmount(
            realCollateralAmount,
            8
          )} BTC. Please send more to reach ${formatUnitAmount(collateralUnitAmount, 8)} BTC.`;
        } else {
          depositEnough = true;
        }
      }
      return { txBase64s, txids, realCollateralAmount, depositEnough, errorMessage, txDatas };
    },
    refetchInterval: (data) => {
      return data ? false : 4000;
    },
    refetchIntervalInBackground: true,
    enabled: !!loan
  });

  useEffect(() => {
    return () => {
      queryClient.cancelQueries(['getDepositTxByCollateralAddress']);
    };
  }, []);

  return {
    loading,
    isSuccess,
    depositInfo: data,
    refetch
  };
}
