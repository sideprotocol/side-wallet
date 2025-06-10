import BigNumber from 'bignumber.js';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import 'swiper/css';

import { Button, Column, Content, Footer, Icon, Image, Layout, LightTooltip, Row, Text } from '@/ui/components';
import { CoinInput } from '@/ui/components/CoinInput';
import { NavTabBar } from '@/ui/components/NavTabBar';
import useCreateLoan from '@/ui/hooks/useCreateLoan';
import useGetBitcoinBalanceList from '@/ui/hooks/useGetBitcoinBalanceList';
import useGetDlcEventById from '@/ui/hooks/useGetDlcEventById';
import useGetDlcPrice from '@/ui/hooks/useGetDlcPrice';
import useGetLiquidationEvent from '@/ui/hooks/useGetLiquidationEvent';
import useGetPoolsData from '@/ui/hooks/useGetPoolsData';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import MainHeader from '@/ui/pages/Main/MainHeader';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useLendingState } from '@/ui/state/lending/hook';
import { colors } from '@/ui/theme/colors';
import { formatUnitAmount, getTruncate } from '@/ui/utils';
import { toUnitAmount } from '@/ui/utils/formatter';
import { Box, Checkbox, Popover, Stack, Typography } from '@mui/material';

import { useNavigate } from '../MainRoute';

