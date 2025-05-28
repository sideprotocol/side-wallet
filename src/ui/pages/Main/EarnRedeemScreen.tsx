import { BigNumber } from 'bignumber.js';
import { useMemo, useState } from 'react';
import 'swiper/css';

import { Button, Column, Content, Header, Icon, Image, Layout, Row, Text } from '@/ui/components';
import { CoinInput } from '@/ui/components/CoinInput';
import useGetPoolExchangeRate from '@/ui/hooks/useGetPoolExchangeRate';
import { PoolDataItem } from '@/ui/hooks/useGetPoolsData';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import useWithdraw from '@/ui/hooks/useWithdraw';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { colors } from '@/ui/theme/colors';
import { getTruncate, useLocationState } from '@/ui/utils';
import { toUnitAmount } from '@/ui/utils/formatter';
import { Stack, Typography } from '@mui/material';

export default function EarnRedeemScreen() {
  const { poolData } = useLocationState<{
    poolData: PoolDataItem;
  }>();

  const currentAccount = useCurrentAccount();

  const [withdrawAmount, setwithdrawAmount] = useState('');

  const { withdraw, loading, tx } = useWithdraw();

  const { balanceList } = useGetSideBalanceList(currentAccount.address);

  const { data: exchangeRate } = useGetPoolExchangeRate({ poolId: poolData?.baseData?.id || '' });
  const stokenBalance = balanceList.find((b) => b.denom == poolData?.baseData.total_stokens.denom);
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
        denom: poolData.baseData.total_stokens.denom,
        amount: toUnitAmount(withdrawAmount, poolData.token.asset.exponent)
      }
    });
  };

  const isDisabled = useMemo(() => {
    if (!stokenBalance) return true;
    return loading || +withdrawAmount > (+stokenBalance.formatAmount || 0);
  }, [loading, withdrawAmount]);

  return (
    <Layout>
      {tx ? (
        <Content>
          <Stack
            alignItems="center"
            sx={{
              mt: '100px'
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
              <g clipPath="url(#clip0_28_7129)">
                <path
                  opacity="0.15"
                  d="M0 40C0 50.6087 4.21427 60.7828 11.7157 68.2843C19.2172 75.7857 29.3913 80 40 80C50.6087 80 60.7828 75.7857 68.2843 68.2843C75.7857 60.7828 80 50.6087 80 40C80 29.3913 75.7857 19.2172 68.2843 11.7157C60.7828 4.21427 50.6087 0 40 0C29.3913 0 19.2172 4.21427 11.7157 11.7157C4.21427 19.2172 0 29.3913 0 40Z"
                  fill="#67EBB2"
                />
                <path
                  d="M40.0001 63.6363C35.3252 63.6364 30.7552 62.2502 26.8682 59.653C22.9811 57.0558 19.9515 53.3643 18.1625 49.0452C16.3735 44.7262 15.9054 39.9737 16.8175 35.3886C17.7295 30.8035 19.9807 26.5919 23.2864 23.2863C27.7192 18.8536 33.7312 16.3633 40.0001 16.3633C46.2689 16.3633 52.281 18.8536 56.7137 23.2863C61.1464 27.719 63.6367 33.7311 63.6367 39.9999C63.6367 46.2688 61.1464 52.2808 56.7137 56.7136C54.524 58.9153 51.9192 60.6609 49.0503 61.8491C46.1814 63.0374 43.1053 63.6449 40.0001 63.6363ZM30.301 38.0072C29.7445 38.0072 29.2004 38.172 28.7374 38.4807C28.2744 38.7895 27.9132 39.2284 27.6993 39.7422C27.4854 40.2559 27.4284 40.8215 27.5355 41.3676C27.6425 41.9137 27.9089 42.4159 28.301 42.8108L35.5664 50.1336C35.7837 50.3524 36.0421 50.5261 36.3267 50.6446C36.6114 50.7631 36.9167 50.8241 37.2251 50.8241C37.5334 50.8241 37.8387 50.7631 38.1234 50.6446C38.408 50.5261 38.6664 50.3524 38.8837 50.1336L51.841 37.1063C52.263 36.6807 52.5055 36.1094 52.5184 35.5102C52.5313 34.911 52.3136 34.3298 51.9103 33.8864C51.507 33.4431 50.9488 33.1716 50.3511 33.1279C49.7534 33.0842 49.1617 33.2718 48.6982 33.6518L38.7437 41.8399C38.3176 42.1908 37.781 42.3795 37.229 42.3725C36.677 42.3655 36.1454 42.1633 35.7282 41.8018L32.1419 38.6954C31.631 38.2521 30.9774 38.0078 30.301 38.0072Z"
                  fill="#20D76D"
                />
              </g>
              <defs>
                <clipPath id="clip0_28_7129">
                  <rect width="80" height="80" fill="white" />
                </clipPath>
              </defs>
            </svg>
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
              <Row full justifyCenter itemsCenter gap="sm" mt="lg">
                <Image
                  src={stokenBalance?.asset.logo}
                  size={32}
                  height={32}
                  width={32}
                  style={{
                    borderRadius: '50%'
                  }}></Image>
                <Text text={stokenBalance?.asset.symbol} size="md" color="white"></Text>
              </Row>
              <Row justifyBetween itemsCenter>
                <Text text="Amount" size="xs" color="white"></Text>
                <Row
                  style={{
                    flexShrink: 0
                  }}
                  itemsCenter
                  gap="md">
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
                  decimalScale={stokenBalance?.asset.precision || 6}
                  onChange={(value) => {
                    setwithdrawAmount(value);
                  }}
                />
                <Typography
                  sx={{
                    color: colors.main,
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setwithdrawAmount(stokenBalance?.formatAmount || '0');
                  }}>
                  Max
                </Typography>
                <Image src={stokenBalance?.asset.logo} height={28} width={28}></Image>

                <Text text={stokenBalance?.asset.symbol} color="white" size="md"></Text>
              </Stack>

              <Column
                bg="black"
                style={{
                  borderRadius: '10px'
                }}
                py="lg">
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography
                    sx={{
                      fontSize: '12px',
                      color: colors.grey12
                    }}>
                    {stokenBalance?.asset.symbol}/{poolTokenBalance?.asset.symbol}
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
                    {new BigNumber(withdrawAmount || '0').div(exchangeRate).toFixed(6)}&nbsp;
                    <small style={{ fontSize: '100%', color: colors.grey12, fontWeight: 500 }}>
                      {poolTokenBalance?.asset.symbol}
                    </small>
                  </Typography>
                </Stack>
              </Column>

              {withdrawExceed && (
                <Text
                  color="red"
                  size="xs"
                  text={`Max redeemable: ${maxWithdrawAmount} ${stokenBalance?.asset.symbol}`}></Text>
              )}
            </Column>
          </Content>
        </>
      )}
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
          text={tx ? 'Close' : 'Redeem'}
          full
          style={{ position: 'fixed', bottom: 16, left: 16, right: 16 }}
        />
      </Row>
    </Layout>
  );
}
