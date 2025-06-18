import { useQuery } from 'react-query';

import services from '@/ui/services';
import { useEnvironment } from '@/ui/state/environment/hooks';

export function useGetBitcoinTxsConfirms(txs?: string[]) {
  const { SIDE_BTC_EXPLORER } = useEnvironment();
  const { data } = useQuery({
    queryKey: ['getBitcoinTxsConfirms', { txs }],
    queryFn: async () => {
      const btcBlockHeight = await services.bridge.getBlockHeight(SIDE_BTC_EXPLORER);
      const txsConfirms: Array<{ tx: string; confirms: number }> = [];
      for (let i = 0; i < txs!.length; i++) {
        const tx = txs![i];
        const txInfo = await services.bridge.getTx(tx, SIDE_BTC_EXPLORER);
        if (txInfo?.status.confirmed) {
          txsConfirms.push({
            tx,
            confirms: btcBlockHeight - txInfo.status.block_height + 1
          });
        } else {
          txsConfirms.push({
            tx,
            confirms: 0
          });
        }
      }
      return txsConfirms;
    },
    enabled: !!txs,
    refetchInterval: 60000,
    refetchIntervalInBackground: true
  });

  return {
    txsConfirms: data || []
  };
}
