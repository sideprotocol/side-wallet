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
import { PoolDataItem, useGetPoolExchangeRate, useWithdraw } from '@/ui/hooks/lending';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { colors } from '@/ui/theme/colors';
import { getTruncate, useLocationState } from '@/ui/utils';
import { toUnitAmount } from '@/ui/utils/formatter';
import { Box, Stack, Typography } from '@mui/material';

export default function EarnRedeemScreen() {
  const { poolData } = useLocationState<{
    poolData: PoolDataItem;
  }>();

  const currentAccount = useCurrentAccount();

  const [withdrawAmount, setwithdrawAmount] = useState('');

  const { withdraw, loading, tx } = useWithdraw();

  const { balanceList } = useGetSideBalanceList(currentAccount.address);

  const { data: exchangeRate } = useGetPoolExchangeRate({ poolId: poolData?.baseData?.id || '' });
  const stokenBalance = balanceList.find((b) => b.denom == poolData?.baseData.total_ytokens.denom);
  const poolTokenBalance = balanceList.find((b) => b.denom == poolData?.baseData.supply.denom);

  const maxWithdrawAmount = useMemo(() => {
    if (!poolData) return '0';

    const poolMaxCanWithdraw = new BigNumber(poolData?.totalSupply)
      .minus(poolData?.totalBorrow)
      .toFixed(6, BigNumber.ROUND_DOWN);
    return poolMaxCanWithdraw;
  }, [poolData]);

  const withdrawExceed = BigNumber(withdrawAmount || '0').gt(maxWithdrawAmount);

  const onWithdraw = () => {
    if (!poolData) return;

    withdraw({
      shares: {
        denom: poolData.baseData.total_ytokens.denom,
        amount: toUnitAmount(withdrawAmount, poolData.token.asset.exponent)
      }
    });
  };

  const isDisabled = useMemo(() => {
    if (!stokenBalance) return true;
    return loading || +withdrawAmount > (+stokenBalance.formatAmount || 0);
  }, [loading, withdrawAmount]);

  const data = [
    {
      label: `${poolTokenBalance?.asset.symbol}/${stokenBalance?.asset.symbol}`,
      value: (
        <Typography
          sx={{
            fontSize: '12px',
            color: colors.white
          }}>
          {' '}
          {+exchangeRate}
        </Typography>
      )
    },
    {
      label: 'You will receive',
      value: (
        <>
          <Typography
            sx={{
              fontSize: '12px',
              color: colors.white
            }}>
            {new BigNumber(withdrawAmount || '0').multipliedBy(exchangeRate).toFixed(6)}&nbsp;
            <small style={{ fontSize: '100%', color: colors.grey12, fontWeight: 500 }}>
              {poolTokenBalance?.asset.symbol}
            </small>
          </Typography>
        </>
      ),
      tip: ''
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
              You have successfully redeemed, please check in your account.
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
            title="Redeem"
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
                    text={getTruncate(stokenBalance?.formatAmount || '0', stokenBalance?.asset.precision || 6)}
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
                    amount: withdrawAmount,
                    denom: stokenBalance?.denom || ''
                  }}
                  max={stokenBalance?.formatAmount || '0'}
                  decimalScale={stokenBalance?.asset.precision || 6}
                  onChange={(value) => {
                    setwithdrawAmount(value);
                  }}
                />
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
                    setwithdrawAmount(stokenBalance?.formatAmount || '0');
                  }}>
                  Max
                </Typography>
                <Image src={stokenBalance?.asset.logo} height={28} width={28}></Image>

                <Text text={stokenBalance?.asset.symbol} color="white" size="md"></Text>
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

              {withdrawExceed && (
                <Text
                  color="red"
                  size="xs"
                  text={`Max redeemable: ${maxWithdrawAmount} ${stokenBalance?.asset.symbol}`}></Text>
              )}
            </Column>
          </Content>
          <Row mt="md" mb="lg">
            <Button
              onClick={() => {
                if (tx) {
                  window.history.go(-1);
                } else {
                  onWithdraw();
                }
              }}
              loading={loading}
              disabled={isDisabled}
              preset="primary"
              text={'Redeem'}
              full
              style={{ position: 'fixed', bottom: 16, left: 16, right: 16 }}
            />
          </Row>
        </>
      )}
    </Layout>
  );
}
