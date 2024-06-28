import BigNumber from 'bignumber.js';
import { Fragment, useEffect, useState } from 'react';

import { SideToken } from '@/shared/types';
import { Column, Image, Row, Text } from '@/ui/components';
import { useGetSideTokenBalance } from '@/ui/hooks/useGetBalance';
import { useGetSideTokenList } from '@/ui/hooks/useGetTokenList';
import { formatUnitAmount, formatWithDP, getTruncate, useWallet } from '@/ui/utils';

function TokenItem({ token }: { token: SideToken }) {
  const { balanceAmount } = useGetSideTokenBalance(token.base);
  const wallet = useWallet();
  const [totalPrice, setTotalPrice] = useState('0');

  useEffect(() => {
    calcPrice();
  }, [balanceAmount]);

  const calcPrice = async () => {
    const priceMap = await wallet.getCoingeckoPriceMap();
    const _totalPrice = new BigNumber(formatUnitAmount(balanceAmount, token.exponent))
      .multipliedBy(priceMap[token.coingecko_id].usd)
      .toString();
    setTotalPrice(formatWithDP(_totalPrice, 2));
  };
  return (
    <Row
      full
      justifyBetween
      style={{
        cursor: 'pointer',
        backgroundColor: '#1D1D1F',
        padding: '10px 20px',
        borderRadius: 10
      }}>
      <Row>
        <Image src={token.logo} size={42}></Image>
        <Column
          style={{
            gap: '0px'
          }}>
          <Text preset="regular" text={token.symbol}></Text>
          <Text preset="sub" text={token.name}></Text>
        </Column>
      </Row>

      <Column
        style={{
          gap: '0px'
        }}>
        <Text preset="regular" text={formatUnitAmount(balanceAmount, token.exponent)} textEnd />
        <Text preset="sub" text={`$${getTruncate(totalPrice, 2)}`} textEnd />
      </Column>
    </Row>
  );
}

export default function SideTokenList() {
  const { data: assets } = useGetSideTokenList();
  return (
    <Column>
      {assets.map((item) => {
        return (
          <Fragment key={item.symbol + item.name}>
            <TokenItem token={item} />
          </Fragment>
        );
      })}
    </Column>
  );
}
