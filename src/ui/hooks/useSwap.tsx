import BigNumber from 'bignumber.js';
import { useRef } from 'react';
import toast from 'react-hot-toast';

import ToastView from '@/ui/components/ToastView';
// import signAndBroadcastTxRaw from '@/ui/utils/createTxRaw';
import { DEX_ROUTER_CONTRACT } from '@/ui/constants';
import { ToastOptions } from '@/ui/constants/toast';
import services from '@/ui/services';
import { Pool, SwapRouteResult } from '@/ui/services/dex/type';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useSignAndBroadcastTxRaw } from '@/ui/state/transactions/hooks/cosmos';
import { refreshData, swapStore, useSwapStore } from '@/ui/stores/SwapStore';
import createExecuteMessage from '@/ui/utils/createExecuteMessage';
import { toReadableAmount, toUnitAmount } from '@/ui/utils/formatter';
import { findAssetIcon } from '@/ui/utils/swap';
import { coin } from '@cosmjs/stargate';

export default function useSwap() {
  const { slippage, swapPair, swapRouteResult } = useSwapStore();

  const currentAccount = useCurrentAccount();
  const { signAndBroadcastTxRaw } = useSignAndBroadcastTxRaw();
  const { pools, returnToken } = swapRouteResult;

  // const { client, curWallet, curChain } = useWalletContext();

  const { native, remote } = swapPair;

  const assetIn = findAssetIcon(native);

  const assetOut = findAssetIcon(remote);

  const unitAmount = toUnitAmount(native.amount, assetIn?.exponent || 6);

  const minReceived =
    swapRouteResult?.pools?.length === 1 && swapRouteResult.pools[0].pairType.includes('transmuter')
      ? swapPair.remote.amount
      : BigNumber(returnToken?.amount || '0')
          .times(BigNumber(1).minus(BigNumber(slippage).div(100)))
          .toFixed(0, BigNumber.ROUND_DOWN);

  const timer = useRef<NodeJS.Timeout | null>(null);

  const msg = {
    execute_swap_operations: {
      operations: pools?.map((p) => {
        return {
          astro_swap: {
            offer_asset_info: {
              native_token: {
                denom: p.offerToken.denom
              }
            },
            ask_asset_info: {
              native_token: {
                denom: p.returnToken.denom
              }
            }
          }
        };
      }),
      minimum_receive: minReceived,
      max_spread: '0.5'
    }
  };

  const confirmTx = async (txHash: string) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(async () => {
      try {
        const result = await services.tx.getTxByHash(txHash, {
          baseURL: 'https://testnet-rest.side.one/'
        });

        refreshData(async () => {
          const resultQuote = await services.dex.getValidRoutes(
            swapPair.native.denom,
            unitAmount,
            swapPair.remote.denom
          );

          const transmuterPools = swapStore.allPools
            .filter((p) => {
              const pAssetOut = p.assets.find((a) => a.info.native_token.denom === swapPair.remote.denom);
              return (
                swapPair.native.denom in p.assetsMeta &&
                swapPair.remote.denom in p.assetsMeta &&
                p.pair.pair_type?.['custom'] === 'transmuter' &&
                BigNumber(pAssetOut?.amount || 0).gte(
                  toUnitAmount(toReadableAmount(unitAmount, assetIn?.exponent || 6), assetOut?.exponent || 6)
                )
              );
            })
            .sort((a, b) => {
              const aOut = a.assets.find((a) => a.info.native_token.denom === swapPair.remote.denom);

              const bOut = b.assets.find((a) => a.info.native_token.denom === swapPair.remote.denom);

              if (!aOut || !bOut) return 0;
              if (BigNumber(aOut.amount).gt(bOut.amount)) return -1;
              return 1;
            });

          const unitPriceMap = JSON.parse(localStorage.getItem('unitPriceMap') || '{}');

          if (transmuterPools?.length > 0) {
            const selectedPool = transmuterPools[0];
            const offerToken = {
              ...selectedPool.assetsMeta[swapPair.native.denom],
              amount: unitAmount,
              showAmount: swapPair.native.amount,
              denom: swapPair.native.denom,
              price: unitPriceMap?.[assetIn?.coingecko_id || '']?.usd || '0',
              volume: ''
            };

            const remoteAmount = toUnitAmount(
              toReadableAmount(unitAmount, assetIn?.exponent || 6),
              assetOut?.exponent || 6
            );

            const returnToken = {
              ...selectedPool.assetsMeta[swapPair.remote.denom],
              amount: remoteAmount,
              showAmount: swapPair.native.amount,
              denom: swapPair.remote.denom,
              price: unitPriceMap?.[assetOut?.coingecko_id || '']?.usd || '0',
              volume: ''
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
              feeShowAmount: '0'
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
              sort: 100
            };

            if (resultQuote?.length > 0 && BigNumber(remoteAmount).gt(resultQuote?.[0]?.returnToken?.amount || '0')) {
              resultQuote.unshift(result);
            }

            if (resultQuote.length === 0) {
              resultQuote.push(result);
            }
          }

          if (resultQuote.length > 0) {
            swapStore.swapRouteResult = resultQuote[0];
            swapStore.swapPair['remote'] = {
              denom: swapPair.remote.denom,
              amount:
                BigNumber(resultQuote[0]?.returnToken?.showAmount || '0')
                  .toFixed(assetOut?.precision || 6, BigNumber.ROUND_DOWN)
                  .replace(/\.?0+$/, '') || '0'
            };
          } else {
            swapStore.swapRouteResult = {} as SwapRouteResult;
            swapStore.swapPair['remote'] = {
              denom: swapPair.remote.denom,
              amount: ''
            };
          }
        });

        // if (result?.tx_response?.code === 0) {
        //   swapStore.swapLoading = false;

        //   const des = 'Transaction Successful! Your swap has been executed.';

        //   toast.custom(
        //     (t) => (
        //       <ToastView
        //         toaster={t}
        //         type="success"
        //         txHashUrl={`${curChain.explorerUrl}/tx/${result.tx_response.txhash}`}>
        //         <div style={{ color: '#000000', marginBottom: '6px', fontSize: '12px', fontWeight: '500' }}>{des}</div>
        //       </ToastView>
        //     ),
        //     ToastOptions
        //   );
        // } else {
        //   swapStore.swapLoading = false;

        //   const des = 'Transaction failed. Please try again.';
        // }
      } catch (err) {
        confirmTx(txHash);
      }
    }, 1000);
  };

  async function swap() {
    try {
      if (!currentAccount?.address) return;

      const funds = [coin(unitAmount, native.denom)];
      swapStore.swapLoading = true;

      debugger;
      const txMsg = createExecuteMessage({
        message: msg,
        senderAddress: currentAccount?.address,
        contractAddress: DEX_ROUTER_CONTRACT,
        funds
      });

      try {
        console.log(`txMsg: `, txMsg);
        const result = await signAndBroadcastTxRaw({
          messages: [txMsg],
          memo: '',
          gas: BigNumber('600000').times(pools.length).toFixed(),
        });
        confirmTx(result?.transactionHash);
      } catch (err) {
        debugger;
        console.log(`err: `, err);
      }
      // const result = await signAndBroadcastTxRaw({
      //   messages: [txMsg],
      //   memo: '',
      //   gas: BigNumber('600000').times(pools.length).toFixed(),
      // });
      // confirmTx(result?.transactionHash);
      debugger;
    } catch (error) {
      toast.custom(
        (t) => (
          <ToastView toaster={t} type="fail">
            <div style={{ color: '#000000', marginBottom: '6px', fontSize: '12px', fontWeight: '500' }}>
              {(error as Error).message}
            </div>
          </ToastView>
        ),
        ToastOptions
      );

      swapStore.swapLoading = false;
    }
  }

  return {
    swap
  };
}
