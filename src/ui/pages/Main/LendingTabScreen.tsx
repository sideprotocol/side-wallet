import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { Fragment, useMemo, useState } from 'react';
import 'swiper/css';

import { Button, Column, Content, Footer, Icon, Image, Layout, Row, Text } from '@/ui/components';
import { CoinInput } from '@/ui/components/CoinInput';
import { NavTabBar } from '@/ui/components/NavTabBar';
import useCreateLoan from '@/ui/hooks/useCreateLoan';
import useGetBitcoinBalanceList from '@/ui/hooks/useGetBitcoinBalanceList';
import useGetDlcEventById from '@/ui/hooks/useGetDlcEventById';
import useGetLiquidationEvent from '@/ui/hooks/useGetLiquidationEvent';
import useGetPoolsData from '@/ui/hooks/useGetPoolsData';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { colors } from '@/ui/theme/colors';
import { getTruncate } from '@/ui/utils';
import { toReadableAmount, toUnitAmount } from '@/ui/utils/formatter';
import { Box, Stack, Typography } from '@mui/material';

import MainHeader from './MainHeader';

export default function LendingTanScreen() {
  const currentAccount = useCurrentAccount();

  const [collateralAmount, setcollateralAmount] = useState('');

  const [borrowAmount, setBorrowAmount] = useState('');
  const { balanceList } = useGetSideBalanceList(currentAccount?.address);

  const { balanceList: bitcoinBalanceList } = useGetBitcoinBalanceList(currentAccount?.address);

  const [deadline, setDeadLine] = useState('7');

  const satBalance = bitcoinBalanceList.find((b) => b.denom === 'sat');

  console.log({ satBalance });

  const usdcBalance = balanceList.find((b) => b.denom == 'uusdc');

  const collateralValue = useMemo(() => {
    if (!collateralAmount || !satBalance) return '$0';
    const value = BigNumber(collateralAmount).times(satBalance.denomPrice).toFormat(2);
    return '$' + value;
  }, [collateralAmount, satBalance]);

  const borrowValue = useMemo(() => {
    if (!borrowAmount || !usdcBalance) return '$0';
    const value = BigNumber(borrowAmount).times(usdcBalance.denomPrice).toFormat(2);

    return '$' + value;
  }, [borrowAmount, usdcBalance]);

  const { data: poolsData } = useGetPoolsData();

  const poolData = poolsData.find((p) => p.token.denom === usdcBalance?.denom);

  const { liquidationEvent } = useGetLiquidationEvent({
    bitcoinAmount: collateralAmount,
    borrowToken: poolData?.token,
    borrowTokenAmount: borrowAmount,
    poolId: poolData?.baseData.id || ''
  });

  const { healthFactor } = useMemo(() => {
    if (BigNumber(collateralAmount || 0).eq(0) || BigNumber(borrowAmount || 0).eq(0) || !poolData?.baseData.config) {
      return {
        healthFactor: '-'
      };
    }
    return {
      healthFactor: new BigNumber(collateralAmount)
        .times(satBalance?.denomPrice || 0)
        .times(poolData?.baseData.config.liquidation_threshold || 0)
        .div(100)
        .div(new BigNumber(borrowAmount || 1).times(poolData?.token.denomPrice || 0))
        .toFixed(2)
    };
  }, [borrowAmount, usdcBalance, collateralAmount, satBalance, poolData]);

  const { borrowMaxAmount } = useMemo(() => {
    let borrowMaxAmount = '0';
    try {
      if (!satBalance || !poolData?.token) {
        return {
          borrowMaxAmount: '0'
        };
      }
      borrowMaxAmount = new BigNumber(collateralAmount)
        .multipliedBy(satBalance.denomPrice || '0')
        .multipliedBy(poolData.baseData.config.max_ltv)
        .div(100)
        .div(+poolData.token.denomPrice || '1')
        .toFixed(+poolData.token.asset.precision, BigNumber.ROUND_DOWN);
    } catch (error) {
      return {
        borrowMaxAmount: '0'
      };
    }

    return { borrowMaxAmount };
  }, [collateralAmount, borrowAmount, poolData, satBalance, usdcBalance]);

  const maturityTime = useMemo(() => {
    return new BigNumber(dayjs().unix()).plus(new BigNumber(deadline).multipliedBy(24).multipliedBy(3600)).toString();
  }, [deadline]);

  const data = [
    {
      label: 'Health Factor',
      value: (
        <Stack direction="row" alignItems="center" gap="8px">
          <Typography color={colors.green}>∞</Typography>
          {healthFactor !== '-' && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.5 6H9.5M9.5 6L6 9.5M9.5 6L6 2.5"
                stroke={colors.white}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {healthFactor !== '-' && (
            <Typography
              sx={{
                fontSize: '14px',
                color:
                  healthFactor === '-'
                    ? colors.white
                    : +healthFactor > 2
                    ? colors.green
                    : +healthFactor <= 1.2
                    ? colors.red
                    : +healthFactor > 1.5
                    ? colors.yellow
                    : colors.main
              }}>
              {healthFactor}
            </Typography>
          )}
        </Stack>
      )
    },
    {
      label: 'Current LTV',
      value: (
        <Typography
          sx={{
            fontSize: '14px',
            color:
              healthFactor === '-'
                ? colors.white
                : +healthFactor > 2
                ? colors.green
                : +healthFactor <= 1.2
                ? colors.red
                : +healthFactor > 1.5
                ? colors.yellow
                : colors.main
          }}>
          {`${new BigNumber(borrowAmount || 0)
            .multipliedBy(poolData?.token.denomPrice || 0)
            .div(collateralAmount || 1)
            .div(+(satBalance?.denomPrice || '0') || '1')
            .multipliedBy(100)
            .toFixed(2)}%`}
        </Typography>
      )
    },
    {
      label: 'Max Initial LTV',
      value: (
        <Typography
          sx={{
            fontSize: '14px',
            color: colors.grey12
          }}>
          {!poolData ? '-' : `${poolData?.baseData.config.max_ltv}%`}
        </Typography>
      )
    },
    {
      label: 'Liquidation LTV',
      value: (
        <Typography
          sx={{
            fontSize: '14px',
            color: colors.grey12
          }}>
          {!poolData ? '-' : `${poolData?.baseData.config.liquidation_threshold}%`}
        </Typography>
      )
    },
    {
      label: 'Liquidation Price (BTC/USDC)',
      value: `${getTruncate(liquidationEvent?.price || '0', 2)}`
    },
    {
      label: 'Interest Rate',
      value: `${poolData?.borrowApy}%`
    },
    {
      label: 'Max Interest',
      value: (
        <>
          {new BigNumber(borrowAmount || 0)
            .multipliedBy(poolData?.borrowApy || 0)
            .div(100)
            .div(365)
            .multipliedBy(deadline)
            .toFixed(poolData?.token.asset.precision || 0)}
          <small
            style={{
              fontSize: '100%',
              color: colors.grey12,
              marginLeft: '2px'
            }}>
            {poolData?.token.asset.symbol}
          </small>
        </>
      )
    },
    {
      label: 'Origination fee',
      value: (
        <>
          {toReadableAmount(poolData?.baseData.config.origination_fee || '0', poolData?.token.asset.exponent || '6')}
          <small
            style={{
              fontSize: '100%',
              color: colors.grey12,
              marginLeft: '2px'
            }}>
            {poolData?.token.asset.symbol}
          </small>
        </>
      )
    }
  ];

  const { loading, createLoan } = useCreateLoan();

  const { dlcEvent } = useGetDlcEventById(liquidationEvent?.event_id);

  const isDisabled = useMemo(() => {
    return (
      loading ||
      !+collateralAmount ||
      !+borrowAmount ||
      !liquidationEvent ||
      (healthFactor !== '-' && +healthFactor < 1.2) ||
      +borrowAmount <
        +toReadableAmount(poolData?.baseData.config.origination_fee || '0', poolData?.token.asset.exponent || '6') ||
      dlcEvent?.event.has_triggered
    );
  }, [loading, poolData, collateralAmount, borrowAmount, liquidationEvent, healthFactor, dlcEvent]);

  return (
    <Layout>
      <MainHeader title={''} />
      <Content gap="lg" mt="lg">
        <Column gap="xs">
          <Row full justifyBetween itemsCenter>
            <Text color="white" size="xs">
              Collateral{' '}
            </Text>

            <Row itemsCenter>
              <Icon color="white_muted" icon="wallet-icon" size={16} />
              <Text text={BigNumber(satBalance?.formatAmount || '0').toFormat()} color="white" size="xs"></Text>
            </Row>
          </Row>

          <Row
            bg="black"
            style={{
              height: 70
            }}
            itemsCenter
            rounded
            py="md">
            <Row
              style={{
                flexShrink: 0,
                minWidth: 110
              }}
              rounded={true}
              px="lg"
              py="md"
              bg="card_bgColor">
              <Image src="/images/icons/btc.svg" height={24} width={24}></Image>

              <Text text={satBalance?.asset.symbol || 'BTC'} color="white" size="md"></Text>
            </Row>

            <Box py={'2px'}>
              <CoinInput
                size={20}
                coin={{
                  amount: collateralAmount,
                  denom: 'sat'
                }}
                onChange={(value) => {
                  setcollateralAmount(value);
                }}></CoinInput>
            </Box>

            <Column>
              <Text
                style={{
                  verticalAlign: 'middle'
                }}
                text={collateralValue}
                size="xs"
                color="white_muted"></Text>
            </Column>
          </Row>

          <Row full justifyBetween itemsCenter mt="lg">
            <Text color="white" size="xs">
              I want to borrow
            </Text>

            <Row itemsCenter>
              <Icon icon="wallet-icon" color="white_muted" size={16} />
              <Text text={BigNumber(usdcBalance?.formatAmount || '0').toFormat()} color="white" size="xs"></Text>
            </Row>
          </Row>

          <Row
            bg="black"
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
              py="md"
              bg="card_bgColor">
              <Image src={usdcBalance?.asset.logo} height={24} width={24}></Image>

              <Text text={usdcBalance?.asset.symbol || 'USDC'} color="white" size="md"></Text>
            </Row>

            <Box py={'2px'}>
              <CoinInput
                size={20}
                coin={{
                  amount: borrowAmount,
                  denom: usdcBalance?.denom || 'uusdc'
                }}
                onChange={(value) => {
                  setBorrowAmount(value);
                }}></CoinInput>
            </Box>

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
                    const amount = new BigNumber(borrowMaxAmount || '0')
                      .multipliedBy(0.5)
                      .toFixed(poolData?.token.asset.precision || 6, BigNumber.ROUND_DOWN);
                    setBorrowAmount(amount);
                  }}>
                  Half
                </div>

                <div
                  className={
                    'px-2  h-max rounded cursor-pointer text-[10px] bg-[#FFFFFF1A] text-[#b8bfbd] hover:text-[#F7771A]'
                  }
                  onClick={() => {
                    setBorrowAmount(borrowMaxAmount || '0');
                  }}>
                  Max
                </div>
              </Row>

              <Text
                style={{
                  verticalAlign: 'middle'
                }}
                text={borrowValue}
                size="xs"
                color="white_muted"></Text>
            </Column>
          </Row>

          <Row mt="md">
            <Text color="white" size="xs" text="Duration"></Text>
          </Row>

          <Stack
            sx={{
              mt: '8px',
              width: '100%'
            }}
            direction="row"
            alignItems="center"
            gap="12px">
            {['7 days', '30 days', '90 days', '180 days', '360 days'].map((item, index) => {
              const [value, unit] = item.split(' ');
              return (
                <Box
                  key={index}
                  sx={{
                    fontSize: '10px',
                    borderRadius: '10px',
                    background: value === deadline ? colors.main : colors.card_bgColor,
                    p: '6px',
                    color: value === deadline ? colors.black : colors.white,
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    transition: '.4s',
                    small: {
                      color: value === deadline ? colors.black : colors.grey12
                    },
                    ':hover': {
                      background: colors.main,
                      color: colors.black,
                      small: {
                        color: colors.black
                      }
                    }
                  }}
                  onClick={() => setDeadLine(value)}>
                  {value}&nbsp;
                  <small
                    style={{
                      fontSize: '100%',
                      transition: '.4s'
                    }}>
                    {unit}
                  </small>
                </Box>
              );
            })}
          </Stack>

          <Column
            bg="card_bgColor"
            style={{
              borderRadius: '10px'
            }}
            mt="lg"
            px="lg"
            py="lg">
            {data.map((item, index) => (
              <Fragment key={index}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack
                    direction="row"
                    sx={{
                      fontSize: '12px',
                      color: colors.grey12
                    }}>
                    {item.label}
                  </Stack>
                  <Stack
                    direction="row"
                    sx={{
                      fontSize: '12px',
                      color: colors.white
                    }}>
                    {item.value}
                  </Stack>
                </Stack>
                {index === 3 && (
                  <Box
                    sx={{
                      height: '1px',
                      width: '100%',
                      bgcolor: colors.white1
                    }}
                  />
                )}
              </Fragment>
            ))}
          </Column>
          <Row mt="lg" mb="lg">
            <Button
              onClick={() => {
                if (!liquidationEvent || !poolData) {
                  return;
                }
                createLoan({
                  borrowAmount: {
                    denom: poolData.token.denom,
                    amount: toUnitAmount(borrowAmount, poolData.token.asset.exponent)
                  },
                  maturityTime,
                  poolId: poolData.baseData.id,
                  btcUnitAmount: toUnitAmount(collateralAmount, satBalance?.asset.exponent || 8),
                  liquidationEvent
                });
              }}
              disabled={isDisabled}
              loading={loading}
              preset="primary"
              text="Request Loan"
              full></Button>
          </Row>
        </Column>
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="loans" />
      </Footer>
    </Layout>
  );
}
