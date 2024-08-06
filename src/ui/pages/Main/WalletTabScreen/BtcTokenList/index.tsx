import { Fragment } from 'react';

import { BitcoinToken } from '@/shared/types';
import { Column, Image, Row, Text } from '@/ui/components';
import { useCalcPrice } from '@/ui/hooks/useCalcPrice';
import { useAccountBalance } from '@/ui/state/accounts/hooks';
import { getTruncate } from '@/ui/utils';

function TokenItem({
  token,
  balanceVisible,
  price,
  amount,
  balance
}: { token: BitcoinToken; balanceVisible: boolean } & {
  price: string;
  amount: string;
  balance: string | number;
}) {
  const accountBalance = useAccountBalance();
  const { data: totalPrice } = useCalcPrice(accountBalance.btc_amount, token.coingecko_id);
  console.log('token: ', token);

  console.log({
    token,
    price,
    amount
  });

  return (
    <Row
      classname={'bg-item-hover-v2'}
      justifyBetween
      style={{
        cursor: 'pointer',
        backgroundColor: '#1D1D1F',
        padding: '10px 16px',
        borderRadius: 10
      }}>
      <Row>
        <Image src={token.logo} size={38}></Image>
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
        <Text preset="regular" text={balanceVisible ? balance : '**'} textEnd />
        <Text preset="sub" text={balanceVisible ? `$${getTruncate(price)}` : '**'} textEnd />
      </Column>
    </Row>
  );
}

export default function BtcTokenList({ balanceVisible, runeAndBtcTokens }) {
  return (
    <Column
      style={{
        minHeight: '132px'
      }}>
      {runeAndBtcTokens.map((item) => {
        return (
          <Fragment key={item.symbol + item.name}>
            <TokenItem token={item} {...item} balanceVisible={balanceVisible} />
          </Fragment>
        );
      })}
    </Column>
  );
}
