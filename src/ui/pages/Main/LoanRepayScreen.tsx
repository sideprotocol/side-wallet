import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

import { Button, Column, Content, Header, Image, Layout } from '@/ui/components';
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
  const { repay, loading, tx } = useRepay();
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
      )
    },
    {
      label: 'Accrued Interest',
      value: (
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
      )
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
        </>
      )
    }
  ];

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Repay Loan"
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
                    <Stack
                      direction="row"
                      sx={{
                        fontSize: '14px',
                        color: colors.grey12
                      }}>
                      {item.label}
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems="center"
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
