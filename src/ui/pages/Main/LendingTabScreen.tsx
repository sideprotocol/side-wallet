import BigNumber from 'bignumber.js';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
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
import { useLendingState } from '@/ui/state/lending/hook';
import { colors } from '@/ui/theme/colors';
import { getTruncate } from '@/ui/utils';
import { toReadableAmount, toUnitAmount } from '@/ui/utils/formatter';
import { Box, Popover, Stack, Typography } from '@mui/material';

import { useNavigate } from '../MainRoute';
import MainHeader from './MainHeader';

export default function LendingTanScreen() {
  const currentAccount = useCurrentAccount();

  const [collateralAmount, setcollateralAmount] = useState('');

  const { poolTokenDenom } = useLendingState();

  const navigator = useNavigate();

  const [borrowAmount, setBorrowAmount] = useState('');
  const { balanceList } = useGetSideBalanceList(currentAccount?.address);

  const { balanceList: bitcoinBalanceList } = useGetBitcoinBalanceList(currentAccount?.address);

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const open = !!anchorEl;

  const satBalance = bitcoinBalanceList.find((b) => b.denom === 'sat');

  const poolTokenBalance = balanceList.find((b) => b.denom == poolTokenDenom);

  const { data: poolsData } = useGetPoolsData();

  const poolData = poolsData.find((p) => p.token.denom === poolTokenBalance?.denom);

  const [maturity, setMaturity] = useState(poolData?.baseData.config.tranches[0].maturity);

  useEffect(() => {
    setMaturity(poolData?.baseData.config.tranches[0].maturity);
  }, [poolData]);

  const requestFeeToken = balanceList.find((item) => item.denom === poolData?.baseData.config.request_fee.denom);

  const collateralValue = useMemo(() => {
    if (!collateralAmount || !satBalance) return '$0';
    const value = BigNumber(collateralAmount).times(satBalance.denomPrice).toFormat(2);
    return '$' + value;
  }, [collateralAmount, satBalance]);

  const borrowValue = useMemo(() => {
    if (!borrowAmount || !poolTokenBalance) return '$0';
    const value = BigNumber(borrowAmount).times(poolTokenBalance.denomPrice).toFormat(2);

    return '$' + value;
  }, [borrowAmount, poolTokenBalance]);

  const { liquidationEvent } = useGetLiquidationEvent({
    bitcoinAmount: collateralAmount,
    borrowToken: poolData?.token,
    borrowTokenAmount: borrowAmount,
    poolId: poolData?.baseData.id || '',
    maturity: maturity
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
  }, [borrowAmount, poolTokenBalance, collateralAmount, satBalance, poolData]);

  const { borrowMaxAmount } = useMemo(() => {
    let borrowMaxAmount = '0';
    try {
      if (!satBalance || !poolData?.token) {
        return {
          borrowMaxAmount: '0'
        };
      }
      borrowMaxAmount = new BigNumber(collateralAmount || '0')
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
  }, [collateralAmount, borrowAmount, poolData, satBalance, poolTokenBalance]);

  const borrow_apr = poolData?.baseData.config.tranches.find((item) => item.maturity === maturity)?.borrow_apr || 0;

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
            .div(+collateralAmount || 1)
            .div(+(satBalance?.denomPrice || '0') || '1')
            .multipliedBy(100)
            .toFixed(2)}%`}
        </Typography>
      )
    },
    {
      label: 'Max Initial LTV',
      value: (
        <>
          {new BigNumber(borrowAmount || 0)
            .multipliedBy(borrow_apr)
            .div(1000)
            .div(365)
            .multipliedBy(maturity || 0)
            .div(60)
            .div(60)
            .div(24)
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
      label: `Liquidation Price (BTC/${poolTokenBalance?.asset.symbol})`,
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
            .multipliedBy(maturity || 0)
            .div(60)
            .div(60)
            .div(24)
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
      label: 'Request fee',
      value: (
        <>
          {toReadableAmount(
            poolData?.baseData.config.request_fee.amount || '0',
            requestFeeToken?.asset.exponent || '6'
          )}
          <small
            style={{
              fontSize: '100%',
              color: colors.grey12,
              marginLeft: '2px'
            }}>
            {requestFeeToken?.asset.symbol}
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
      <Content gap="lg" mt="xl">
        <Column
          gap="xs"
          style={{
            borderRadius: '10px'
          }}
          bg="card_bgColor"
          px="lg"
          py="lg">
          <Row px="md" full justifyBetween itemsCenter>
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
            px="md"
            itemsCenter
            rounded
            py="md">
            <Row
              style={{
                flexShrink: 0
              }}
              rounded={true}
              px="lg"
              py="md"
              bg="card_bgColor">
              <Image src="/images/icons/btc.svg" height={24} width={24}></Image>

              <Text text={satBalance?.asset.symbol || 'BTC'} color="white" size="md"></Text>
            </Row>

            <Box py={'2px'} height={'max-content'}>
              <CoinInput
                size={22}
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
                  verticalAlign: 'middle',
                  maxWidth: '90px',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden'
                }}
                text={collateralValue}
                size="xs"
                color="white_muted"></Text>
            </Column>
          </Row>

          <Row px="md" full justifyBetween itemsCenter mt="lg">
            <Text color="white" size="xs">
              I want to borrow
            </Text>

            <Row itemsCenter>
              <Icon icon="wallet-icon" color="white_muted" size={16} />
              <Text text={BigNumber(poolTokenBalance?.formatAmount || '0').toFormat()} color="white" size="xs"></Text>
            </Row>
          </Row>

          <Row
            bg="black"
            style={{
              height: 70
            }}
            px="md"
            itemsCenter
            rounded
            py="md">
            <Row
              style={{
                flexShrink: 0
              }}
              rounded={true}
              py="md"
              px="md"
              itemsCenter
              classname="bg-[#17171C]  hover:bg-opacity-80"
              onClick={() => {
                navigator('LendingSelectTokenScreen', {
                  poolsData,
                  type: ''
                });
              }}>
              <Image src={poolTokenBalance?.asset.logo} height={24} width={24}></Image>

              <Text text={poolTokenBalance?.asset.symbol || 'USDC'} color="white" size="md"></Text>

              <Icon icon="down" size={10}></Icon>
            </Row>

            <Box py={'2px'}>
              <CoinInput
                size={22}
                coin={{
                  amount: borrowAmount,
                  denom: poolTokenBalance?.denom || 'uusdc'
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
                    if (!+borrowMaxAmount) {
                      return;
                    }

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
                    if (!+borrowMaxAmount) {
                      return;
                    }
                    setBorrowAmount(borrowMaxAmount || '0');
                  }}>
                  Max
                </div>
              </Row>

              <Text
                style={{
                  verticalAlign: 'middle',
                  maxWidth: '90px',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden'
                }}
                text={borrowValue}
                size="xs"
                color="white_muted"></Text>
            </Column>
          </Row>

          <Box
            sx={{
              px: '12px',
              py: '8px',
              my: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              bgcolor: open ? colors.white1 : colors.black,
              transition: '.4s',
              borderRadius: '10px',
              ':hover': {
                bgcolor: colors.white1
              }
            }}
            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
              event.stopPropagation();
              setAnchorEl(event.currentTarget);
            }}>
            <Typography
              sx={{
                fontSize: '12px',
                color: colors.white
              }}>
              Maturity
            </Typography>
            <Stack direction="row" alignItems="center" gap="8px">
              <Box
                sx={{
                  fontSize: '12px',
                  color: colors.white,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                {new BigNumber(maturity || 0).div(3600).div(24).toFixed(0)}
                <Typography
                  style={{
                    display: 'inline'
                  }}
                  sx={{ fontSize: '12px', color: colors.grey12 }}>
                  days
                </Typography>
                <Box
                  sx={{
                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: '.4s'
                  }}>
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1 1L5 5L9 1"
                      stroke={open ? colors.main : 'white'}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Box>
              </Box>
            </Stack>
          </Box>
          <Popover
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            sx={{
              '.MuiPaper-root': {
                p: '12px',
                backgroundColor: colors.card_bgColor,
                border: `1px solid ${colors.white1}`,
                borderRadius: '10px',
                width: '304px'
              }
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}>
            {poolData?.baseData.config.tranches.map((item, index) => {
              const selected = item.maturity === maturity;
              return (
                <Box
                  key={index}
                  sx={{
                    p: '8px 10px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    mt: index !== 0 ? '10px' : '0px',
                    background: selected ? colors.white1 : 'transparent',
                    ':hover': {
                      bgcolor: colors.white1
                    },
                    position: 'relative'
                  }}
                  onClick={() => {
                    setMaturity(item.maturity);
                    setAnchorEl(null);
                  }}>
                  <Typography
                    sx={{
                      fontSize: '14px'
                    }}
                    color={colors.white}>
                    {new BigNumber(item.maturity).div(3600).div(24).toFixed(0)} days &nbsp;
                    <small
                      style={{
                        color: colors.main,
                        fontSize: '100%'
                      }}>
                      ({new BigNumber(item.borrow_apr).div(10).toFixed(2)}%)
                    </small>
                  </Typography>
                  {selected && (
                    <Box
                      sx={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)'
                      }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M13.3346 4L6.0013 11.3333L2.66797 8"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Popover>
          <Column
            bg="black"
            style={{
              borderRadius: '10px'
            }}
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
                if (!liquidationEvent || !poolData || !maturity) {
                  return;
                }
                createLoan({
                  borrowAmount: {
                    denom: poolData.token.denom,
                    amount: toUnitAmount(borrowAmount, poolData.token.asset.exponent)
                  },
                  maturityTime: maturity || '0',
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
