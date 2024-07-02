import { swapStore, useSwapStore } from '@/ui/stores/SwapStore';

import { useEffect } from 'react';

import { Pool, SwapRouteResult } from '@/ui/services/dex/type';
import BigNumber from 'bignumber.js';
import { toReadableAmount, toUnitAmount } from '@/ui/utils/formatter';
import { findAssetIcon } from '@/ui/utils/swap';

import services from '@/ui/services';

export default function useSwapSimulation() {
  const { swapPair, mode, limitRate, rateModified, isRateExchanged, allPools } = useSwapStore();

  const setData = (data: SwapRouteResult) => {
    const assetIn = findAssetIcon(swapPair.native);

    const assetOut = findAssetIcon(swapPair.remote);

    if (!rateModified) {
      swapStore.limitRate = isRateExchanged
        ? BigNumber(1)
            .div(data.exchangeRate || '1')
            .toFixed(Number(assetIn?.exponent || '6'), BigNumber.ROUND_DOWN)
            .replace(/\.?0+$/, '')
        : data.exchangeRate;
    }
    debugger;
    const outputAmount =
      mode === 'limit' && rateModified
        ? BigNumber(swapPair.native.amount || '0')
            .times(
              isRateExchanged
                ? BigNumber(1)
                    .div(limitRate || '1')
                    .toFixed(assetOut?.precision || 6, BigNumber.ROUND_DOWN)
                    .replace(/\.?0+$/, '')
                : limitRate
            )
            .toFixed()
        : BigNumber(data?.returnToken?.showAmount || '0')
            .toFixed(assetOut?.precision || 6, BigNumber.ROUND_DOWN)
            .replace(/\.?0+$/, '') || '0';

    swapStore.swapPair['remote'] = {
      denom: swapPair.remote.denom,
      amount: outputAmount,
    };

    if (data.returnToken) {
      data.returnToken.showAmount =
        BigNumber(data?.returnToken?.showAmount || '0')
          .toFixed(assetOut?.precision || 6, BigNumber.ROUND_DOWN)
          .replace(/\.?0+$/, '') || '0';
    }

    swapStore.swapRouteResult = data;
  };
  const setLoading = (loading: boolean) => {
    swapStore.responseLoading = loading;
  };

  const emptyResponse = {} as SwapRouteResult;

  const validPair =
    !!swapPair.native.denom &&
    !!swapPair.remote.denom &&
    BigNumber(swapPair.native?.amount || '0').gt(0) &&
    swapPair?.native.denom !== swapPair?.remote.denom &&
    allPools.length > 0;

  debugger;
  useEffect(() => {
    if (!validPair) {
      setData(emptyResponse);

      setLoading(false);
      return;
    }
    getData();
  }, [validPair, swapPair.native.amount, swapPair.native.denom, swapPair.remote.denom, rateModified]);

  const getData = async () => {
    try {
      setLoading(true);

      const assetIn = findAssetIcon(swapPair.native);

      const assetOut = findAssetIcon(swapPair.remote);

      const unitAmount = toUnitAmount(swapPair.native.amount, assetIn?.exponent || '6');

      const resultQuote = await services.dex.getValidRoutes(swapPair.native.denom, unitAmount, swapPair.remote.denom);

      // const resultQuote = [];

      const transmuterPools = swapStore.allPools
        .filter((p) => {
          const pAssetOut = p.assets.find((a) => a.info.native_token.denom === swapPair.remote.denom);
          return (
            swapPair.native.denom in p.assetsMeta &&
            swapPair.remote.denom in p.assetsMeta &&
            p.pair.pair_type?.['custom'] === 'transmuter' &&
            BigNumber(pAssetOut?.amount || 0).gte(toUnitAmount(toReadableAmount(unitAmount, assetIn?.exponent || 6), assetOut?.exponent || 6))
          );
        })
        .sort((a, b) => {
          const aOut = a.assets.find((a) => a.info.native_token.denom === swapPair.remote.denom);

          const bOut = b.assets.find((a) => a.info.native_token.denom === swapPair.remote.denom);

          if (!aOut || !bOut) return 0;
          if (BigNumber(aOut.amount).gt(bOut.amount)) return -1;
          return 1;
        });

      debugger;
      const unitPriceMap = JSON.parse(localStorage.getItem('unitPriceMap') || '{}');

      if (transmuterPools?.length > 0) {
        debugger;
        const selectedPool = transmuterPools[0];
        const offerToken = {
          ...selectedPool.assetsMeta[swapPair.native.denom],
          amount: unitAmount,
          showAmount: swapPair.native.amount,
          denom: swapPair.native.denom,
          price: unitPriceMap?.[assetIn?.coingecko_id || '']?.usd || '0',
          volume: '',
        };

        const remoteAmount = toUnitAmount(toReadableAmount(unitAmount, assetIn?.exponent || 6), assetOut?.exponent || 6);

        const returnToken = {
          ...selectedPool.assetsMeta[swapPair.remote.denom],
          amount: remoteAmount,
          showAmount: swapPair.native.amount,
          denom: swapPair.remote.denom,
          price: unitPriceMap?.[assetOut?.coingecko_id || '']?.usd || '0',
          volume: '',
        };

        const formattedPool: Pool = {
          ...selectedPool,
          pairType: JSON.stringify(selectedPool.pair.pair_type),
          contractAddr: selectedPool.contract_addr,
          offerToken,
          returnToken,
          feeAmount: '0',
          feeRate: '0',
          marketPrice: '0',
          feeShowAmount: '0',
        };

        const result: SwapRouteResult = {
          offerToken: offerToken,
          returnToken: returnToken,
          feeRate: '0',
          feeShowAmount: '0',
          feeAmount: '0',
          exchangeRate: '1',
          exchangeRateVolume: BigNumber(returnToken.price)
            .times(returnToken.showAmount)
            .toFixed(4)
            .replace(/\.?0*$/, ''),
          pools: [formattedPool],
          priceImpact: '0',
          sort: 100,
        };

        if (resultQuote?.length > 0 && BigNumber(remoteAmount).gt(resultQuote?.[0]?.returnToken?.amount || '0')) {
          resultQuote.unshift(result);
        }

        if (resultQuote.length === 0) {
          resultQuote.push(result);
        }
      }

      if (resultQuote.length > 0) {
        debugger;
        setData(resultQuote[0]);
      } else {
        setData(emptyResponse);
      }
    } catch (err) {
      setData(emptyResponse);
    } finally {
      setLoading(false);
    }
  };
}
