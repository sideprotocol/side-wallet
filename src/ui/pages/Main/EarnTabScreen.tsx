import { BigNumber } from 'bignumber.js';
import { useMemo, useState } from 'react';
import 'swiper/css';

import { Button, Column, Content, Footer, Icon, Image, Layout, Row, Text } from '@/ui/components';
import { CoinInput } from '@/ui/components/CoinInput';
import { NavTabBar } from '@/ui/components/NavTabBar';
import useGetPoolExchangeRate from '@/ui/hooks/useGetPoolExchangeRate';
import useGetPoolsData from '@/ui/hooks/useGetPoolsData';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import useSupply from '@/ui/hooks/useSupply';
import MainHeader from '@/ui/pages/Main/MainHeader';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { colors } from '@/ui/theme/colors';
import { formatUnitAmount, getTruncate } from '@/ui/utils';
import { toUnitAmount } from '@/ui/utils/formatter';
import { Box, Stack, Typography } from '@mui/material';

import { useNavigate } from '../MainRoute';

export default function EarnTabScreen() {
  const navigator = useNavigate();
  const currentAccount = useCurrentAccount();
  const [supplyAmount, setsupplyAmount] = useState('');

  const { supply, loading } = useSupply();

  const { balanceList } = useGetSideBalanceList(currentAccount?.address);

  const usdcBalance = balanceList.find((b) => b.denom == 'uusdc');

  const { data: poolsData } = useGetPoolsData();

  const poolData = poolsData.find((p) => p.token.denom === usdcBalance?.denom);

  const { data: exchangeRate } = useGetPoolExchangeRate({ poolId: poolData?.baseData?.id || '' });

  const { receiveShare, expectedInterestDay } = useMemo(() => {
    if (!poolData) {
      return {
        receiveShare: '0',
        expectedInterestDay: '0'
      };
    }

    const receiveShare = new BigNumber(poolData.baseData.total_stokens.amount)
      .div(formatUnitAmount(poolData.baseData.supply.amount || '0', poolData.token.asset.precision))
      .multipliedBy(supplyAmount || '0')
      .div(exchangeRate || 1)
      .toFixed(poolData.token.asset.precision);
    const expectedInterestDay = new BigNumber(supplyAmount || '0')
      .multipliedBy(poolData.supplyApy)
      .div(100)
      .div(365)
      .toFixed(poolData.token.asset.precision);
    return {
      receiveShare,
      expectedInterestDay
    };
  }, [poolData, supplyAmount]);

  return (
    <Layout>
      <MainHeader title={''} />
      <Content gap="lg" mt="lg">
        <Box p={1.5} bgcolor={'#222222'} color={colors.white_muted} borderRadius={'10px'}>
          <Row itemsCenter>
            <Icon icon="alert-circle" color={'search_icon'} size={24}></Icon>

            <Text
              text="Note:"
              color="search_icon"
              size="sm"
              style={{
                fontWeight: 600
              }}></Text>
          </Row>

          <Row mt="lg">
            <Text
              color="search_icon"
              size="xs"
              text="This feature allows you to earn interest by providing liquidity to the lending pool. Please use the web app to withdraw your assets from the pool."></Text>
          </Row>
        </Box>

        <Row
          bg="card_bgColor"
          style={{
            height: 70
          }}
          itemsCenter
          rounded
          px="lg"
          py="md">
          <Row
            style={{
              flexShrink: 0,
              minWidth: 110
            }}
            rounded={true}
            px="lg"
            py="md"
            bg="black">
            <Image src={usdcBalance?.asset.logo} height={24} width={24}></Image>

            <Text text={usdcBalance?.asset.symbol || 'USDC'} color="white" size="md"></Text>
          </Row>

          <CoinInput
            size={20}
            coin={{
              amount: supplyAmount,
              denom: usdcBalance?.denom || 'uusdc'
            }}
            onChange={(value) => {
              setsupplyAmount(value);
            }}></CoinInput>

          <Column
            style={{
              alignItems: 'end'
            }}>
            <Row itemsCenter>
              <div
                className={
                  'px-2  h-max rounded cursor-pointer text-[10px] bg-[#FFFFFF1A] text-[#b8bfbd] hover:text-[#F7771A]'
                }
                onClick={() => {
                  const amount = new BigNumber(usdcBalance?.formatAmount || '0')
                    .multipliedBy(0.5)
                    .toFixed(usdcBalance?.asset.precision || 6, BigNumber.ROUND_DOWN);
                  setsupplyAmount(amount);
                }}>
                Half
              </div>

              <div
                className={
                  'px-2  h-max rounded cursor-pointer text-[10px] bg-[#FFFFFF1A] text-[#b8bfbd] hover:text-[#F7771A]'
                }
                onClick={() => {
                  setsupplyAmount(usdcBalance?.formatAmount || '0');
                }}>
                Max
              </div>
            </Row>

            <Text
              style={{
                verticalAlign: 'middle',
                whiteSpace: 'nowrap'
              }}
              text={`Available ${BigNumber(usdcBalance?.formatAmount || '0').toFormat()}`}
              size="xs"
              color="white_muted"></Text>
          </Column>
        </Row>

        <Column
          bg="card_bgColor"
          style={{
            borderRadius: '10px'
          }}
          px="lg"
          py="lg">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography
              sx={{
                fontSize: '14px',
                color: colors.grey12
              }}>
              Net APR
            </Typography>
            <Typography
              sx={{
                fontSize: '14px',
                color: colors.white
              }}>
              {poolData?.supplyApy}%
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography
              sx={{
                fontSize: '14px',
                color: colors.grey12
              }}>
              You will receive
            </Typography>
            <Typography
              sx={{
                fontSize: '14px',
                color: colors.white
              }}>
              {getTruncate(formatUnitAmount(receiveShare, 6), 6)}&nbsp;
              <small style={{ fontSize: '100%', color: colors.grey12, fontWeight: 500 }}>
                s{poolData?.token.asset.symbol}
              </small>
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography
              sx={{
                fontSize: '14px',
                color: colors.grey12
              }}>
              Expected Interests / day
            </Typography>
            <Typography
              sx={{
                fontSize: '14px',
                color: colors.white
              }}>
              {new BigNumber(expectedInterestDay).toFixed(poolData?.token?.asset.precision || 6)}&nbsp;
              <small style={{ fontSize: '100%', color: colors.grey12, fontWeight: 500 }}>
                {poolData?.token.asset.symbol}
              </small>
            </Typography>
          </Stack>
        </Column>

        <Row mt="lg" mb="lg">
          <Button
            onClick={() => {
              if (!poolData) return;

              supply({
                amount: {
                  denom: poolData.token.denom,
                  amount: toUnitAmount(supplyAmount, poolData.token.asset.exponent)
                },
                pool_id: poolData.baseData.id
              });
            }}
            disabled={loading || +supplyAmount <= 0}
            preset="primary"
            text="Confirm"
            full></Button>
        </Row>
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="earn" />
      </Footer>
    </Layout>
  );
}
