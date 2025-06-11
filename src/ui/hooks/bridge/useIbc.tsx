import dayjs from 'dayjs';
import { useState } from 'react';

import { CHAINS_ENUM } from '@/shared/constant';
import { useNavigate } from '@/ui/pages/MainRoute';
import services from '@/ui/services';
import { GetTxByHashResponse } from '@/ui/services/tx/types';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useBridgeState } from '@/ui/state/bridge/hook';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useSignAndBroadcastTxRaw } from '@/ui/state/transactions/hooks/cosmos';
import { parseUnitAmount } from '@/ui/utils';

export function useIbc() {
  const { bridgeAmount, fromChain, toChain, fromAsset, toAddress } = useBridgeState();
  const [loading, setLoading] = useState(false);
  const currentAccount = useCurrentAccount();
  const { signAndBroadcastTxRaw } = useSignAndBroadcastTxRaw();
  const { sideChain } = useEnvironment();
  const navigate = useNavigate();

  const sendIbc = async () => {
    try {
      if (!fromChain || !toChain || !fromAsset || !fromAsset.asset.ibcData) return;

      const timeout = dayjs().add(1, 'hour');
      const ibcInfo = fromAsset.asset.ibcData.find(
        (item) => item.oppositeChainId === (fromChain.isCosmos ? fromChain.chainID : toChain.chainID)
      );
      if (!ibcInfo) return;
      setLoading(true);
      const msg = {
        typeUrl: '/ibc.applications.transfer.v1.MsgTransfer',
        value: {
          sourcePort: ibcInfo.portId,
          sourceChannel: fromChain.isCosmos ? ibcInfo.sideChainChannelId : ibcInfo.oppositeChainChannelId,
          token: {
            amount: parseUnitAmount(bridgeAmount, fromAsset.asset.exponent),
            denom: fromAsset.denom
          },
          sender: currentAccount.address,
          receiver: toAddress,
          // timeoutTimestamp: String(timeout.utc().valueOf() * 1000000),
          timeoutTimestamp: String(timeout.valueOf() * 1000000),
          timeoutHeight: undefined,
          memo: toChain.isBitcoin ? JSON.stringify({ dest_callback: { address: 'btcbridge' } }) : ''
        }
      };

      const result = await signAndBroadcastTxRaw({
        messages: [msg]
      });

      let hashResponse: GetTxByHashResponse | null = null;
      while (!hashResponse) {
        try {
          hashResponse = await services.tx.getTxByHash(result.tx_response.txhash, {
            baseURL: sideChain.restUrl
          });
        } catch (err) {
          await new Promise((r) => setTimeout(r, 1000));
        }
      }

      if (hashResponse.tx_response.code === 0) {
        navigate('TxSuccessScreen', { txid: result.tx_response.txhash, chain: CHAINS_ENUM.SIDE, type: 'bridge' });
      }
    } catch (err) {
      const error = err as Error;
      navigate('TxFailScreen', { error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return {
    sendIbc,
    loading
  };
}
