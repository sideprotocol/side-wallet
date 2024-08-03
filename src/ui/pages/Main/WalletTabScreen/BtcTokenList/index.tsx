import { Fragment } from 'react';

import { BitcoinToken } from '@/shared/types';
import { Column, Image, Row, Text } from '@/ui/components';
import { useCalcPrice } from '@/ui/hooks/useCalcPrice';
import { useGetBitcoinTokenList } from '@/ui/hooks/useGetTokenList';
import { useAccountBalance } from '@/ui/state/accounts/hooks';
import { getTruncate } from '@/ui/utils';

function TokenItem({ token, balanceVisible }: { token: BitcoinToken; balanceVisible: boolean }) {
  const accountBalance = useAccountBalance();
  const { data: totalPrice } = useCalcPrice(accountBalance.btc_amount, token.coingecko_id);

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
        <Text preset="regular" text={balanceVisible ? accountBalance.btc_amount : '**'} textEnd />
        {/*<Text preset="sub" text={`$${getTruncate(totalPrice)}`} textEnd />*/}
        <Text preset="sub" text={balanceVisible ? `$${getTruncate(totalPrice)}` : '**'} textEnd />
      </Column>
    </Row>
  );
}

export default function BtcTokenList({balanceVisible}) {
  const { data: bitcoinAssets } = useGetBitcoinTokenList();
  return (
    <Column
      style={{
        minHeight: '132px'
      }}>
      {bitcoinAssets.map((item) => {
        return (
          <Fragment key={item.symbol + item.name}>
            <TokenItem token={item} balanceVisible={balanceVisible} />
          </Fragment>
        );
      })}
    </Column>
  );
}
