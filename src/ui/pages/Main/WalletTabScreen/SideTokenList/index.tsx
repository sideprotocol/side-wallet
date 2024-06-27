import { Fragment } from 'react';

import { SideToken } from '@/shared/types';
import { Column, Image, Row, Text } from '@/ui/components';
import useGetSideTokenBalance from '@/ui/hooks/useGetSideTokenBalance';
import { formatUnitAmount } from '@/ui/utils';

import useGetSideTokenList from './hooks/useGetSideTokenList';

function TokenItem({ token }: { token: SideToken }) {
  const { balanceAmount } = useGetSideTokenBalance(token.base);
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
        <Text preset="sub" text={0} textEnd />
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
