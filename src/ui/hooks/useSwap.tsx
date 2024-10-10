import BigNumber from 'bignumber.js';
import { useRef } from 'react';
import toast from 'react-hot-toast';

import { CHAINS_ENUM, DEX_ROUTER_CONTRACT, sideChain } from '@/shared/constant';
import ToastView from '@/ui/components/ToastView';
import { useNavigate } from '@/ui/pages/MainRoute';
import services from '@/ui/services';
import { Pool, SwapRouteResult } from '@/ui/services/dex/type';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useSignAndBroadcastTxRaw } from '@/ui/state/transactions/hooks/cosmos';
import createExecuteMessage from '@/ui/utils/createExecuteMessage';
import { toReadableAmount, toUnitAmount } from '@/ui/utils/formatter';
import { coin } from '@cosmjs/stargate';

import { useAppDispatch } from '../state/hooks';
import { useRefreshData, useSwapState } from '../state/swap/hook';
import { SwapActions } from '../state/swap/reducer';
import { useGetSideBalanceList } from './useGetSideBalanceList';

export default function useSwap() {
  const { slippage, swapPair, swapRouteResult, allPools } = useSwapState();
  const refreshData = useRefreshData();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const currentAccount = useCurrentAccount();
  const { signAndBroadcastTxRaw } = useSignAndBroadcastTxRaw();
  const { pools, returnToken } = swapRouteResult;
  const { native, remote } = swapPair;
  // const {data: balanceList} = useGetMarketList();
  const { balanceList } = useGetSideBalanceList(currentAccount?.address);
  const assetIn = balanceList.find((item) => item.denom === native.denom);

  const assetOut = balanceList.find((item) => item.denom === remote.denom);

  // console.log(`assetIn: `, assetIn, balanceList);
  // console.log(`assetOut: `, assetIn, balanceList);
  const unitAmount = toUnitAmount(native.amount, assetIn?.asset?.exponent || 6);

  const minReceived =
    swapRouteResult?.pools?.length === 1 && swapRouteResult.pools[0].pairType.includes('transmuter')
      ? swapPair.remote.amount
      : BigNumber(returnToken?.amount || '0')
          .times(BigNumber(1).minus(BigNumber(slippage).div(100)))
          .toFixed(0, BigNumber.ROUND_DOWN);

  // console.log(`swapRouteResult: `, swapRouteResult, minReceived);
  const timer = useRef(null);

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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    timer.current = setTimeout(async () => {
      try {
        const result = await services.tx.getTxByHash(txHash, {
          baseURL: sideChain.restUrl
        });
        console.log('result: ', result);
        refreshData(async () => {
          const resultQuote = await services.dex.getValidRoutes(
            swapPair.native.denom,
            unitAmount,
            swapPair.remote.denom
          );

          const transmuterPools = allPools
            .filter((p) => {
              const pAssetOut = p.assets.find((a) => a.info.native_token.denom === swapPair.remote.denom);
              return (
                swapPair.native.denom in p.assetsMeta &&
                swapPair.remote.denom in p.assetsMeta &&
                p.pair.pair_type?.['custom'] === 'transmuter' &&
                BigNumber(pAssetOut?.amount || 0).gte(
                  toUnitAmount(
                    toReadableAmount(unitAmount, assetIn?.asset?.exponent || 6),
                    assetOut?.asset?.exponent || 6
                  )
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

          const priceMap = JSON.parse(localStorage.getItem('priceMap') || '{}');

          if (transmuterPools?.length > 0) {
            const selectedPool = transmuterPools[0];
            const offerToken = {
              ...selectedPool.assetsMeta[swapPair.native.denom],
              amount: unitAmount,
              showAmount: swapPair.native.amount,
              denom: swapPair.native.denom,
              price: priceMap?.[assetIn?.denom || ''] || '0',
              volume: ''
            };

            const remoteAmount = toUnitAmount(
              toReadableAmount(unitAmount, assetIn?.asset?.exponent || 6),
              assetOut?.asset?.exponent || 6
            );

            const returnToken = {
              ...selectedPool.assetsMeta[swapPair.remote.denom],
              amount: remoteAmount,
              showAmount: swapPair.native.amount,
              denom: swapPair.remote.denom,
              price: priceMap?.[assetOut?.denom || ''] || '0',
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
            dispatch(
              SwapActions.update({
                swapRouteResult: resultQuote[0],
                swapPair: {
                  native: {
                    denom: swapPair.native.denom,
                    amount: swapPair.native.amount
                  },
                  remote: {
                    denom: swapPair.remote.denom,
                    amount:
                      BigNumber(resultQuote[0]?.returnToken?.showAmount || '0')
                        .toFixed(assetOut?.asset.precision || 6, BigNumber.ROUND_DOWN)
                        .replace(/\.?0+$/, '') || '0'
                  }
                }
              })
            );
          } else {
            dispatch(
              SwapActions.update({
                swapRouteResult: {} as SwapRouteResult,
                swapPair: {
                  native: {
                    denom: swapPair.native.denom,
                    amount: swapPair.native.amount
                  },
                  remote: {
                    denom: swapPair.remote.denom,
                    amount: ''
                  }
                }
              })
            );
          }
        });
      } catch (err) {
        confirmTx(txHash);
      }
    }, 1000);
  };

  async function swap() {
    try {
      if (!currentAccount?.address) return;

      const funds = [coin(unitAmount, native.denom)];
      dispatch(SwapActions.update({ swapLoading: true }));
      const txMsg = createExecuteMessage({
        message: msg,
        senderAddress: currentAccount?.address,
        contractAddress: DEX_ROUTER_CONTRACT,
        funds
      });

      console.log('txMsg: ', txMsg);
      const result = await signAndBroadcastTxRaw({
        messages: [txMsg],
        memo: '',
        gas: BigNumber('600000').times(pools.length).toFixed()
      });
      dispatch(SwapActions.update({ swapLoading: false }));
      navigate('TxSuccessScreen', { txid: result.tx_response.txhash, chain: CHAINS_ENUM.SIDE });
      // confirmTx(result?.tx_response?.txhash);
    } catch (error) {
      toast.custom(
        (t) => (
          <ToastView toaster={t} type="fail">
            <div style={{ color: '#000000', marginBottom: '6px', fontSize: '12px', fontWeight: '500' }}>
              {(error as Error).message}
            </div>
          </ToastView>
        ),
        { duration: 5000 }
      );
      dispatch(SwapActions.update({ swapLoading: false }));
    }
  }

  return {
    swap
  };
}
