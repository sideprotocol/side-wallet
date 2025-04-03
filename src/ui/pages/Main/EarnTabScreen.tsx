import { BigNumber } from 'bignumber.js';
import { useMemo, useState } from 'react';
import 'swiper/css';

import { Button, Column, Content, Footer, Image, Layout, Row, Text } from '@/ui/components';
import { CoinInput } from '@/ui/components/CoinInput';
import { NavTabBar } from '@/ui/components/NavTabBar';
import useGetPoolExchangeRate from '@/ui/hooks/useGetPoolExchangeRate';
import useGetPoolsData from '@/ui/hooks/useGetPoolsData';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import useSupply from '@/ui/hooks/useSupply';
import useWithdraw from '@/ui/hooks/useWithdraw';
import MainHeader from '@/ui/pages/Main/MainHeader';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { colors } from '@/ui/theme/colors';
import { formatUnitAmount, getTruncate } from '@/ui/utils';
import { toUnitAmount } from '@/ui/utils/formatter';
import { Stack, Typography } from '@mui/material';

export default function EarnTabScreen() {
  const currentAccount = useCurrentAccount();
  const [supplyAmount, setsupplyAmount] = useState('');

  const [withdrawAmount, setwithdrawAmount] = useState('');

  const [operationTab, setOperationTab] = useState<'supply' | 'withdraw'>('supply');

  const { supply, loading } = useSupply();

  const { withdraw, loading: withdrawLoading } = useWithdraw();

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

  const stokenBalance = balanceList.find((b) => b.denom == poolData?.baseData.id);

  const onSupply = () => {
    if (!poolData) return;

    supply({
      amount: {
        denom: poolData.token.denom,
        amount: toUnitAmount(supplyAmount, poolData.token.asset.exponent)
      },
      pool_id: poolData.baseData.id
    });
  };

  const onWithdraw = () => {
    if (!poolData) return;

    withdraw({
      shares: {
        denom: poolData.baseData.id,
        amount: toUnitAmount(withdrawAmount, poolData.token.asset.exponent)
      }
    });
  };

  const isDisabled = useMemo(() => {
    if (operationTab === 'supply') {
      return loading || +supplyAmount <= 0;
    }
    return withdrawLoading || +withdrawAmount <= 0;
  }, [operationTab, loading, withdrawLoading, supplyAmount, withdrawAmount]);

  return (
    <Layout>
      <MainHeader title={''} />
      <Content mt="lg" classname="fadeIn-page">
        <Column
          bg="card_bgColor"
          gap="lg"
          px="lg"
          py="md"
          style={{
            borderRadius: '10px'
          }}>
          <Row>
            <Stack gap={'6px'} flexDirection={'row'} p={0.5} borderRadius={'10px'} bgcolor="black">
              <div
                className={`text-white cursor-pointer rounded-lg py-1.5 px-2 text-xs ${
                  operationTab === 'supply' ? 'bg-[#F7771A]' : ''
                }`}
                onClick={() => setOperationTab('supply')}>
                Supply
              </div>

              <div
                className={`text-white cursor-pointer rounded-lg py-1.5 px-2 text-xs ${
                  operationTab === 'withdraw' ? 'bg-[#F7771A]' : ''
                }`}
                onClick={() => setOperationTab('withdraw')}>
                Withdraw
              </div>
            </Stack>
          </Row>
          <Row
            bg="black"
            style={{
              height: 70
            }}
            itemsCenter
            rounded
            px="md"
            py="md">
            <Row
              style={{
                flexShrink: 0
              }}
              rounded={true}
              px="md"
              py="md"
              itemsCenter
              bg="card_bgColor">
              <Image src={usdcBalance?.asset.logo} height={28} width={28}></Image>

              <Text text={usdcBalance?.asset.symbol || 'USDC'} color="white" size="md"></Text>
            </Row>

            <Column>
              <Row itemsCenter justifyBetween>
                <CoinInput
                  size={20}
                  coin={{
                    amount: operationTab === 'supply' ? supplyAmount : withdrawAmount,
                    denom: usdcBalance?.denom || 'uusdc'
                  }}
                  onChange={(value) => {
                    if (operationTab === 'supply') {
                      setsupplyAmount(value);
                    } else {
                      setwithdrawAmount(value);
                    }
                  }}></CoinInput>

                <Row itemsCenter>
                  <div
                    className={
                      'px-2  h-max rounded cursor-pointer text-[10px] bg-[#FFFFFF1A] text-[#b8bfbd] hover:text-[#F7771A]'
                    }
                    onClick={() => {
                      const amount = new BigNumber(
                        operationTab === 'supply'
                          ? usdcBalance?.formatAmount || '0'
                          : stokenBalance?.formatAmount || '0'
                      )
                        .multipliedBy(0.5)
                        .toFixed(usdcBalance?.asset.precision || 6, BigNumber.ROUND_DOWN);
                      if (operationTab === 'supply') {
                        setsupplyAmount(amount);
                      } else {
                        setwithdrawAmount(amount);
                      }
                    }}>
                    Half
                  </div>

                  <div
                    className={
                      'px-2  h-max rounded cursor-pointer text-[10px] bg-[#FFFFFF1A] text-[#b8bfbd] hover:text-[#F7771A]'
                    }
                    onClick={() => {
                      const amount =
                        operationTab === 'supply'
                          ? usdcBalance?.formatAmount || '0'
                          : stokenBalance?.formatAmount || '0';
                      if (operationTab === 'supply') {
                        setsupplyAmount(amount);
                      } else {
                        setwithdrawAmount(amount);
                      }
                    }}>
                    Max
                  </div>
                </Row>
              </Row>

              <Row itemsCenter justifyBetween>
                <Text
                  style={{
                    verticalAlign: 'middle',
                    whiteSpace: 'nowrap'
                  }}
                  text={`$${BigNumber(operationTab === 'supply' ? supplyAmount || '0' : withdrawAmount || '0')
                    .times(
                      operationTab === 'supply' ? usdcBalance?.denomPrice || '0' : stokenBalance?.denomPrice || '0'
                    )
                    .toFormat()}`}
                  size="xxs"
                  color="white_muted"></Text>
                <Text
                  style={{
                    verticalAlign: 'middle',
                    whiteSpace: 'nowrap'
                  }}
                  text={`Available ${BigNumber(
                    operationTab === 'supply' ? usdcBalance?.formatAmount || '0' : stokenBalance?.formatAmount || '0'
                  ).toFormat()}`}
                  size="xxs"
                  color="white_muted"></Text>
              </Row>
            </Column>
          </Row>

          {operationTab === 'supply' && (
            <Column
              bg="black"
              style={{
                borderRadius: '10px'
              }}
              px="lg"
              py="lg">
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography
                  sx={{
                    fontSize: '12px',
                    color: colors.grey12
                  }}>
                  Net APR
                </Typography>
                <Typography
                  sx={{
                    fontSize: '12px',
                    color: colors.white
                  }}>
                  {poolData?.supplyApy}%
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography
                  sx={{
                    fontSize: '12px',
                    color: colors.grey12
                  }}>
                  You will receive
                </Typography>
                <Typography
                  sx={{
                    fontSize: '12px',
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
                    fontSize: '12px',
                    color: colors.grey12
                  }}>
                  Expected Interests / day
                </Typography>
                <Typography
                  sx={{
                    fontSize: '12px',
                    color: colors.white
                  }}>
                  {new BigNumber(expectedInterestDay).toFixed(poolData?.token?.asset.precision || 6)}&nbsp;
                  <small style={{ fontSize: '100%', color: colors.grey12, fontWeight: 500 }}>
                    {poolData?.token.asset.symbol}
                  </small>
                </Typography>
              </Stack>
            </Column>
          )}

          {operationTab === 'withdraw' && (
            <Column
              bg="black"
              style={{
                borderRadius: '10px'
              }}
              px="lg"
              py="lg">
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography
                  sx={{
                    fontSize: '12px',
                    color: colors.grey12
                  }}>
                  {usdcBalance?.asset.symbol} / {stokenBalance?.asset.symbol}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '12px',
                    color: colors.white
                  }}>
                  {+exchangeRate}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography
                  sx={{
                    fontSize: '12px',
                    color: colors.grey12
                  }}>
                  You will burn
                </Typography>
                <Typography
                  sx={{
                    fontSize: '12px',
                    color: colors.white
                  }}>
                  {new BigNumber(withdrawAmount || '0').div(exchangeRate).toFixed(6)}&nbsp;
                  <small style={{ fontSize: '100%', color: colors.grey12, fontWeight: 500 }}>
                    {stokenBalance?.asset.symbol}
                  </small>
                </Typography>
              </Stack>
            </Column>
          )}

          <Row mt="md" mb="lg">
            <Button
              onClick={() => {
                if (operationTab === 'supply') {
                  onSupply();
                } else {
                  onWithdraw();
                }
              }}
              loading={loading || withdrawLoading}
              disabled={isDisabled}
              preset="primary"
              text="Confirm"
              full></Button>
          </Row>
        </Column>
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="earn" />
      </Footer>
    </Layout>
  );
}
