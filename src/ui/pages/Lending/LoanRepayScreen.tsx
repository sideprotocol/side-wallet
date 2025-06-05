import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

import { Button, Column, Content, Header, Image, Layout, LightTooltip, SuccessAnimation } from '@/ui/components';
import useGetBitcoinBalanceList from '@/ui/hooks/useGetBitcoinBalanceList';
import useGetLoanCurrentInterest from '@/ui/hooks/useGetLoanCurrentInterest';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import useRepay from '@/ui/hooks/useRepay';
import services from '@/ui/services';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { colors } from '@/ui/theme/colors';
import { formatUnitAmount, getTruncate } from '@/ui/utils';
import { formatTimeWithUTC } from '@/ui/utils/formatter';
import { Box, Stack, Typography } from '@mui/material';

export default function RepayLoanScreen() {
  const currentAccount = useCurrentAccount();
  const { state } = useLocation();
  const { loan_id } = state as { loan_id: string };

  const { sideChain } = useEnvironment();
  const { balanceList: sideBalanceList } = useGetSideBalanceList(currentAccount?.address);
  const { balanceList: bitcoinBalanceList } = useGetBitcoinBalanceList(currentAccount?.address);

  const { data } = useQuery({
    queryKey: ['getLoanById', { loan_id }],
    queryFn: async () => {
      return services.lending.getLoanById(loan_id!, { baseURL: sideChain.restUrl });
    },
    refetchInterval: (data) => {
      return data?.loan.status === 'Closed' ? false : 30000;
    },
    refetchIntervalInBackground: true
  });
  const loan = data?.loan;
  const { data: realTimeInterest } = useGetLoanCurrentInterest({
    loan_id: loan?.vault_address,
    loanStatus: loan?.status
  });
  const borrowToken = sideBalanceList.find((o) => o.denom === loan?.borrow_amount.denom);
  const collateralToken = bitcoinBalanceList.find((item) => item.denom === 'sat');
  const { repay, tx, loading } = useRepay();
  if (!loan) return null;

  const noEnabled = new BigNumber(dayjs().unix()).minus(dayjs(loan.create_at).unix()).lt(loan.min_maturity);
  const earliestRepayTime = new BigNumber(dayjs(loan.create_at).unix())
    .plus(loan.min_maturity)
    .multipliedBy(1000)
    .toNumber();
  const list = [
    {
      label: 'Principal',
      value: (
        <>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 500,
              color: colors.white
            }}>
            {getTruncate(
              formatUnitAmount(loan.borrow_amount.amount, borrowToken?.asset.exponent || 6),
              borrowToken?.asset.precision || 6
            )}
          </Typography>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 500,
              color: colors.grey12
            }}>
            {borrowToken?.asset.symbol}
          </Typography>
        </>
      )
    },
    {
      label: 'Accrued Interest',
      value: (
        <>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 500,
              color: colors.white
            }}>
            {getTruncate(
              formatUnitAmount(realTimeInterest?.interest.amount || '0', borrowToken?.asset.exponent || 6),
              borrowToken?.asset.precision || 6
            )}
          </Typography>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 500,
              color: colors.grey12
            }}>
            {borrowToken?.asset.symbol}
          </Typography>
        </>
      ),
      tip: 'The interest accumulated so far'
    },
    {
      label: 'You will receive',
      value: (
        <>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 500,
              color: colors.white
            }}>
            {getTruncate(
              formatUnitAmount(loan?.collateral_amount || '0', collateralToken?.asset.exponent || 6),
              collateralToken?.asset.precision || 6
            )}
          </Typography>
          <Image
            src={collateralToken?.asset.logo}
            size={16}
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%'
            }}
          />
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 500,
              color: colors.grey12
            }}>
            {collateralToken?.asset.symbol}
          </Typography>
        </>
      ),
      tip: 'The amount of collateral you’ll receive back after repaying your loan'
    }
  ];

  return (
    <Layout>
      <Header
        title="Repay Loan"
        onBack={() => {
          window.history.go(-1);
        }}
      />
      <Content
        style={{
          padding: '0 16px 70px',
          marginTop: 16
        }}>
        <Column gap="lg">
          {tx ? (
            <>
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
                  Loan Repaid
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
                  Your BTC has been unlocked and will be sent to your wallet shortly.
                </Typography>
              </Stack>
            </>
          ) : (
            <>
              <Stack
                alignItems="center"
                sx={{
                  mt: '100px'
                }}>
                <Box
                  sx={{ position: 'relative', width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden' }}>
                  <Box
                    className={loading ? 'animate-[spin_3s_linear_infinite]' : ''}
                    sx={{
                      position: 'absolute',
                      left: '0',
                      right: '0',
                      top: '0',
                      bottom: '0',
                      bgcolor: colors.black
                    }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="36"
                      height="71"
                      viewBox="0 0 36 71"
                      fill="none"
                      style={{
                        display: loading ? 'block' : 'none',
                        position: 'absolute',
                        right: '0',
                        top: '0'
                      }}>
                      <path
                        d="M32.8012 50.7195C31.157 57.283 27.8769 63.3143 23.277 68.2554C22.739 68.8333 21.8316 68.8316 21.2732 68.2732V68.2732C20.7149 67.7149 20.7171 66.8114 21.2536 66.2319C25.4881 61.6582 28.509 56.0858 30.0273 50.0247C31.6615 43.5007 31.4935 36.6553 29.5413 30.2193C27.5891 23.7833 23.9259 17.9982 18.9427 13.4814C14.313 9.28516 8.70554 6.32999 2.64364 4.87942C1.87567 4.69564 1.37187 3.94565 1.52595 3.17117V3.17117C1.68003 2.39669 2.43354 1.89119 3.20202 2.07285C9.77172 3.62582 15.8498 6.81858 20.8631 11.3626C26.23 16.2272 30.1753 22.4577 32.2778 29.3893C34.3803 36.3208 34.5612 43.6932 32.8012 50.7195Z"
                        stroke="url(#paint0_linear_22551_17983)"
                        strokeWidth="3"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_22551_17983"
                          x1="21.5"
                          y1="71.5"
                          x2="-6"
                          y2="1"
                          gradientUnits="userSpaceOnUse">
                          <stop stopColor="#F7771A" />
                          <stop offset="1" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </Box>
                  <Image
                    src={borrowToken?.asset.logo}
                    size={70}
                    style={{
                      position: 'absolute',
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    mt: '15px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: colors.grey12
                  }}>
                  Total Due
                </Typography>
                <Typography
                  sx={{
                    fontSize: '20px',
                    fontWeight: 600,
                    lineHeight: '23px',
                    color: colors.white
                  }}>
                  {getTruncate(
                    formatUnitAmount(
                      new BigNumber(loan.borrow_amount.amount).plus(realTimeInterest?.interest.amount || 0).toString(),
                      borrowToken?.asset.exponent || 6
                    ),
                    borrowToken?.asset.precision || 6
                  )}
                </Typography>
              </Stack>
              <Box
                sx={{
                  p: '16px',
                  mt: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                {list.map((item, index) => (
                  <Stack key={index} direction="row" justifyContent="space-between" alignItems="center">
                    <LightTooltip title={item.tip} arrow placement="top">
                      <Typography
                        sx={{
                          fontSize: '14px',
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
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      alignItems="center"
                      gap="8px"
                      sx={{
                        fontSize: '14px',
                        color: colors.white
                      }}>
                      {item.value}
                    </Stack>
                  </Stack>
                ))}
              </Box>
            </>
          )}
          {tx ? (
            <Button
              preset="primary"
              style={{
                marginTop: '32px'
              }}
              onClick={() => {
                window.history.go(-1);
              }}>
              Close
            </Button>
          ) : noEnabled ? (
            <Box
              sx={{
                p: '16px',
                width: '100%',
                bgcolor: colors.card_bgColor
              }}>
              <Typography
                sx={{
                  fontSize: '12px',
                  color: colors.grey12,
                  textAlign: 'center'
                }}>
                Repay Available After:
              </Typography>
              <Typography
                sx={{
                  fontSize: '12px',
                  color: colors.main,
                  textAlign: 'center'
                }}>
                {formatTimeWithUTC(earliestRepayTime)}
              </Typography>
            </Box>
          ) : (
            <Button
              preset="primary"
              disabled={loading}
              onClick={() => {
                repay({ loan_id: loan.vault_address });
              }}>
              Repay
            </Button>
          )}
        </Column>
      </Content>
    </Layout>
  );
}
