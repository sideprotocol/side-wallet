import BigNumber from 'bignumber.js';
import { Fragment, useMemo, useState } from 'react';

import { Column, Content, Header, Icon, Image, Layout, Row, Text } from '@/ui/components';
import useGetPoolExchangeRate from '@/ui/hooks/useGetPoolExchangeRate';
import useGetPoolsData, { PoolDataItem } from '@/ui/hooks/useGetPoolsData';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { colors } from '@/ui/theme/colors';
import { getTruncate } from '@/ui/utils';
import { Box } from '@mui/material';

import { useNavigate } from '../MainRoute';

export default function MyEarnsScreen() {
  const currentAccount = useCurrentAccount();
  const { data: allPoolsData } = useGetPoolsData();
  const { balanceList: sideBalanceList } = useGetSideBalanceList(currentAccount?.address);

  const data = useMemo(() => {
    return allPoolsData.filter((item) => {
      const token = sideBalanceList.find((o) => o.denom === item.baseData.total_stokens.denom);
      return token?.amount && +token.amount > 0;
    });
  }, [currentAccount.address, allPoolsData, sideBalanceList]);

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="My Earns"
      />
      <Content
        style={{
          padding: '0 16px',
          marginTop: 16
        }}>
        {data?.length > 0 ? (
          <>
            {data.map((item) => {
              return (
                <Fragment key={item.baseData.id}>
                  <PoolItemFC item={item} />
                </Fragment>
              );
            })}
            <Text
              style={{
                fontSize: '12px',
                color: colors.grey12,
                textAlign: 'center',
                marginTop: '4px'
              }}>
              No more data
            </Text>
          </>
        ) : (
          <Text style={{ fontSize: '12px', color: colors.grey12, textAlign: 'center', marginTop: '100px' }}>
            No data
          </Text>
        )}
      </Content>
    </Layout>
  );
}

function PoolItemFC({ item }: { item: PoolDataItem }) {
  const currentAccount = useCurrentAccount();
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const { balanceList } = useGetSideBalanceList(currentAccount.address);
  const stokenBalance = balanceList.find((o) => o.denom === item.baseData.total_stokens.denom);
  const { data: exchangeRate } = useGetPoolExchangeRate({ poolId: item.baseData.id || '' });
  const { depositedAmount } = useMemo(() => {
    const depositedAmount = new BigNumber(stokenBalance?.formatAmount || '0')
      .multipliedBy(exchangeRate || 1)
      .toFixed(item.token.asset.precision);
    const expectedInterestDay = new BigNumber(item.token.formatAmount)
      .multipliedBy(item.supplyApy)
      .div(100)
      .div(365)
      .toFixed(item.token.asset.precision);
    return {
      depositedAmount,
      expectedInterestDay
    };
  }, [item, exchangeRate]);

  return (
    <Column
      key={item.baseData.id}
      gap={'md'}
      onMouseOver={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      onClick={() => {
        navigate('EarnRedeemScreen', { poolData: item });
      }}>
      <Row full justifyBetween itemsCenter>
        <Row itemsCenter gap="md">
          <Image src={item.token?.asset.logo} height={28} width={28}></Image>
          <Text
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: colors.white
            }}>
            {item.token.asset.symbol}
          </Text>
        </Row>
        <Icon icon="arrow-right" color={isHover ? 'main' : 'white'} size={16} />
      </Row>
      <Row full justifyBetween itemsCenter>
        <Text
          style={{
            fontSize: '12px',
            color: colors.grey12
          }}>
          Deposited Amount
        </Text>
        <Text
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: colors.white
          }}>
          {getTruncate(depositedAmount, item.token.asset.precision)}
        </Text>
      </Row>
      <Row full justifyBetween itemsCenter>
        <Text
          style={{
            fontSize: '12px',
            color: colors.grey12
          }}>
          s{item.token.asset.symbol} Amount
        </Text>
        <Text
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: colors.white
          }}>
          {getTruncate(stokenBalance?.formatAmount || '0', item.token?.asset.precision || 6)}
        </Text>
      </Row>
      {/* <Row full justifyBetween itemsCenter>
        <Text
          style={{
            fontSize: '12px',
            color: colors.grey12
          }}>
          Cumulative Interest
        </Text>
        <Text
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: colors.white
          }}>
          -
        </Text>
      </Row> */}
      <Box
        sx={{
          height: '1px',
          backgroundColor: colors.black_dark
        }}
      />
    </Column>
  );
}
