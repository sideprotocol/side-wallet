import { useRef, useState } from 'react';
import 'swiper/css';

import { NetworkType } from '@/shared/types';
import { Button, Column, Content, Footer, Layout, LightTooltip, Row, Text } from '@/ui/components';
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
import { useNetworkType } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { getTruncate, satoshisToAmount, useLocationState } from '@/ui/utils';
import { formatTimeWithUTC, toReadableAmount } from '@/ui/utils/formatter';
import { Box, Input, Stack, Typography } from '@mui/material';

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
  const networkType = useNetworkType();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditRefundAddress, setIsEditRefundAddress] = useState(false);
  const [editRefundAddressError, setEditRefundAddressError] = useState('');

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
      tip: 'xxx',
      valueTip: 'Price will update if multiple deposits are detected. Please wait.'
    },
    {
      label: 'Maturity Date',
      tip: 'xxx',
      value: !loan ? '-' : formatTimeWithUTC(+loan.loan.maturity_time * 1000)
    }
  ];

  const disabled = loading || !loanId || !borrowAmount || !collateralAmount || !liquidationEvent || isEditRefundAddress;

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
            onClick={() => {
              window.history.go(-3);
            }}>
            Close
          </Button>
        </Content>
      ) : (
        <>
          <MainHeader title={''} />
          <Content gap="lg" mt="lg">
            <Row justifyCenter>
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
                flexShrink: 0,
                position: 'relative',
                borderRadius: '10px',
                height: '6px'
              }}>
              <Row
                bg="main"
                fullY
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  borderRadius: '10px',
                  width: '100%',
                  height: '100%'
                }}
              />
            </Row>

            <Column itemsCenter gap="xl" mt="lg">
              <Column fullX gap="md">
                {data.map((item) => (
                  <Stack key={item.label} direction="row" justifyContent="space-between" alignItems="center">
                    <LightTooltip title={item.tip} arrow placement="top">
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
                    <LightTooltip title={item.valueTip} arrow placement="top">
                      <Typography
                        sx={{
                          fontSize: '12px',
                          fontWeight: 600,
                          color: colors.main,
                          textDecoration: item.valueTip ? 'dotted underline' : 'none',
                          textUnderlineOffset: '2px',
                          cursor: item.valueTip ? 'pointer' : 'default'
                        }}>
                        {item.value}
                      </Typography>
                    </LightTooltip>
                  </Stack>
                ))}

                <Stack direction="row">
                  <LightTooltip title={'xxx'} arrow placement="top">
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
                      Collateral Refund Address
                    </Typography>
                  </LightTooltip>
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
                    width: '100%',
                    border: `1px solid ${isEditRefundAddress ? colors.white1 : colors.card_bgColor}`
                  }}>
                  <Input
                    onChange={(event) => {
                      setEditRefundAddressError('');
                      setRefundAddress(event.target.value.trim());
                    }}
                    onFocus={() => {
                      setIsEditRefundAddress(true);
                    }}
                    value={refundAddress}
                    disabled={!isEditRefundAddress}
                    inputRef={inputRef}
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
                      outline: 'none',
                      input: {
                        '&:disabled': {
                          WebkitTextFillColor: colors.white
                        }
                      }
                    }}
                  />
                  {isEditRefundAddress ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      style={{
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        let regex = /^(tb|side)/;
                        if (networkType === NetworkType.MAINNET) {
                          regex = /^(bc|side)/;
                        }
                        if (!regex.test(refundAddress)) {
                          setEditRefundAddressError('Invalid address');
                          return;
                        }
                        setIsEditRefundAddress(false);
                      }}>
                      <path
                        d="M4.83333 1.5V4.33333C4.83333 4.80004 4.83333 5.0334 4.92416 5.21166C5.00406 5.36846 5.13154 5.49594 5.28834 5.57584C5.4666 5.66667 5.69996 5.66667 6.16667 5.66667H11.8333C12.3 5.66667 12.5334 5.66667 12.7117 5.57584C12.8685 5.49594 12.9959 5.36846 13.0758 5.21166C13.1667 5.0334 13.1667 4.80004 13.1667 4.33333V2.33333M13.1667 16.5V11.1667C13.1667 10.7 13.1667 10.4666 13.0758 10.2883C12.9959 10.1315 12.8685 10.0041 12.7117 9.92416C12.5334 9.83333 12.3 9.83333 11.8333 9.83333H6.16667C5.69996 9.83333 5.4666 9.83333 5.28834 9.92416C5.13154 10.0041 5.00406 10.1315 4.92416 10.2883C4.83333 10.4666 4.83333 10.7 4.83333 11.1667V16.5M16.5 6.77124V12.5C16.5 13.9001 16.5 14.6002 16.2275 15.135C15.9878 15.6054 15.6054 15.9878 15.135 16.2275C14.6002 16.5 13.9001 16.5 12.5 16.5H5.5C4.09987 16.5 3.3998 16.5 2.86502 16.2275C2.39462 15.9878 2.01217 15.6054 1.77248 15.135C1.5 14.6002 1.5 13.9001 1.5 12.5V5.5C1.5 4.09987 1.5 3.3998 1.77248 2.86502C2.01217 2.39462 2.39462 2.01217 2.86502 1.77248C3.3998 1.5 4.09987 1.5 5.5 1.5H11.2288C11.6364 1.5 11.8402 1.5 12.0321 1.54605C12.2021 1.58688 12.3647 1.65422 12.5138 1.7456C12.682 1.84867 12.8261 1.9928 13.1144 2.28105L15.719 4.88562C16.0072 5.17387 16.1513 5.318 16.2544 5.48619C16.3458 5.63531 16.4131 5.79789 16.4539 5.96795C16.5 6.15976 16.5 6.36358 16.5 6.77124Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      style={{
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        setIsEditRefundAddress(true);
                        setTimeout(() => {
                          inputRef.current?.focus();
                        }, 100);
                      }}>
                      <path
                        d="M9.16797 3.33332L3.33464 3.33332C2.89261 3.33332 2.46868 3.50891 2.15612 3.82147C1.84356 4.13403 1.66797 4.55796 1.66797 4.99999L1.66797 16.6667C1.66797 17.1087 1.84356 17.5326 2.15612 17.8452C2.46868 18.1577 2.89261 18.3333 3.33464 18.3333L15.0013 18.3333C15.4433 18.3333 15.8673 18.1577 16.1798 17.8452C16.4924 17.5326 16.668 17.1087 16.668 16.6667L16.668 10.8333M15.418 2.08332C15.7495 1.7518 16.1991 1.56555 16.668 1.56555C17.1368 1.56555 17.5864 1.7518 17.918 2.08332C18.2495 2.41484 18.4357 2.86448 18.4357 3.33332C18.4357 3.80216 18.2495 4.2518 17.918 4.58332L10.0013 12.5L6.66797 13.3333L7.5013 9.99999L15.418 2.08332Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </Stack>
                {editRefundAddressError && (
                  <Typography
                    sx={{
                      color: colors.red,
                      fontSize: '12px'
                    }}>
                    {editRefundAddressError}
                  </Typography>
                )}
                <Box
                  sx={{
                    width: '100%',
                    height: '1px',
                    bgcolor: colors.white1,
                    mt: '24px'
                  }}
                />
                <Stack
                  gap="4px"
                  sx={{
                    borderRadius: '10px',
                    bgcolor: colors.green_success15,
                    p: '16px'
                  }}>
                  <Stack direction="row" alignItems="center" gap="4px">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="22"
                      viewBox="0 0 18 22"
                      fill="none"
                      style={{
                        flexShrink: 0
                      }}>
                      <path
                        d="M8.30201 20.6149C8.5234 20.744 8.6341 20.8086 8.79032 20.8421C8.91156 20.8681 9.08844 20.8681 9.20968 20.8421C9.3659 20.8086 9.4766 20.744 9.69799 20.6149C11.646 19.4784 17 15.9084 17 11V6.21759C17 5.41808 17 5.01833 16.8692 4.6747C16.7537 4.37113 16.566 4.10027 16.3223 3.88552C16.0465 3.64243 15.6722 3.50207 14.9236 3.22134L9.5618 1.21067C9.3539 1.13271 9.24995 1.09373 9.14302 1.07827C9.04816 1.06457 8.95184 1.06457 8.85698 1.07827C8.75005 1.09373 8.6461 1.13271 8.4382 1.21067L3.0764 3.22134C2.3278 3.50207 1.9535 3.64243 1.67766 3.88552C1.43398 4.10027 1.24627 4.37113 1.13076 4.6747C1 5.01833 1 5.41808 1 6.21759V11C1 15.9084 6.35396 19.4784 8.30201 20.6149Z"
                        stroke="#48BB78"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <Typography
                      sx={{
                        color: colors.green,
                        fontSize: '12px',
                        fontWeight: 600,
                        whiteSpace: 'nowrap'
                      }}>
                      Securely Locked, Non-Custodial Collateral
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      color: colors.white
                    }}>
                    You’re about to sign a transaction authorizing your collateral to be used only for liquidation under
                    specific conditions. No other party can access your funds otherwise.
                  </Typography>
                </Stack>
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
