import { useRef, useState } from 'react';
import 'swiper/css';

import { NetworkType } from '@/shared/types';
import { Button, Column, Content, Footer, Layout, LightTooltip, Row, SuccessAnimation, Text } from '@/ui/components';
import { NavTabBar } from '@/ui/components/NavTabBar';
import { useApproveLoan, useGetLiquidationPrice, useGetLoanById, useGetPoolsData } from '@/ui/hooks/lending';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import MainHeader from '@/ui/pages/Main/MainHeader';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useLendingState } from '@/ui/state/lending/hook';
import { useNetworkType } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { formatUnitAmount, getTruncate, useLocationState } from '@/ui/utils';
import { formatTimeWithUTC } from '@/ui/utils/formatter';
import { Input, Stack, Typography } from '@mui/material';

import { useNavigate } from '../MainRoute';

export interface LoanAuthorizeLocationState {
  loanId: string;
  borrowAmount: string;
  collateralAmount: string;
  feeRate: number;
  from?: string;
}

export default function LoanAuthorizeScreen() {
  const { loanId, feeRate, borrowAmount, collateralAmount, from } = useLocationState<LoanAuthorizeLocationState>();
  const currentAccount = useCurrentAccount();
  const networkType = useNetworkType();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditRefundAddress, setIsEditRefundAddress] = useState(false);
  const [editRefundAddressError, setEditRefundAddressError] = useState('');

  const { balanceList } = useGetSideBalanceList(currentAccount?.address);

  const { loan } = useGetLoanById({ loanId });

  const { approveLoan, loading, tx } = useApproveLoan(loan?.loan);

  const { poolTokenDenom } = useLendingState();

  const [refundAddress, setRefundAddress] = useState(currentAccount.address);

  const { data: poolsData } = useGetPoolsData();
  const poolTokenBalance = balanceList.find((b) => b.denom == poolTokenDenom);

  const poolData = poolsData.find((p) => p.token.denom === poolTokenBalance?.denom);

  const { liquidationPrice } = useGetLiquidationPrice({
    bitcoinAmount: formatUnitAmount(collateralAmount, 8),
    borrowToken: poolData?.token,
    borrowTokenAmount: formatUnitAmount(borrowAmount, poolData?.token.asset.exponent || 6),
    poolId: poolData?.baseData.id || '',
    maturity: loan?.loan.maturity
  });

  const data = [
    {
      label: `Liquidation Price (${liquidationPrice?.pair})`,
      value: liquidationPrice ? getTruncate(liquidationPrice?.price || '0', 8) : '-',
      tip: 'Liquidation price is calculated based on your total collateral deposited before Step 2 (Authorization). Additional deposits made after Step 2 will not change your liquidation price.',
      valueTip: 'Price will update if multiple deposits are detected. Please wait.'
    },
    {
      label: 'Maturity Time',
      tip: 'The time when your loan term ends and repayment is due. If not repaid by this date, your collateral will be liquidated',
      value: !loan ? '-' : formatTimeWithUTC(+loan.loan.maturity_time * 1000)
    }
  ];

  const disabled = loading || !loanId || !borrowAmount || !collateralAmount || isEditRefundAddress;

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
                loan_id: loanId,
                from
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
                  <Stack
                    key={item.label}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      p: '16px',
                      borderRadius: '10px',
                      bgcolor: colors.card_bgColor
                    }}>
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
                          color: colors.white,
                          textDecoration: item.valueTip ? 'dotted underline' : 'none',
                          textUnderlineOffset: '2px',
                          cursor: item.valueTip ? 'pointer' : 'default'
                        }}>
                        {item.value}
                      </Typography>
                    </LightTooltip>
                  </Stack>
                ))}

                <Stack
                  sx={{
                    p: '16px',
                    borderRadius: '10px',
                    bgcolor: colors.card_bgColor
                  }}>
                  <LightTooltip
                    title={'The Bitcoin address where your collateral will be returned once the loan is fully repaid'}
                    arrow
                    placement="top">
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
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      py: '12px',
                      px: '12px',
                      borderRadius: '10px',
                      width: '100%',
                      mt: '8px',
                      border: `1px solid ${colors.white20}`,
                      transition: '.4s',
                      ':hover': {
                        border: `1px solid ${colors.white_4}`
                      }
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
                        width: '250px',
                        height: '20px',
                        border: 'none',
                        outline: 'none',
                        input: {
                          '&:disabled': {
                            WebkitTextFillColor: colors.grey12
                          }
                        }
                      }}
                    />
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        cursor: 'pointer',
                        svg: {
                          path: {
                            stroke: colors.grey12,
                            transition: '.4s'
                          }
                        },
                        ':hover': {
                          svg: {
                            path: {
                              stroke: colors.white
                            }
                          }
                        }
                      }}>
                      {isEditRefundAddress ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 18 18"
                          fill="none"
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
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 20 20"
                          fill="none"
                          onClick={() => {
                            if (loading) return;
                            setIsEditRefundAddress(true);
                            setTimeout(() => {
                              inputRef.current?.focus();
                            }, 100);
                          }}>
                          <path
                            d="M9.16797 3.33332L3.33464 3.33332C2.89261 3.33332 2.46868 3.50891 2.15612 3.82147C1.84356 4.13403 1.66797 4.55796 1.66797 4.99999L1.66797 16.6667C1.66797 17.1087 1.84356 17.5326 2.15612 17.8452C2.46868 18.1577 2.89261 18.3333 3.33464 18.3333L15.0013 18.3333C15.4433 18.3333 15.8673 18.1577 16.1798 17.8452C16.4924 17.5326 16.668 17.1087 16.668 16.6667L16.668 10.8333M15.418 2.08332C15.7495 1.7518 16.1991 1.56555 16.668 1.56555C17.1368 1.56555 17.5864 1.7518 17.918 2.08332C18.2495 2.41484 18.4357 2.86448 18.4357 3.33332C18.4357 3.80216 18.2495 4.2518 17.918 4.58332L10.0013 12.5L6.66797 13.3333L7.5013 9.99999L15.418 2.08332Z"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </Stack>
                  </Stack>
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
              </Column>

              <Row fullX mt="md">
                <Button
                  disabled={disabled}
                  onClick={async () => {
                    await approveLoan({
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