export default function LendingTanScreen() {
  const currentAccount = useCurrentAccount();

  const [collateralAmount, setcollateralAmount] = useState('');
  const [isHover, setIsHover] = useState(false);
  const [maturity, setmaturity] = useState('');

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
  const requestFeeToken = balanceList.find((item) => item.denom === poolData?.baseData.config.request_fee.denom);

  useEffect(() => {
    if (!poolData) return;

    setmaturity(poolData?.baseData.config.tranches[0].maturity);
  }, [poolData]);

  const collateralValue = useMemo(() => {
    if (!collateralAmount || !satBalance) return '0';
    const value = BigNumber(collateralAmount).times(satBalance.denomPrice).toString();
    return value;
  }, [collateralAmount, satBalance]);

  const borrowValue = useMemo(() => {
    if (!borrowAmount || !poolTokenBalance) return '0';
    const value = BigNumber(borrowAmount).times(poolTokenBalance.denomPrice).toString();

    return value;
  }, [borrowAmount, poolTokenBalance]);

  const { liquidationEvent } = useGetLiquidationEvent({
    bitcoinAmount: collateralAmount,
    borrowToken: poolData?.token,
    borrowTokenAmount: borrowAmount,
    poolId: poolData?.baseData.id || '',
    maturity: maturity
  });

  const { dlcPrice } = useGetDlcPrice(poolData?.baseData.config);

  // 最大可借数量: 比特币数量 * 比特币相对价格(BTC/xx) * 最大LTV
  const { borrowMaxAmount } = useMemo(() => {
    let borrowMaxAmount = '0';
    try {
      if (!satBalance || !poolData?.token) {
        return {
          borrowMaxAmount: '0'
        };
      }
      borrowMaxAmount = new BigNumber(collateralAmount || '0')
        .multipliedBy(dlcPrice || '0')
        .multipliedBy(poolData.baseData.config.max_ltv)
        .div(100)
        .toFixed(+poolData.token.asset.precision, BigNumber.ROUND_DOWN);
    } catch (error) {
      return {
        borrowMaxAmount: '0'
      };
    }

    return { borrowMaxAmount };
  }, [collateralAmount, borrowAmount, poolData, satBalance, poolTokenBalance]);

  // 健康因子: 比特币数量 * 比特币相对价格(BTC/xx) * 清算LTV / 借入数量
  const { healthFactor } = useMemo(() => {
    if (BigNumber(collateralAmount || 0).eq(0) || BigNumber(borrowAmount || 0).eq(0) || !poolData?.baseData.config) {
      return {
        healthFactor: '-'
      };
    }
    return {
      healthFactor: new BigNumber(collateralAmount)
        .times(dlcPrice || 0)
        .times(poolData?.baseData.config.liquidation_threshold || 0)
        .div(100)
        .div(borrowAmount || 1)
        .toFixed(2)
    };
  }, [borrowAmount, poolTokenBalance, collateralAmount, poolData]);

  const borrow_apr = poolData?.baseData.config.tranches.find((item) => item.maturity === maturity)?.borrow_apr || 0;

  const currentLtv = useMemo(
    () =>
      new BigNumber(borrowAmount || 0)
        .div(+collateralAmount || 1)
        .div(dlcPrice || '1')
        .multipliedBy(100)
        .toFixed(2),
    [borrowAmount, collateralAmount, dlcPrice]
  );

  const liquidationPriceSymbol = `${
    poolData?.baseData.config.lending_asset.is_base_price_asset
      ? poolData?.baseData.config.lending_asset.price_symbol
      : poolData?.baseData.config.collateral_asset.price_symbol
  }/${
    poolData?.baseData.config.lending_asset.is_base_price_asset
      ? poolData?.baseData.config.collateral_asset.price_symbol
      : poolData?.baseData.config.lending_asset.price_symbol
  }`;

  const data = [
    {
      label: 'Health Factor',
      value: (
        <Stack direction="row" alignItems="center" gap="8px">
          <Typography
            color={colors.green}
            sx={{
              fontSize: '14px'
            }}>
            ∞
          </Typography>
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
                fontSize: '12px',
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
      ),
      tip: 'A measure of how safe your loan is. A value above 1.0 means you’re safe from liquidation'
    },
    {
      label: 'Current LTV',
      value: (
        <Typography
          sx={{
            fontSize: '12px',
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
            .div(+collateralAmount || 1)
            .div(dlcPrice || '1')
            .multipliedBy(100)
            .toFixed(2)}%`}
        </Typography>
      ),
      tip: 'The ratio between your input borrow amount and your collateral value'
    },
    {
      label: 'Max LTV',
      value: (
        <>
          <Typography
            sx={{
              fontSize: '12px',
              color: colors.grey12
            }}>
            {`${poolData?.baseData.config.max_ltv}%`}
          </Typography>
        </>
      ),
      tip: 'The maximum loan-to-value ratio you’re allowed to borrow'
    },
    {
      label: 'Liquidation LTV',
      value: (
        <Typography
          sx={{
            fontSize: '12px',
            color: colors.grey12
          }}>
          {!poolData ? '-' : `${poolData?.baseData.config.liquidation_threshold}%`}
        </Typography>
      ),
      tip: 'The LTV threshold at which your position becomes eligible for liquidation'
    },
    {
      label: `Liquidation Price (${liquidationPriceSymbol})`,
      value: `${getTruncate(liquidationEvent?.price || '0', 3)}`,
      tip: 'The collateral price at which liquidation would be triggered'
    },
    {
      label: 'Interest Rate',
      value: `${new BigNumber(borrow_apr).div(10).toFixed(2)}%`,
      tip: 'The annual percentage rate (APR) applied to your loan'
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
      ),
      tip: 'The maximum interest that can accrue on your loan'
    },
    {
      label: 'Request Fees',
      value: (
        <>
          {formatUnitAmount(
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
      ),
      tip: 'Upfront fees required to initiate the loan'
    }
  ];

  const { loading, createLoan } = useCreateLoan();

  const { dlcEvent } = useGetDlcEventById(liquidationEvent?.event_id);

  const [isChecked, setIsChecked] = useState(false);
  const [isHoverMaturity, setIsHoverMaturity] = useState(false);

  const { isDisabled, buttonText } = useMemo(() => {
    let isDisabled = false,
      buttonText = 'Request Loan';
    if (loading) {
      isDisabled = true;
    } else if (!+collateralAmount || !+borrowAmount) {
      isDisabled = true;
    } else if (!liquidationEvent) {
      isDisabled = true;
      buttonText = 'Liquidation event does not exist';
    } else if (healthFactor === '-' || (+healthFactor <= 1.2 && !isChecked) || +currentLtv >= 80) {
      isDisabled = true;
    } else if (
      +borrowAmount <
      +formatUnitAmount(poolData?.baseData.config.min_borrow_amount || '0', poolData?.token.asset.exponent || '6')
    ) {
      isDisabled = true;
      buttonText = `Min borrow amount: ${formatUnitAmount(
        poolData?.baseData.config.min_borrow_amount || '0',
        poolData?.token.asset.exponent || '6'
      )}`;
    } else if (
      +borrowAmount >
      +formatUnitAmount(poolData?.baseData.config.max_borrow_amount || '0', poolData?.token.asset.exponent || '6')
    ) {
      isDisabled = true;
      buttonText = `Max borrow amount: ${formatUnitAmount(
        poolData?.baseData.config.min_borrow_amount || '0',
        poolData?.token.asset.exponent || '6'
      )}`;
    } else if (dlcEvent?.event.has_triggered) {
      isDisabled = true;
      buttonText = 'Dlc event has triggered';
    } else if (+(requestFeeToken?.amount || '0') < +(poolData?.baseData.config.request_fee.amount || '0')) {
      isDisabled = true;
      buttonText = 'No enough balance';
    }
    return {
      isDisabled,
      buttonText
    };
  }, [loading, poolData, collateralAmount, borrowAmount, liquidationEvent, healthFactor, dlcEvent, isChecked]);

  return (
    <>
      <Layout>
        <MainHeader title="" />
        <Content
          style={{
            gap: '0'
          }}>
          <Row full justifyBetween itemsCenter mt="lg">
            <Text
              color="white"
              size="lg"
              style={{
                fontWeight: 600
              }}>
              Borrow
            </Text>

            <Stack
              direction="row"
              alignItems="center"
              gap="4px"
              onClick={() => {
                navigator('MyLoansScreen');
              }}
              sx={{
                cursor: 'pointer',
                p: {
                  color: colors.grey12,
                  transition: '.4s'
                },
                div: {
                  transition: '.4s'
                },
                ':hover': {
                  p: {
                    color: colors.white
                  },
                  div: {
                    div: {
                      color: `${colors.white} !important`,
                      bgcolor: `${colors.white} !important`
                    }
                  }
                }
              }}>
              <Typography
                sx={{
                  fontSize: '12px',
                  mt: '-1px'
                }}>
                My Loans
              </Typography>
              <Icon icon="arrow-right" color="white_muted" size={16} />
            </Stack>
          </Row>
          <Row full justifyBetween itemsCenter mt="lg">
            <Row itemsCenter>
              <Text color="white" size="xs">
                Collateral
              </Text>
              {+collateralValue ? (
                <Text
                  style={{
                    maxWidth: '90px',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    textAlign: 'right'
                  }}
                  size="xs"
                  color="white_muted">
                  ~${getTruncate(collateralValue, 2)}
                </Text>
              ) : null}
            </Row>

            <Row itemsCenter gap="sm">
              <Icon color="white_muted" icon="wallet-icon" size={12} />
              <Text text={BigNumber(satBalance?.formatAmount || '0').toFormat()} color="white_muted" size="xs"></Text>
            </Row>
          </Row>
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              bgcolor: colors.card_bgColor,
              border: `1px solid ${colors.white20}`,
              borderRadius: '10px',
              marginTop: '4px',
              p: '8px 10px',
              transition: '.4s',
              ':hover': {
                border: `1px solid ${colors.white_4}`
              }
            }}>
            <CoinInput
              size={22}
              coin={{
                amount: collateralAmount,
                denom: 'sat'
              }}
              max={satBalance?.formatAmount || '0'}
              onChange={(value) => {
                setcollateralAmount(value);
                setBorrowAmount('');
              }}
            />
            <Row
              style={{
                flexShrink: 0
              }}>
              <Image src="/images/icons/btc.svg" height={24} width={24}></Image>
              <Text text={satBalance?.asset.symbol || 'BTC'} color="white" size="md"></Text>
            </Row>
          </Stack>
          <Row full justifyBetween itemsCenter mt="medium">
            <Row itemsCenter>
              <Text color="white" size="xs">
                I want to borrow
              </Text>
              {+borrowValue ? (
                <Text
                  style={{
                    maxWidth: '90px',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    textAlign: 'right'
                  }}
                  size="xs"
                  color="white_muted">
                  ~${getTruncate(borrowValue, 2)}
                </Text>
              ) : null}
            </Row>
            <Row itemsCenter gap="sm">
              <Icon icon="wallet-icon" color="white_muted" size={12} />
              <Text
                text={BigNumber(poolTokenBalance?.formatAmount || '0').toFormat()}
                color="white_muted"
                size="xs"></Text>
            </Row>
          </Row>
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              bgcolor: colors.card_bgColor,
              border: `1px solid ${colors.white20}`,
              borderRadius: '10px',
              marginTop: '4px',
              p: '8px 10px',
              transition: '.4s',
              ':hover': {
                border: `1px solid ${colors.white_4}`
              }
            }}>
            <CoinInput
              size={22}
              coin={{
                amount: borrowAmount,
                denom: poolTokenBalance?.denom || 'uusdc'
              }}
              max={borrowMaxAmount || '0'}
              onChange={(value) => {
                setBorrowAmount(value);
              }}
            />
            <Stack
              direction="row"
              alignItems="center"
              flexShrink={0}
              gap="8px"
              sx={{
                cursor: 'pointer'
              }}
              onMouseOver={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              onClick={() => {
                navigator('LendingSelectTokenScreen', {
                  poolsData
                });
              }}>
              <Image src={poolTokenBalance?.asset.logo} height={24} width={24}></Image>
              <Typography
                sx={{
                  fontSize: '16px',
                  color: isHover ? colors.main : colors.white
                }}>
                {poolTokenBalance?.asset.symbol || 'USDC'}
              </Typography>
              <Icon icon="down" size={10} color={isHover ? 'main' : 'white'}></Icon>
            </Stack>
          </Stack>
          {healthFactor !== '-' && +healthFactor <= 1.2 && (
            <Stack
              direction="row"
              alignItems="flex-start"
              gap="2px"
              sx={{
                mt: '16px',
                p: '14px 10px',
                borderRadius: '10px',
                bgcolor: colors.red1,
                fontSize: '12px'
              }}>
              <Checkbox
                sx={{
                  p: '4px',
                  color: colors.white,
                  '&.Mui-checked': {
                    color: colors.red
                  }
                }}
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}></Checkbox>
              <Typography
                sx={{
                  fontSize: '12px',
                  color: colors.red
                }}>
                I acknowledge that borrowing at this LTV increases my risk of liquidation.
              </Typography>
            </Stack>
          )}
          <Box
            sx={{
              px: '12px',
              py: '14px',
              my: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              bgcolor: colors.card_bgColor,
              transition: '.4s',
              borderRadius: '8px',
              ':hover': {
                bgcolor: colors.black_dark
              }
            }}
            onMouseOver={() => setIsHoverMaturity(true)}
            onMouseLeave={() => setIsHoverMaturity(false)}
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
                  <Icon icon="down" size={12} color={isHoverMaturity ? 'main' : 'white'}></Icon>
                </Box>
              </Box>
            </Stack>
          </Box>
          <Column
            bg="black"
            style={{
              borderTop: `1px solid ${colors.white1}`
            }}
            py="lg">
            {data.map((item, index) => (
              <Fragment key={index}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <LightTooltip title={item.tip} arrow placement="top">
                    <Stack
                      direction="row"
                      sx={{
                        fontSize: '12px',
                        color: colors.grey12,
                        textDecoration: 'dotted underline',
                        textUnderlineOffset: '2px',
                        cursor: 'pointer',
                        transition: '.4s',
                        ':hover': {
                          color: colors.white
                        }
                      }}>
                      {item.label}
                    </Stack>
                  </LightTooltip>
                  <Stack
                    direction="row"
                    sx={{
                      fontSize: '12px',
                      color: colors.white
                    }}>
                    {item.value}
                  </Stack>
                </Stack>
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
              text={buttonText}
              full></Button>
          </Row>
        </Content>
        <Footer px="zero" py="zero">
          <NavTabBar tab="loans" />
        </Footer>
      </Layout>
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
            mt: '4px',
            p: '12px',
            backgroundColor: colors.card_bgColor,
            borderRadius: '10px',
            width: '100%',
            border: `1px solid ${colors.white1}`
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
                setmaturity(item.maturity);
                setAnchorEl(null);
              }}>
              <Typography
                sx={{
                  fontSize: '14px'
                }}
                color={colors.white}>
                {new BigNumber(item.maturity).div(3600).div(24).toFixed(0)} days&nbsp;
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
    </>
  );
}
