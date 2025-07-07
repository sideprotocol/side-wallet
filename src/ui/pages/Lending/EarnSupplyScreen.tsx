import { BigNumber } from 'bignumber.js';
import { useMemo, useState } from 'react';
import 'swiper/css';

import {
  Button,
  Column,
  Content,
  Header,
  Icon,
  Image,
  Layout,
  LightTooltip,
  Row,
  SuccessAnimation,
  Text
} from '@/ui/components';
import { CoinInput } from '@/ui/components/CoinInput';
import { PoolDataItem, useGetPoolExchangeRate, useSupply } from '@/ui/hooks/lending';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { colors } from '@/ui/theme/colors';
import { getTruncate, useLocationState } from '@/ui/utils';
import { toUnitAmount } from '@/ui/utils/formatter';
import { Box, Stack, Typography } from '@mui/material';

export default function EarnSupplyScreen() {
  const { poolData } = useLocationState<{
    poolData: PoolDataItem;
  }>();

  const currentAccount = useCurrentAccount();
  const [supplyAmount, setsupplyAmount] = useState('');

  const { supply, loading, tx } = useSupply();

  const { balanceList } = useGetSideBalanceList(currentAccount?.address);

  const poolTokenBalance = balanceList.find((b) => b.denom == poolData.token.denom);

  const { data: exchangeRate } = useGetPoolExchangeRate({ poolId: poolData?.baseData?.id || '' });

  const { receiveShare, expectedInterestDay } = useMemo(() => {
    const receiveShare = new BigNumber(supplyAmount || '0').div(exchangeRate || 1).toFixed(18, BigNumber.ROUND_DOWN);
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

  const isDisabled = useMemo(() => {
    return loading || +supplyAmount <= 0 || +poolData.token.formatAmount < +supplyAmount;
  }, [loading, supplyAmount, poolData]);

  const data = [
    {
      label: 'Net APR',
      value: (
        <Typography
          sx={{
            fontSize: '12px',
            color: colors.green
          }}>
          {poolData?.supplyApy}%
        </Typography>
      ),
      tip: 'Your estimated annual return, based on pool utilization and including token incentives if applicable'
    },
    {
      label: 'You will receive',
      value: (
        <Typography
          sx={{
            fontSize: '12px',
            color: colors.white
          }}>
          {getTruncate(receiveShare, 6)}&nbsp;
          <small style={{ fontSize: '100%', color: colors.grey12, fontWeight: 500 }}>
            y{poolData?.token.asset.symbol}
          </small>
        </Typography>
      ),
      tip: 'The amount of yToken you’ll receive in exchange for your deposited tokens'
    },
    {
      label: 'Expected Interests / day',
      value: (
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
      ),
      tip: 'The estimated daily interest you’ll earn, calculated based on current rates'
    }
  ];

  return (
    <Layout>
      {tx ? (
        <Content>
          <Stack
            alignItems="center"
            sx={{
              mt: '100px'
            }}>
            <SuccessAnimation />
            <Typography
              sx={{
                mt: '15px',
                fontSize: '20px',
                fontWeight: 600,
                lineHeight: '23px',
                color: colors.green
              }}>
              Completed!
            </Typography>
            <Typography
              sx={{
                mt: '32px',
                fontSize: '12px',
                color: colors.white,
                maxWidth: '338px',
                textAlign: 'center',
                fontWeight: 400
              }}>
              Your assets are supplied to a lending pool that other users can borrow from, and you earn yield from the
              interest they pay.
            </Typography>
          </Stack>
          <Button
            preset="default"
            style={{
              marginTop: '32px'
            }}
            onClick={() => {
              window.history.go(-1);
            }}>
            Close
          </Button>
        </Content>
      ) : (
        <>
          <Header
            onBack={() => {
              window.history.go(-1);
            }}
            title={`Supply ${poolData.token.asset.symbol}`}
          />
          <Content
            mt="lg"
            classname="fadeIn-page"
            style={{
              padding: '0 16px 70px'
            }}>
            <Column gap="lg" px="lg" py="md">
              <Row justifyBetween itemsCenter>
                <Text text="Amount" size="xs" color="white"></Text>
                <Row
                  style={{
                    flexShrink: 0
                  }}
                  itemsCenter
                  gap="sm">
                  <Icon color="white_muted" icon="wallet-icon" size={12}></Icon>
                  <Text
                    style={{
                      verticalAlign: 'middle',
                      whiteSpace: 'nowrap'
                    }}
                    text={getTruncate(poolTokenBalance?.formatAmount || '0', poolTokenBalance?.asset.precision || 6)}
                    size="xxs"
                    color="white_muted"></Text>
                </Row>
              </Row>
              <Stack
                direction="row"
                alignItems="center"
                gap="8px"
                sx={{
                  bgcolor: colors.card_bgColor,
                  border: `1px solid ${colors.white20}`,
                  borderRadius: '10px',
                  marginTop: '-8px',
                  p: '8px 10px',
                  transition: '.4s',
                  ':hover': {
                    border: `1px solid ${colors.white_4}`
                  }
                }}>
                <CoinInput
                  size={22}
                  coin={{
                    amount: supplyAmount,
                    denom: poolTokenBalance?.denom || 'uusdc'
                  }}
                  decimalScale={poolTokenBalance?.asset.precision || 6}
                  max={poolTokenBalance?.formatAmount || '0'}
                  onChange={(value) => {
                    setsupplyAmount(value);
                  }}
                />
                <Row
                  itemsCenter
                  gap="md"
                  style={{
                    flexShrink: 0
                  }}>
                  <Typography
                    sx={{
                      color: colors.grey12,
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: '.4s',
                      ':hover': {
                        color: colors.white
                      }
                    }}
                    onClick={() => {
                      if (!poolTokenBalance) {
                        return;
                      }
                      setsupplyAmount(poolTokenBalance.formatAmount);
                    }}>
                    Max
                  </Typography>
                  <Image src={poolTokenBalance?.asset.logo} height={28} width={28}></Image>
                  <Text text={poolTokenBalance?.asset.symbol} color="white" size="md"></Text>
                </Row>
              </Stack>
              <Box
                sx={{
                  height: '1px',
                  backgroundColor: colors.black_dark
                }}
              />
              <Column bg="black">
                {data.map((item) => (
                  <Stack direction="row" justifyContent="space-between" alignItems="center" key={item.label}>
                    <LightTooltip title={item.tip} placement="top" arrow>
                      <Typography
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
                      </Typography>
                    </LightTooltip>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      {item.value}
                    </Stack>
                  </Stack>
                ))}
              </Column>
            </Column>
          </Content>
          <Row mt="md" mb="lg">
            <Button
              onClick={() => {
                if (tx) {
                  window.history.go(-1);
                } else {
                  onSupply();
                }
              }}
              loading={loading}
              disabled={isDisabled}
              preset="primary"
              text={'Supply'}
              full
              style={{ position: 'fixed', bottom: 16, left: 16, right: 16 }}
            />
          </Row>
        </>
      )}
    </Layout>
  );
}
