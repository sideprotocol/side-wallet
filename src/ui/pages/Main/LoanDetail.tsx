import BigNumber from 'bignumber.js';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

import { Button, Column, Content, CopyIcon, Header, Layout, LightTooltip, Row, Text } from '@/ui/components';
import useGetBitcoinBalanceList from '@/ui/hooks/useGetBitcoinBalanceList';
import useGetDepositTx from '@/ui/hooks/useGetDepositTx';
import useGetDlcMeta from '@/ui/hooks/useGetDlcMeta';
import useGetLiquidationById from '@/ui/hooks/useGetLiquidationById';
import useGetLiquidationEvent from '@/ui/hooks/useGetLiquidationEvent';
import useGetLiquidationParams from '@/ui/hooks/useGetLiquidationParams';
import useGetLoanCurrentInterest from '@/ui/hooks/useGetLoanCurrentInterest';
import useGetPoolDataById from '@/ui/hooks/useGetPoolDataById';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import services from '@/ui/services';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useUiTxCreateScreen } from '@/ui/state/ui/hooks';
import { colors } from '@/ui/theme/colors';
import { formatUnitAmount, getTruncate } from '@/ui/utils';
import { formatAddress } from '@/ui/utils/format';
import { formatTimeWithUTC } from '@/ui/utils/formatter';
import { Box, Stack, Typography } from '@mui/material';

import { useNavigate } from '../MainRoute';
import { HealthFactor, LoanLTV } from './MyLoans';

