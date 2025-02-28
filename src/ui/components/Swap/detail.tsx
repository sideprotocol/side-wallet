// import { Box, ListItem } from "@mui/material";
import BigNumber from 'bignumber.js';
import { useState } from 'react';

import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useSwapState } from '@/ui/state/swap/hook';

// import Collapse from "@mui/material/Collapse";

// import SwapRoutes from "./SwapRoutes";

function SwapDetail() {
  const { swapPair, slippage, swapRouteResult } = useSwapState();
  const [isCollapse, setIsCollapse] = useState(false);
  const currentAccount = useCurrentAccount();

  const { balanceList } = useGetSideBalanceList(currentAccount?.address);

  const priceImpact = BigNumber(swapRouteResult.priceImpact || '0').toFixed(2);

  const isPriceImpactOver = BigNumber(priceImpact).gt(10);

  const fee = swapRouteResult.feeRate + '%';

  const assetOut = balanceList.find((item) => item.denom === swapPair.remote.denom);

  const feePrice = swapRouteResult.feeShowAmount;

  const swapRate = swapRouteResult.exchangeRate;

  const ratePrice = swapRouteResult.exchangeRateVolume;

  const minReceived0 = BigNumber(swapRouteResult?.returnToken?.showAmount || '')
    .times(BigNumber(1).minus(BigNumber(slippage).div(100)))
    .toFixed(assetOut?.asset.precision || 6, BigNumber.ROUND_DOWN)
    .replace(/\.?0*$/, '');

  const minReceived =
    swapRouteResult?.pools?.length === 1 && swapRouteResult.pools[0].pairType.includes('transmuter')
      ? swapPair.remote.amount
      : minReceived0;

  const itemData: {
    id: string;
    text: string;
    value: string | JSX.Element;
  }[] = [
    {
      id: 'price_impact',
      text: 'Price impact',
      value: `${priceImpact}%`
    },

    {
      id: 'min_received',
      text: 'Minimum Received',
      value: `${minReceived} ${assetOut?.asset.symbol}`
    },

    {
      id: 'fee',
      text: `Fee (${fee})`,
      value: `${feePrice} ${assetOut?.asset.symbol}`
    }

    // {
    //   id: "order_routing",
    //   text: "Order routing",
    //   value: <RouteComponent />,
    // },
  ];

  function RenderItem({ text, value }: { text: string; value: string | JSX.Element }) {
    return (
      <div
        className={'pt-[12px]'}
        key={text + value}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '14px'
        }}>
        <div
          style={{
            color: '#7D7D7D'
          }}>
          {text}
        </div>

        <div
          style={{
            color: text !== 'Price impact' ? 'white' : 'rgb(246, 70, 93)',
            textAlign: 'right'
          }}>
          {value}
        </div>
      </div>
    );
  }

  const assetIn = balanceList.find((item) => item.denom === swapPair.native.denom);

  return (
    <>
      <div
        className={`flex justify-between items-center ${
          isCollapse ? 'pb-[0px]' : 'pb-[10px] border-b-[1px] border-b-solid border-b-[#8E8E8F]/20'
        }`}>
        <div className="text-[14px]">
          1 {assetIn?.asset?.symbol || swapPair.native?.denom || '-'} = {swapRate}{' '}
          {assetOut?.asset.symbol || swapPair.remote?.denom || '-'} (${ratePrice})
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            setIsCollapse(!isCollapse);
          }}>
          {/* <Icon
            style={{ fontSize: '14px', transform: isCollapse ? 'rotate(180deg)' : 'rotate(0deg)', transition: '.4s' }}
            type="side-down"
          /> */}
        </div>
      </div>
      <div
        style={{
          height: isCollapse ? '0px' : 'max-content',
          overflow: 'hidden',
          transition: '.4s'
        }}>
        {itemData?.map((item) => {
          return RenderItem({
            text: item.text,
            value: item.value
          });
        })}
      </div>
    </>
  );
}

export default SwapDetail;
