import { useState } from 'react';
import 'swiper/css';

import { Button, Column, Content, Footer, Layout, Row, Text } from '@/ui/components';
import { NavTabBar } from '@/ui/components/NavTabBar';
import useApproveLoan from '@/ui/hooks/useApproveLoan';
import useGetDepositTx from '@/ui/hooks/useGetDepositTx';
import useGetLiquidationEvent from '@/ui/hooks/useGetLiquidationEvent';
import useGetLoanById from '@/ui/hooks/useGetLoanById';
import useGetPoolsData from '@/ui/hooks/useGetPoolsData';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import MainHeader from '@/ui/pages/Main/MainHeader';
import { LiquidationEvent } from '@/ui/services/lending/types';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useLendingState } from '@/ui/state/lending/hook';
import { colors } from '@/ui/theme/colors';
import { getTruncate, satoshisToAmount, useLocationState } from '@/ui/utils';
import { formatTimeWithUTC, toReadableAmount } from '@/ui/utils/formatter';
import { Box, Input, Stack, Tooltip, Typography } from '@mui/material';

import { useNavigate } from '../MainRoute';

export interface LoanAuthorizeLocationState {
  loanId: string;
  borrowAmount: string;
  collateralAmount: string;
  feeRate: number;
  liquidationEvent: LiquidationEvent;
  isWalletDeposit?: boolean;
}