export default function LoanDetailScreen() {
  const navigate = useNavigate();
  const currentAccount = useCurrentAccount();
  const { state } = useLocation();
  const { loan_id } = state as { loan_id: string };

  const { sideChain, SERVICE_BASE_URL, SIDE_BTC_EXPLORER, SIDE_STATION_URL } = useEnvironment();
  const { balanceList: sideBalanceList } = useGetSideBalanceList(currentAccount?.address);
  const { balanceList: bitcoinBalanceList } = useGetBitcoinBalanceList(currentAccount?.address);

  const { data: loanDetailCex } = useQuery({
    queryKey: ['getLoanByIdCex', { loan_id }],
    queryFn: async () => {
      return services.lending.getLoanByIdCex({ vaultAddress: loan_id }, { baseURL: SERVICE_BASE_URL });
    },
    enabled: !!loan_id,
    refetchInterval: 60000,
    refetchIntervalInBackground: true
  });

  const { data } = useQuery({
    queryKey: ['getLoanById', { loan_id }],
    queryFn: async () => {
      const result = await services.lending.getLoanById(loan_id!, { baseURL: sideChain.restUrl });
      return {
        loan: {
          ...result.loan,
          collateral_amount: `${loanDetailCex!.expectedCollateralAmount || loanDetailCex!.collateralAmount}`
        }
      };
    },
    refetchInterval: (data) => {
      return data?.loan.status === 'Closed' ? false : 30000;
    },
    refetchIntervalInBackground: true,
    enabled: !!loanDetailCex
  });
  const loan = data?.loan;
  const { data: lendingPool } = useGetPoolDataById({ poolId: loan?.pool_id });
  const { data: realTimeInterest } = useGetLoanCurrentInterest({
    loan_id: loan?.vault_address,
    loanStatus: loan?.status
  });
  const { data: liquidationParams } = useGetLiquidationParams();
  const { data: liquidation } = useGetLiquidationById({
    liquidation_id: loan?.liquidation_id,
    enabled: loan?.status === 'Liquidated'
  });

  const { dlcMetaData } = useGetDlcMeta(loan?.vault_address);
  const { depositTxs } = useGetDepositTx(loan?.vault_address || '', loan?.collateral_amount || '0');

  const borrowToken = sideBalanceList.find((o) => o.denom === loan?.borrow_amount.denom);
  const collateralToken = bitcoinBalanceList.find((item) => item.denom === 'sat');
  const collateralAmount = formatUnitAmount(loan?.collateral_amount || '0', collateralToken?.asset.exponent || 8);
  const borrowTokenAmount = formatUnitAmount(loan?.borrow_amount.amount || '0', borrowToken?.asset.exponent || 6);

  const { liquidationEvent } = useGetLiquidationEvent({
    bitcoinAmount: collateralAmount,
    borrowToken,
    borrowTokenAmount,
    poolId: loan?.pool_id || '',
    maturity: loan?.maturity
  });

  const uiState = useUiTxCreateScreen();

  const feeRate = uiState.feeRate;

  if (!loan) return null;
  const dataCollateral = [
    {
      label: 'Amount',
      value: (
        <>
          <Text
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: colors.white
            }}>
            {collateralAmount}
          </Text>
          <Text
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: colors.grey12
            }}>
            {collateralToken?.asset.symbol} (Bitcoin)
          </Text>
        </>
      ),
      tip: 'xxx'
    },
    {
      label: 'Vault',
      value: (
        <Typography
          sx={{
            fontSize: '12px',
            fontWeight: 500,
            color: colors.white,
            cursor: 'pointer',
            ':hover': {
              color: colors.main
            }
          }}
          onClick={() => {
            window.open(`${SIDE_BTC_EXPLORER}/address/${loan.vault_address}`);
          }}>
          {formatAddress(loan.vault_address, 6)}
        </Typography>
      ),
      tip: 'xxx'
    },
    {
      label: 'Deposit Tx',
      value: (
        <Box>
          {loan.authorizations[0] ? (
            (loan.authorizations[0]?.deposit_txs || [])?.map((tx, index) => (
              <Typography
                key={index}
                sx={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: colors.white,
                  cursor: 'pointer',
                  ':hover': {
                    color: colors.main
                  }
                }}
                onClick={() => {
                  window.open(`${SIDE_BTC_EXPLORER}/tx/${tx}`);
                }}>
                {formatAddress(tx, 6)}
              </Typography>
            ))
          ) : (
            <Typography sx={{ fontSize: '12px', fontWeight: 500, color: colors.white }}>-</Typography>
          )}
        </Box>
      ),
      tip: 'xxx'
    },
    {
      label: 'Withdraw Tx',
      value: (
        <Typography
          sx={{
            fontSize: '12px',
            fontWeight: 500,
            color: colors.white,
            cursor: 'pointer',
            ':hover': {
              color: colors.main
            }
          }}
          onClick={() => {
            if (loan.status === 'Liquidated') return;
            window.open(`${SIDE_BTC_EXPLORER}/tx/${loanDetailCex?.returnBtcTxhash}`);
          }}>
          {loan.status !== 'Liquidated' ? formatAddress(loanDetailCex?.returnBtcTxhash || '', 6) : '-'}
        </Typography>
      ),
      tip: 'xxx'
    },
    {
      label: 'Unilateral Exit After',
      value: (
        <Text
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: colors.white
          }}>
          {formatTimeWithUTC(+loan.final_timeout * 1000)}
        </Text>
      ),
      tip: 'xxx'
    }
  ];

  const dataLoan = [
    {
      label: 'Amount',
      value: (
        <>
          <Text
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: colors.white
            }}>
            {borrowTokenAmount}
          </Text>
          <Text
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: colors.grey12
            }}>
            {borrowToken?.asset.symbol} ({sideChain.name})
          </Text>
        </>
      ),
      tip: 'xxx'
    },
    {
      label: 'Maturity Time',
      value: (
        <Text
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: colors.white
          }}>
          {formatTimeWithUTC(+loan.maturity_time * 1000)}
        </Text>
      ),
      tip: 'xxx'
    },
    {
      label: 'Accrued Interest',
      value: (
        <Text
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: colors.white
          }}>
          {getTruncate(
            formatUnitAmount(
              `${loanDetailCex?.actualInterest || realTimeInterest?.interest.amount || 0}`,
              borrowToken?.asset.exponent || 6
            ),
            borrowToken?.asset.precision || 6
          )}
        </Text>
      ),
      tip: 'xxx'
    },
    {
      label: 'Max Interest',
      value: (
        <Text
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: colors.white
          }}>
          {getTruncate(
            formatUnitAmount(loan.interest, borrowToken?.asset.exponent || 6),
            borrowToken?.asset.precision || 6
          )}
        </Text>
      ),
      tip: 'xxx'
    },
    {
      label: 'Disburse Tx',
      value: (
        <Typography
          sx={{
            fontSize: '12px',
            fontWeight: 500,
            color: colors.white,
            cursor: 'pointer',
            ':hover': {
              color: colors.main
            }
          }}
          onClick={() => {
            window.open(`${sideChain.explorerUrl}/tx/${loanDetailCex?.disbursementTxhash || ''}`);
          }}>
          {formatAddress(loanDetailCex?.disbursementTxhash || '', 6)}
        </Typography>
      ),
      tip: 'xxx'
    },
    {
      label: 'Repay Tx',
      value: (
        <Typography
          sx={{
            fontSize: '12px',
            fontWeight: 500,
            color: colors.white,
            cursor: 'pointer',
            ':hover': {
              color: colors.main
            }
          }}
          onClick={() => {
            window.open(`${sideChain.explorerUrl}/tx/${loanDetailCex?.repaymentTxhash || ''}`);
          }}>
          {formatAddress(loanDetailCex?.repaymentTxhash || '', 6)}
        </Typography>
      ),
      tip: 'xxx'
    }
  ];

  const dataLiquidation = [
    {
      label: 'Liquidation Price',
      value: (
        <Text
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: colors.main
          }}>
          {loan.status === 'Requested' ? '-' : getTruncate(loan.liquidation_price || liquidationEvent?.price || '0', 2)}
        </Text>
      ),
      tip: 'xxx'
    },
    {
      label: 'Health Factor',
      value: <HealthFactor loan={loan} />,
      tip: 'xxx'
    },
    {
      label: 'Current LTV',
      value: <LoanLTV loan={loan} sx={{ fontSize: '12px', fontWeight: 500 }} />,
      tip: 'xxx'
    },
    {
      label: 'Liquidation LTV',
      value: (
        <Text
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: colors.white
          }}>
          {`${lendingPool?.pool?.config?.liquidation_threshold || '-'}%`}
        </Text>
      ),
      tip: 'xxx'
    },
    {
      label: 'Liquidation Penalty',
      value: (
        <Text
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: colors.white
          }}>
          {`${(liquidationParams?.params.liquidation_bonus_factor || 0) / 10}%`}
        </Text>
      ),
      tip: 'xxx'
    },

    {
      label: 'Liquidated Collateral',
      value: (
        <Text
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: colors.white
          }}>
          {!liquidation?.liquidation.liquidated_collateral_amount
            ? '-'
            : formatUnitAmount(
                liquidation?.liquidation.liquidated_collateral_amount.amount || '0',
                collateralToken?.asset?.exponent || 6
              )}
        </Text>
      ),
      tip: 'xxx'
    },
    {
      label: 'Unliquidated Collateral',
      value: (
        <Text
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: colors.white
          }}>
          {!liquidation?.liquidation.liquidated_collateral_amount
            ? '-'
            : formatUnitAmount(
                BigNumber(liquidation?.liquidation.unliquidated_collateral_amount.amount || '0').toFixed(),
                collateralToken?.asset?.exponent || 6
              )}
        </Text>
      ),
      tip: 'xxx'
    },
    {
      label: 'Liquidation ID',
      value: (
        <Text
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: colors.white
          }}>
          {liquidation?.liquidation.id || '-'}
        </Text>
      ),
      tip: 'xxx'
    }
  ];
  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Loan Detail"
      />
      <Content
        style={{
          padding: '0 16px 70px',
          marginTop: 16
        }}>
        <Column gap={'md'}>
          <Row justifyCenter>
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                bgcolor: colors.card_bgColor,
                borderRadius: '100px',
                padding: '4px 10px',
                p: {}
              }}>
              <Typography
                sx={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: colors.grey12
                }}>
                Loan ID:&nbsp;
              </Typography>
              <Typography
                sx={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: colors.grey12,
                  maxWidth: '160px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: '.4s',
                  ':hover': {
                    color: colors.main
                  }
                }}
                onClick={() => {
                  window.open(`${SIDE_STATION_URL}/loan/${loan.vault_address}`);
                }}>
                {loan.vault_address}
              </Typography>
              <CopyIcon text={loan.vault_address} onlyIcon size={12} />
            </Stack>
          </Row>
          <Row itemsCenter>
            <Text
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: colors.white
              }}>
              Collateral
            </Text>
            <Box
              sx={{
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                backgroundColor: colors.card_bgColor,
                color: colors.grey64
              }}>
              {loan.status === 'Repaid'
                ? 'Returning'
                : loan.status === 'Closed'
                ? 'Returned'
                : dlcMetaData?.dlc_meta?.liquidation_cet?.borrower_adaptor_signatures &&
                  dlcMetaData?.dlc_meta?.liquidation_cet?.borrower_adaptor_signatures?.length > 0
                ? 'Authorized'
                : depositTxs?.length
                ? 'Deposited'
                : 'Request'}
            </Box>
          </Row>
          {dataCollateral.map((item, index) => {
            return (
              <Row key={index} full justifyBetween itemsCenter>
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
                <Row
                  justifyEnd
                  itemsCenter
                  style={{
                    gap: '2px'
                  }}>
                  {item.value}
                </Row>
              </Row>
            );
          })}
          <Box
            sx={{
              height: '1px',
              backgroundColor: colors.black_dark,
              my: '16px'
            }}
          />
          <Row itemsCenter>
            <Text
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: colors.white
              }}>
              Loan
            </Text>
            {loan.status === 'Requested' &&
            dlcMetaData?.dlc_meta?.liquidation_cet?.borrower_adaptor_signatures &&
            dlcMetaData?.dlc_meta?.liquidation_cet?.borrower_adaptor_signatures?.length > 0 ? (
              <Stack
                direction="row"
                alignItems="center"
                sx={{
                  bgcolor: colors.white1,
                  padding: '4px 8px',
                  borderRadius: '4px'
                }}>
                <Typography
                  sx={{
                    fontSize: '10px',
                    color: colors.white,
                    fontWeight: 500,
                    whiteSpace: 'nowrap'
                  }}>
                  Processing
                </Typography>
                <svg
                  className="animate-[spin_3s_linear_infinite] inline-block ml-1"
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.5 2V3.66667M8.5 12.5V15.1667M4.33333 8.5H2M14.6667 8.5H13.6667M12.8047 12.8047L12.3333 12.3333M12.9428 4.11052L12 5.05333M3.78105 13.219L5.66667 11.3333M3.91912 3.97245L5.33333 5.38667"
                    stroke={colors.grey12}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Stack>
            ) : loan.status === 'Open' ? (
              <Box
                sx={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  backgroundColor: colors.card_bgColor,
                  color: colors.grey64
                }}>
                Disbursed
              </Box>
            ) : ['Repaid', 'Closed'].includes(loan.status) ? (
              <Box
                sx={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  backgroundColor: colors.card_bgColor,
                  color: colors.grey64
                }}>
                Repaid
              </Box>
            ) : null}
          </Row>
          {dataLoan.map((item, index) => {
            return (
              <Row key={index} full justifyBetween itemsCenter>
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
                <Row
                  justifyEnd
                  itemsCenter
                  style={{
                    gap: '2px'
                  }}>
                  {item.value}
                </Row>
              </Row>
            );
          })}
          <Box
            sx={{
              height: '1px',
              backgroundColor: colors.black_dark,
              my: '16px'
            }}
          />
          <Row itemsCenter>
            <Text
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: colors.white
              }}>
              Liquidation
            </Text>
          </Row>
          {dataLiquidation.map((item, index) => {
            return (
              <Row key={index} full justifyBetween itemsCenter>
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
                <Row
                  justifyEnd
                  itemsCenter
                  style={{
                    gap: '2px'
                  }}>
                  {item.value}
                </Row>
              </Row>
            );
          })}
          <Box
            sx={{
              height: '1px',
              backgroundColor: colors.black_dark,
              my: '16px'
            }}
          />
        </Column>
      </Content>
      {!depositTxs?.length && loan.status === 'Requested' ? (
        <Button
          preset="primary"
          style={{ position: 'fixed', bottom: 16, left: 16, right: 16 }}
          onClick={() => {
            navigate('LoanDepositScreen', {
              borrowAmount: loan.borrow_amount.amount,
              collateralAmount: loan.collateral_amount || '0',
              liquidationEvent,
              loanId: loan.vault_address
            });
          }}>
          Deposit
        </Button>
      ) : depositTxs?.length && loan.status === 'Requested' ? (
        <Button
          preset="primary"
          style={{ position: 'fixed', bottom: 16, left: 16, right: 16 }}
          onClick={() => {
            navigate('LoanAuthorizeScreen', {
              loanId: loan.vault_address,
              borrowAmount: loan.borrow_amount.amount,
              collateralAmount: loan.collateral_amount || '0',
              feeRate,
              liquidationEvent,
              isWalletDeposit: true
            });
          }}>
          Authorize
        </Button>
      ) : loan.status === 'Open' ? (
        <Button
          preset="primary"
          style={{ position: 'fixed', bottom: 16, left: 16, right: 16 }}
          onClick={() => {
            navigate('LoanRepayScreen', { loan_id: loan.vault_address });
          }}>
          Repay
        </Button>
      ) : null}
    </Layout>
  );
}
