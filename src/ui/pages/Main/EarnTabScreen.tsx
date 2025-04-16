import { BigNumber } from 'bignumber.js';
import { useMemo, useRef, useState } from 'react';
import 'swiper/css';

import { Button, Column, Content, Footer, Icon, Image, Layout, Row, Text } from '@/ui/components';
import { CoinInput } from '@/ui/components/CoinInput';
import { NavTabBar } from '@/ui/components/NavTabBar';
import useGetPoolExchangeRate from '@/ui/hooks/useGetPoolExchangeRate';
import useGetPoolsData from '@/ui/hooks/useGetPoolsData';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import useSupply from '@/ui/hooks/useSupply';
import useWithdraw from '@/ui/hooks/useWithdraw';
import MainHeader from '@/ui/pages/Main/MainHeader';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useLendingState } from '@/ui/state/lending/hook';
import { colors } from '@/ui/theme/colors';
import { formatUnitAmount, getTruncate } from '@/ui/utils';
import { toUnitAmount } from '@/ui/utils/formatter';
import { Stack, Typography } from '@mui/material';

import { useNavigate } from '../MainRoute';

export default function EarnTabScreen() {
  const currentAccount = useCurrentAccount();
  const [supplyAmount, setsupplyAmount] = useState('');

  const [withdrawAmount, setwithdrawAmount] = useState('');

  const { poolTokenDenom } = useLendingState();

  const [operationTab, setOperationTab] = useState<'supply' | 'withdraw'>('supply');

  const { supply, loading } = useSupply();

  const { withdraw, loading: withdrawLoading } = useWithdraw();

  const { balanceList } = useGetSideBalanceList(currentAccount?.address);

  const poolTokenBalance = balanceList.find((b) => b.denom == poolTokenDenom);

  const { data: poolsData } = useGetPoolsData();

  const navigator = useNavigate();

  const poolData = poolsData.find((p) => p.token.denom === poolTokenBalance?.denom);

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

  const maxWithdrawAmount = useMemo(() => {
    if (!poolData) return '0';

    const poolMaxCanWithdraw = new BigNumber(poolData?.totalSupply)
      .minus(poolData?.totalBorrow)
      .toFixed(6, BigNumber.ROUND_DOWN);
    return poolMaxCanWithdraw;
  }, [poolData]);

  const withdrawExceed = BigNumber(withdrawAmount || '0').gt(maxWithdrawAmount);

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

  const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeIndex = useMemo(() => {
    return operationTab === 'supply' ? 0 : 1;
  }, [operationTab]);

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
            <Stack
              gap={'6px'}
              flexDirection={'row'}
              p={0.5}
              borderRadius={'10px'}
              bgcolor="black"
              style={{
                position: 'relative'
              }}>
              <div
                style={{
                  position: 'absolute',
                  height: '28px',
                  backgroundColor: '#F7771A',
                  borderRadius: '10px',
                  transition: 'all 0.3s ease',
                  left: buttonRefs.current[activeIndex]?.offsetLeft ?? 0,
                  width: buttonRefs.current[activeIndex]?.offsetWidth ?? 0
                }}
              />

              <div
                className={'text-white relative z-10 cursor-pointer  py-1.5 px-2 text-xs '}
                ref={(el) => (buttonRefs.current[0] = el)}
                onClick={() => setOperationTab('supply')}>
                Supply
              </div>

              <div
                className={'text-white relative z-10 cursor-pointer  py-1.5 px-2 text-xs '}
                ref={(el) => (buttonRefs.current[1] = el)}
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
              classname="bg-[#17171C]  hover:bg-opacity-80"
              onClick={() => {
                navigator('LendingSelectTokenScreen', {
                  poolsData,
                  type: operationTab === 'supply' ? 'token' : 'stoken'
                });
              }}>
              <Image
                src={operationTab === 'supply' ? poolTokenBalance?.asset.logo : stokenBalance?.asset.logo}
                height={28}
                width={28}></Image>

              <Text
                text={
                  operationTab === 'supply'
                    ? poolTokenBalance?.asset.symbol || 'USDC'
                    : stokenBalance?.asset.symbol || 'sUSDC'
                }
                color="white"
                size="md"></Text>

              <Icon icon="down" size={10}></Icon>
            </Row>

            <Column
              fullY
              style={{
                paddingTop: '10px'
              }}
              justifyBetween>
              <Row
                itemsCenter
                justifyBetween
                style={{
                  height: '10px',
                  borderRadius: '100px',
                  padding: '8px 0px',
                  position: 'relative'
                }}>
                <CoinInput
                  size={22}
                  coin={{
                    amount: operationTab === 'supply' ? supplyAmount : withdrawAmount,
                    denom: poolTokenBalance?.denom || 'uusdc'
                  }}
                  decimalScale={poolTokenBalance?.asset.precision || 6}
                  onChange={(value) => {
                    if (operationTab === 'supply') {
                      setsupplyAmount(value);
                    } else {
                      setwithdrawAmount(value);
                    }
                  }}
                />
                <div
                  style={{
                    flexShrink: 0
                  }}
                  className="flex items-center gap-1 ">
                  <div
                    className={
                      'px-2  h-max rounded cursor-pointer text-[10px] bg-[#FFFFFF1A] text-[#b8bfbd] hover:text-[#F7771A]'
                    }
                    onClick={() => {
                      const amount = new BigNumber(
                        operationTab === 'supply'
                          ? poolTokenBalance?.formatAmount || '0'
                          : stokenBalance?.formatAmount || '0'
                      )
                        .multipliedBy(0.5)
                        .toFixed(poolTokenBalance?.asset.precision || 6, BigNumber.ROUND_DOWN);
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
                          ? poolTokenBalance?.formatAmount || '0'
                          : stokenBalance?.formatAmount || '0';
                      if (operationTab === 'supply') {
                        setsupplyAmount(amount);
                      } else {
                        setwithdrawAmount(amount);
                      }
                    }}>
                    Max
                  </div>
                </div>
              </Row>

              <Row itemsCenter justifyBetween>
                <Text
                  style={{
                    verticalAlign: 'middle',
                    whiteSpace: 'nowrap',
                    maxWidth: '90px',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden'
                  }}
                  text={`$${BigNumber(operationTab === 'supply' ? supplyAmount || '0' : withdrawAmount || '0')
                    .times(BigNumber(poolTokenBalance?.denomPrice || '0').div(exchangeRate || 1))
                    .toFormat(2)}`}
                  size="xxs"
                  color="white_muted"></Text>

                <Row
                  style={{
                    flexShrink: 0
                  }}
                  itemsCenter
                  gap="xs">
                  <Icon color="white_muted" icon="wallet-icon" size={12}></Icon>
                  <Text
                    style={{
                      verticalAlign: 'middle',
                      whiteSpace: 'nowrap'
                    }}
                    text={`${BigNumber(
                      operationTab === 'supply'
                        ? poolTokenBalance?.formatAmount || '0'
                        : stokenBalance?.formatAmount || '0'
                    ).toFormat()}`}
                    size="xxs"
                    color="white_muted"></Text>
                </Row>
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
                  {poolTokenBalance?.asset.symbol} / {stokenBalance?.asset.symbol}
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
                  You will receive
                </Typography>
                <Typography
                  sx={{
                    fontSize: '12px',
                    color: colors.white
                  }}>
                  {new BigNumber(withdrawAmount || '0').times(exchangeRate).toFixed(6)}&nbsp;
                  <small style={{ fontSize: '100%', color: colors.grey12, fontWeight: 500 }}>
                    {poolTokenBalance?.asset.symbol}
                  </small>
                </Typography>
              </Stack>
            </Column>
          )}

          {operationTab === 'withdraw' && withdrawExceed && (
            <Text
              color="red"
              size="xs"
              text={`Max redeemable: ${maxWithdrawAmount} ${stokenBalance?.asset.symbol}`}></Text>
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