export default function LoanAuthorizeScreen() {
  const {
    loanId,
    feeRate,
    borrowAmount,
    collateralAmount,
    isWalletDeposit,
    liquidationEvent: LiquidationEventExact
  } = useLocationState<LoanAuthorizeLocationState>();
  const currentAccount = useCurrentAccount();
  const navigate = useNavigate();

  const { balanceList } = useGetSideBalanceList(currentAccount?.address);

  const { value } = useGetDepositTx(loanId, collateralAmount);

  const { approveLoan, loading, tx } = useApproveLoan(loanId, collateralAmount);

  const { poolTokenDenom, maturity } = useLendingState();

  const [refundAddress, setRefundAddress] = useState(currentAccount.address);

  const { loan } = useGetLoanById({ loanId });

  const { data: poolsData } = useGetPoolsData();
  const poolTokenBalance = balanceList.find((b) => b.denom == poolTokenDenom);

  const poolData = poolsData.find((p) => p.token.denom === poolTokenBalance?.denom);

  const { liquidationEvent: liquidationEventCalc } = useGetLiquidationEvent({
    bitcoinAmount: value ? satoshisToAmount(value) : '',
    borrowToken: poolData?.token,
    borrowTokenAmount: toReadableAmount(borrowAmount, poolData?.token.asset.exponent || 6),
    poolId: poolData?.baseData.id || '',
    maturity: maturity
  });

  const liquidationEvent = isWalletDeposit ? LiquidationEventExact : liquidationEventCalc;

  const data = [
    {
      label: 'Liquidation Price (BTC/USDC)',
      value: liquidationEvent ? getTruncate(liquidationEvent?.price || '0', 2) : '-',
      tip: 'Price will update if multiple deposits are detected. Please wait.'
    },
    {
      label: 'Maturity Date',
      value: !loan ? '-' : formatTimeWithUTC(+loan.loan.maturity_time * 1000)
    }
  ];

  const disabled = loading || !loanId || !borrowAmount || !collateralAmount || !liquidationEvent;

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
              Loan Approved!
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
              Congratulations! Your loan is on its way.
            </Typography>
          </Stack>
          <Button
            preset="primary"
            full
            style={{
              marginTop: '32px'
            }}
            onClick={() => {
              navigate('LoanDetailScreen', {
                loan_id: loanId
              });
            }}>
            View Loan
          </Button>
          <Button
            preset="default"
            full
            onClick={() => {
              window.history.go(-1);
            }}>
            Close
          </Button>
        </Content>
      ) : (
        <>
          <MainHeader title={''} />
          <Content gap="lg" mt="lg">
            <Row>
              <Text
                text="Step 2: Authorize Liquidation"
                size="lg"
                style={{
                  fontWeight: 700
                }}></Text>
            </Row>

            <Row
              bg="black_dark2"
              fullX
              style={{
                borderRadius: '10px',
                height: 6
              }}>
              <Row
                bg="main"
                fullY
                fullX
                style={{
                  borderRadius: '10px'
                }}
              />
            </Row>

            <Column itemsCenter gap="xl" mt="lg">
              <Column fullX>
                {data.map((item) => (
                  <Stack
                    key={item.label}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      width: '100%',
                      py: '12px',
                      borderRadius: '10px'
                    }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      gap="4px"
                      sx={{
                        fontSize: '14px',
                        color: colors.white
                      }}>
                      {item.label}
                      {item.tip && (
                        <Tooltip title={item.tip} arrow>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              id="Icon"
                              d="M6.17784 5.9C6.34242 5.43217 6.66725 5.03767 7.09481 4.78639C7.52237 4.53511 8.02507 4.44326 8.51387 4.5271C9.00266 4.61094 9.44602 4.86507 9.7654 5.24447C10.0848 5.62387 10.2596 6.10407 10.2588 6.6C10.2588 8 8.15884 8.7 8.15884 8.7M8.21484 11.5H8.22184M15.2148 8C15.2148 11.866 12.0808 15 8.21484 15C4.34885 15 1.21484 11.866 1.21484 8C1.21484 4.13401 4.34885 1 8.21484 1C12.0808 1 15.2148 4.13401 15.2148 8Z"
                              stroke="#6C7080"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Tooltip>
                      )}
                    </Stack>
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: colors.main
                      }}>
                      {item.value}
                    </Typography>
                  </Stack>
                ))}

                <Stack
                  direction="row"
                  justifyContent="start"
                  alignItems="center"
                  gap="4px"
                  sx={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: colors.white,
                    py: '12px'
                  }}>
                  Collateral Refund Address
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    py: '12px',
                    px: '12px',
                    borderRadius: '10px',
                    bgcolor: colors.card_bgColor,
                    width: '100%'
                  }}>
                  <Input
                    onChange={(event) => {
                      setRefundAddress(event.target.value.trim());
                    }}
                    value={refundAddress}
                    placeholder={'Refund Address'}
                    disableUnderline
                    sx={{
                      color: colors.white,
                      fontSize: '12px',
                      textAlign: 'left',
                      bgcolor: 'transparent',
                      p: '0',
                      width: '100%',
                      height: '20px',
                      border: 'none',
                      outline: 'none'
                    }}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    style={{
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      setRefundAddress('');
                    }}>
                    <g clipPath="url(#clip0_8078_5541)">
                      <path
                        d="M1.91732 12.0771C1.94795 11.8015 1.96326 11.6636 2.00497 11.5348C2.04197 11.4205 2.09425 11.3117 2.16038 11.2114C2.23493 11.0984 2.33299 11.0003 2.52911 10.8042L11.3333 2.00004C12.0697 1.26366 13.2636 1.26366 14 2.00004C14.7364 2.73642 14.7364 3.93033 14 4.66671L5.19578 13.4709C4.99966 13.667 4.9016 13.7651 4.78855 13.8396C4.68826 13.9058 4.57949 13.958 4.46519 13.995C4.33636 14.0367 4.19853 14.0521 3.92287 14.0827L1.66663 14.3334L1.91732 12.0771Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_8078_5541">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </Stack>
                <Box
                  sx={{
                    width: '100%',
                    height: '1px',
                    bgcolor: colors.white1,
                    my: '12px'
                  }}
                />
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: colors.grey12
                  }}>
                  By signing, you agree that your collateral can only be used for liquidation under the specified
                  conditions above. Otherwise, no other party can move your funds.
                </Typography>
              </Column>

              <Row fullX mt="md">
                <Button
                  disabled={disabled}
                  onClick={async () => {
                    if (!liquidationEvent) return;

                    await approveLoan({
                      loanId,
                      borrowAmount: {
                        amount: borrowAmount,
                        denom: poolTokenDenom
                      },
                      collateralAmount: {
                        amount: collateralAmount,
                        denom: 'sat'
                      },
                      liquidationEvent: liquidationEvent,
                      feeRate,
                      refundAddress: refundAddress || currentAccount.address
                    });
                  }}
                  full
                  loading={loading}
                  text="Authorize"
                  preset="primary"></Button>
              </Row>
            </Column>
          </Content>
          <Footer px="zero" py="zero">
            <NavTabBar tab="loans" />
          </Footer>
        </>
      )}
    </Layout>
  );
}
