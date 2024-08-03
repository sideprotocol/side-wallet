import { Fragment } from 'react';

import { SideToken } from '@/shared/types';
import { Column, Image, Row, Text } from '@/ui/components';
import { useCalcPrice } from '@/ui/hooks/useCalcPrice';
import { useGetSideTokenBalance } from '@/ui/hooks/useGetBalance';
import { useGetSideTokenList } from '@/ui/hooks/useGetTokenList';
import { formatUnitAmount, getTruncate } from '@/ui/utils';
import ImageIcon from '@/ui/components/ImageIcon';

function TokenItem({ token, balanceVisible }: { token: SideToken; balanceVisible: boolean }) {
  const { balanceAmount } = useGetSideTokenBalance(token.base);
  const { data: totalPrice } = useCalcPrice(balanceAmount, token.coingecko_id, token.exponent);

  return (
    <Row
      classname={'bg-item-hover-v2'}
      justifyBetween
      style={{
        cursor: 'pointer',
        backgroundColor: '#1A1A1A',
        padding: '10px 16px',
        borderRadius: 10
      }}>
      <Row>
        <ImageIcon url={token.logo} style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
        }} />
        <Column
          style={{
            gap: '0px'
          }}>
          <Text classname={'symbol'} preset="regular" text={token.symbol}></Text>
          <Text preset="sub" text={token.name}></Text>
        </Column>
      </Row>

      <Column
        style={{
          gap: '0px'
        }}>
        <Text preset="regular" text={balanceVisible ? formatUnitAmount(balanceAmount, token.exponent) : '**'} textEnd />
        {/*<Text preset="sub" text={`${'$' + getTruncate(totalPrice)}`} textEnd />*/}
        <Text preset="sub" text={`${balanceVisible ? '$' + getTruncate(totalPrice) : '**'}`} textEnd />
      </Column>
    </Row>
  );
}

export default function SideTokenList({balanceVisible}) {
  const { data: assets } = useGetSideTokenList();
  return (
    <Column>
      {assets.map((item) => {
        return (
          <Fragment key={item.symbol + item.name}>
            <TokenItem token={item} balanceVisible={balanceVisible} />
          </Fragment>
        );
      })}
    </Column>
  );
}
