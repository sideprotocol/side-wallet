import { Fragment } from 'react';

import { BalanceItem } from '@/shared/types';
import { Column, Row, Text } from '@/ui/components';
import ImageIcon from '@/ui/components/ImageIcon';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';

function TokenItem({ token, balanceVisible }: { token: BalanceItem; balanceVisible: boolean }) {
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
        <ImageIcon
          url={token.asset.logo}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%'
          }}
        />
        <Column
          style={{
            gap: '0px'
          }}>
          <Text classname={'symbol'} preset="regular" text={token?.asset?.symbol}></Text>
          <Text preset="sub" text={token?.asset?.name}></Text>
        </Column>
      </Row>

      <Column
        style={{
          gap: '0px'
        }}>
        {/*<Text preset="regular" text={balanceVisible ? formatUnitAmount(balanceAmount, token.exponent) : '**'}*/}
        <Text preset="regular" text={balanceVisible ? token?.formatAmount : '**'} textEnd />
        {/*<Text preset="sub" text={`${'$' + getTruncate(totalPrice)}`} textEnd />*/}
        {/*<Text preset="sub" text={`${balanceVisible ? '$' + getTruncate(totalPrice) : '**'}`} textEnd/>*/}
        <Text preset="sub" text={`${balanceVisible ? '$' + token?.totalValue : '**'}`} textEnd />
      </Column>
    </Row>
  );
}

export default function SideTokenList({ balanceVisible }) {
  const currentAccount = useCurrentAccount();

  const { balanceList } = useGetSideBalanceList(currentAccount?.address);

  return (
    <Column>
      {balanceList.map((item) => {
        if (!+item.amount && item.denom !== 'uside') {
          return null;
        }
        return (
          <Fragment key={item?.asset?.symbol + item?.asset?.name}>
            <TokenItem token={item} balanceVisible={balanceVisible} />
          </Fragment>
        );
      })}
    </Column>
  );
}
