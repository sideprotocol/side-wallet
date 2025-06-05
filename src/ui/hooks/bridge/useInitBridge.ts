import { useEffect } from 'react';
import { useQuery } from 'react-query';

import services from '@/ui/services';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useBridgeState } from '@/ui/state/bridge/hook';
import { BridgeActions } from '@/ui/state/bridge/reducer';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useAppDispatch } from '@/ui/state/hooks';

import useGetBitcoinBalanceList from '../useGetBitcoinBalanceList';
import { useGetSideBalanceList } from '../useGetSideBalanceList';
import { useGetAllBridgeChains } from './useGetAllBridgeChains';

export function useInitBridge() {
  const currentAccount = useCurrentAccount();
  const dispatch = useAppDispatch();
  const { UNISAT_IO_API, UNISAT_SERVICE_ENDPOINT, sideChain } = useEnvironment();
  const { fromAsset, fromAddress } = useBridgeState();
  const allBridgeChains = useGetAllBridgeChains();

  const { balanceList: bitcoinBalanceList, loading: bitcoinLoading } = useGetBitcoinBalanceList(
    currentAccount?.address
  );
  const { balanceList: sideBalanceList, loading: sideLoading } = useGetSideBalanceList(currentAccount?.address);

  useQuery({
    queryKey: ['initBridgeData', { UNISAT_IO_API, UNISAT_SERVICE_ENDPOINT, address: fromAddress }],
    queryFn: async () => {
      const paramsData = await services.bridge.getBridgeParams(UNISAT_IO_API);

      const feeSummaryData = await services.unisat.getFeeSummary(UNISAT_SERVICE_ENDPOINT);
      const rcFee = feeSummaryData.list[2].feeRate;

      dispatch(BridgeActions.update({ params: paramsData, fee: +rcFee, feeSummary: feeSummaryData.list }));
    }
  });

  const loading = bitcoinLoading || sideLoading;

  useEffect(() => {
    if (!loading && (!fromAsset || fromAddress !== currentAccount.address) && bitcoinBalanceList.length > 0) {
      const btcAsset = bitcoinBalanceList.find((item) => item.denom === 'sat');
      const sbtcAsset = sideBalanceList.find((item) => item.denom === 'sat');
      dispatch(
        BridgeActions.update({
          fromChain: allBridgeChains.find((item) => item.isBitcoin),
          toChain: sideChain,
          fromAsset: btcAsset,
          toAsset: sbtcAsset,
          toAddress: currentAccount.address,
          balance: btcAsset?.formatAmount
        })
      );
    }
  }, [loading]);

  useEffect(() => {
    dispatch(
      BridgeActions.update({
        fromAddress: currentAccount.address
      })
    );
  }, [currentAccount.address]);
}
