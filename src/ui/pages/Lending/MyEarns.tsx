import BigNumber from 'bignumber.js';
import { Fragment, useMemo, useState } from 'react';

import { Content, Header, Icon, Image, Layout, Row, Text } from '@/ui/components';
import { PoolDataItem, useGetPoolExchangeRate, useGetPoolsData } from '@/ui/hooks/lending';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { colors } from '@/ui/theme/colors';
import { getTruncate } from '@/ui/utils';
import { Box, Stack } from '@mui/material';

import { useNavigate } from '../MainRoute';

export default function MyEarnsScreen() {
  const currentAccount = useCurrentAccount();
  const { data: allPoolsData } = useGetPoolsData();
  const { balanceList: sideBalanceList } = useGetSideBalanceList(currentAccount?.address);

  const data = useMemo(() => {
    return allPoolsData.filter((item) => {
      const token = sideBalanceList.find((o) => o.denom === item.baseData.total_ytokens.denom);
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
          marginTop: 16,
          padding: '0 16px'
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
  const stokenBalance = balanceList.find((o) => o.denom === item.baseData.total_ytokens.denom);
  const { data: exchangeRate } = useGetPoolExchangeRate({ poolId: item.baseData.id || '' });
  const { depositedAmount } = useMemo(() => {
    const depositedAmount = new BigNumber(stokenBalance?.formatAmount || '0')
      .div(exchangeRate || 1)
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
    <Stack
      key={item.baseData.id}
      gap="8px"
      onMouseOver={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      onClick={() => {
        navigate('EarnRedeemScreen', { poolData: item });
      }}
      sx={{
        padding: '16px 16px 0',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: '.4s',
        ':hover': {
          bgcolor: colors.black_dark
        }
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
          Total Claimable
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
          y{item.token.asset.symbol} Holding
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
      <Box
        sx={{
          height: '1px',
          backgroundColor: colors.black_dark
        }}
      />
    </Stack>
  );
}
