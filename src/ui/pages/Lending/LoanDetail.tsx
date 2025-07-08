import BigNumber from 'bignumber.js';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

import {
  Button,
  Column,
  Content,
  CopyIcon,
  Header,
  Layout,
  LightTooltip,
  Row,
  SuccessAnimation,
  Text
} from '@/ui/components';
import {
  useClaimCollateral,
  useGetBitcoinTxsConfirms,
  useGetDepositTx,
  useGetDlcMeta,
  useGetLiquidationById,
  useGetLiquidationParams,
  useGetLiquidationPrice,
  useGetLoanAuthorization,
  useGetLoanCurrentInterest,
  useGetPoolDataById
} from '@/ui/hooks/lending';
import useGetBitcoinBalanceList from '@/ui/hooks/useGetBitcoinBalanceList';
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
  const { loan_id, from } = state as { loan_id: string; from?: string };

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
    enabled: !!(loanDetailCex?.expectedCollateralAmount || loanDetailCex?.collateralAmount)
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

  const { depositTxs, txids } = useGetDepositTx(loan?.vault_address || '', loan?.collateral_amount || '0');

  const borrowToken = sideBalanceList.find((o) => o.denom === loan?.borrow_amount.denom);
  const collateralToken = bitcoinBalanceList.find((item) => item.denom === 'sat');
  const collateralAmount = formatUnitAmount(loan?.collateral_amount || '0', collateralToken?.asset.exponent || 8);
  const borrowTokenAmount = formatUnitAmount(loan?.borrow_amount.amount || '0', borrowToken?.asset.exponent || 6);

  const { liquidationPrice } = useGetLiquidationPrice({
    bitcoinAmount: collateralAmount,
    borrowToken,
    borrowTokenAmount,
    poolId: loan?.pool_id || '',
    maturity: loan?.maturity
  });

  const uiState = useUiTxCreateScreen();

  const feeRate = uiState.feeRate;

  const { dlcMetaData } = useGetDlcMeta(loan);

  const { canClaim, isRedeeming } = useGetLoanAuthorization(loan);
  const {
    claim,
    loading: claimLoading,
    tx
  } = useClaimCollateral(loan?.vault_address || '', loan?.collateral_amount || '0');

  const { txsConfirms } = useGetBitcoinTxsConfirms(txids);

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
      tip: 'The total amount of collateral you’ve locked'
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
      tip: 'The address of the non-custodial multisig (2-of-2) vault holding your collateral. Your key is required to authorize any spending, ensuring no one can move your funds without your approval'
    },
    {
      label: 'Lock Tx',

      value: (
        <>
          <Stack gap="4px">
            {(txsConfirms || [])?.map((item, index) => (
              <Stack key={index} direction="row" justifyContent="flex-end" alignItems="center" gap="4px">
                {item.confirms <= 6 && (
                  <Box
                    sx={{
                      fontSize: '10px',
                      p: '1px 6px',
                      borderRadius: '4px',
                      backgroundColor: colors.white1,
                      color: colors.white
                    }}>
                    {item.confirms > 0 ? `${item.confirms} Confirmed` : 'Unconfirmed'}
                  </Box>
                )}

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
                    window.open(`${SIDE_BTC_EXPLORER}/tx/${item.tx}`);
                  }}>
                  {formatAddress(item.tx, 6)}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </>
      ),
      tip: 'The Bitcoin transaction that deposited your collateral into the vault'
    },
    {
      label: 'Unlock Tx',
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
      tip: 'The Bitcoin transaction that returns your collateral'
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
      tip: 'The time after which you can reclaim your collateral unilaterally if the system is inactive'
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
      tip: 'The borrowed amount disbursed to you'
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
      tip: 'The date and time your loan must be repaid'
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
      tip: 'The interest accumulated so far'
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
      tip: 'The maximum interest that can be charged over the full loan term'
    },
    {
      label: 'Disburse Block',
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
            if (loanDetailCex?.disbursementBlockHeight) {
              window.open(`${sideChain?.explorerUrl}/block/${loanDetailCex?.disbursementBlockHeight}`);
            }
          }}>
          {loanDetailCex?.disbursementBlockHeight || '-'}
        </Typography>
      ),
      tip: 'The transaction (on Side Chain) that delivered the loan amount to your wallet'
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
      tip: 'The transaction (on Side Chain) you used to repay the loan'
    }
  ];

  const dataLiquidation = [
    {
      label: `Liquidation Price (${liquidationPrice?.pair})`,
      value: (
        <Text
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: colors.main
          }}>
          {loan.status === 'Requested' ? '-' : getTruncate(loan.liquidation_price || liquidationPrice?.price || '0', 8)}
        </Text>
      ),
      tip: 'The collateral price at which liquidation would be triggered'
    },
    {
      label: 'Health Factor',
      value: <HealthFactor loan={loan} />,
      tip: 'A measure of your loan safety. Liquidation may occur if it falls below 1.0'
    },
    {
      label: 'Current LTV',
      value: <LoanLTV loan={loan} sx={{ fontSize: '12px', fontWeight: 500 }} />,
      tip: 'The current loan-to-value ratio of your position'
    },
    {
      label: 'Liquidation LTV',
      value: (
        <Text
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: colors.grey12
          }}>
          {`${lendingPool?.pool?.config?.liquidation_threshold || '-'}%`}
        </Text>
      ),
      tip: 'The LTV threshold at which your position can be liquidated'
    },
    {
      label: 'Liquidation Penalty',
      value: (
        <Text
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: colors.grey12
          }}>
          {`${(liquidationParams?.params.liquidation_bonus_factor || 0) / 10}%`}
        </Text>
      ),
      tip: 'The portion of collateral allocated as a reward to liquidators during liquidation'
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
      tip: 'The amount of collateral sold during liquidation'
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
      tip: 'The remaining collateral not affected by liquidation, which will be returned to you'
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
      tip: 'A unique identifier for the liquidation event'
    }
  ];

  const hasDeposited = depositTxs?.length;

  const hasAuthorized =
    dlcMetaData?.dlc_meta?.liquidation_cet?.borrower_adaptor_signatures &&
    dlcMetaData?.dlc_meta?.liquidation_cet?.borrower_adaptor_signatures?.length > 0;

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
              You have withdrawn your collateral. Please check your account later.
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
              if (from === 'createLoan') {
                window.history.go(-4);
                return;
              }
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
                  gap="4px"
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
                    {formatAddress(loan.vault_address, 6)}
                  </Typography>
                  <CopyIcon text={loan.vault_address} onlyIcon size={12} />
                </Stack>
              </Row>
              <Row
                itemsCenter
                justifyBetween
                style={{
                  marginTop: '2px'
                }}>
                <Text
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: colors.white
                  }}>
                  Collateral
                </Text>

                <>
                  {loan.status === 'Authorized' ? (
                    <StatusWithToExplorer text="Locked" />
                  ) : loan.status === 'Repaid' ? (
                    <StatusWithPending text="Unlocking" />
                  ) : loan.status === 'Open' ? (
                    <StatusWithToExplorer text="Locked" />
                  ) : loan.status === 'Closed' ? (
                    <StatusWithToExplorer text="Unlocked" />
                  ) : loan.status === 'Liquidated' ? (
                    <StatusWithToExplorer text="Liquidated" />
                  ) : loan.status === 'Requested' ? (
                    <>
                      {hasAuthorized ? (
                        <StatusWithToExplorer text="Locked" />
                      ) : hasDeposited ? (
                        <>
                          {isRedeeming ? (
                            <StatusWithPending text="Unlocking" />
                          ) : (
                            <StatusWithToExplorer text="Locked" />
                          )}
                        </>
                      ) : null}
                    </>
                  ) : loan.status === 'Cancelled' ? (
                    loanDetailCex?.returnBtcTxhash ? (
                      <StatusWithToExplorer text="Claimed" />
                    ) : isRedeeming ? (
                      <StatusWithPending text="Unlocking" />
                    ) : null
                  ) : loan.status === 'Rejected' ? (
                    loanDetailCex?.returnBtcTxhash ? (
                      <StatusWithToExplorer text="Claimed" />
                    ) : isRedeeming ? (
                      <StatusWithPending text="Unlocking" />
                    ) : null
                  ) : null}
                </>
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
              <Row itemsCenter justifyBetween>
                <Text
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: colors.white
                  }}>
                  Loan
                </Text>
                {loan.status === 'Authorized' ? (
                  <StatusWithPending text="Pending" />
                ) : ['Repaid', 'Closed'].includes(loan.status) ? (
                  <StatusWithToExplorer text="Repaid" />
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
        </>
      )}

      {loan.status === 'Requested' && !hasDeposited ? (
        <Button
          preset="primary"
          style={{ position: 'fixed', bottom: 16, left: 16, right: 16 }}
          onClick={() => {
            navigate('LoanDepositScreen', {
              borrowAmount: loan.borrow_amount.amount,
              collateralAmount: loan.collateral_amount || '0',
              loanId: loan.vault_address
            });
          }}>
          Lock
        </Button>
      ) : loan.status === 'Requested' && hasDeposited ? (
        <Row style={{ display: tx ? 'none' : 'flex', position: 'fixed', bottom: 16, left: 16, right: 16, gap: '16px' }}>
          {canClaim && (
            <Button
              preset="primary"
              disabled={claimLoading}
              style={{ flex: 1 }}
              onClick={() => {
                claim({
                  feeRate
                });
              }}>
              Claim
            </Button>
          )}
          <Button
            preset="primary"
            style={{ flex: 1 }}
            disabled={claimLoading}
            onClick={() => {
              navigate('LoanAuthorizeScreen', {
                loanId: loan.vault_address,
                borrowAmount: loan.borrow_amount.amount,
                collateralAmount: loan.collateral_amount || '0',
                feeRate
              });
            }}>
            Authorize
          </Button>
        </Row>
      ) : loan.status === 'Open' ? (
        <Button
          preset="primary"
          style={{ position: 'fixed', bottom: 16, left: 16, right: 16 }}
          onClick={() => {
            navigate('LoanRepayScreen', { loan_id: loan.vault_address });
          }}>
          Repay
        </Button>
      ) : loan.status === 'Rejected' && canClaim ? (
        <Button
          preset="primary"
          disabled={claimLoading}
          style={{ display: tx ? 'none' : 'flex', position: 'fixed', bottom: 16, left: 16, right: 16 }}
          onClick={() => {
            claim({
              feeRate
            });
          }}>
          Claim
        </Button>
      ) : loan.status === 'Cancelled' && canClaim ? (
        <Button
          preset="primary"
          disabled={claimLoading}
          style={{ display: tx ? 'none' : 'flex', position: 'fixed', bottom: 16, left: 16, right: 16 }}
          onClick={() => {
            claim({
              feeRate
            });
          }}>
          Claim
        </Button>
      ) : null}
    </Layout>
  );
}

function StatusWithToExplorer({ text }: { text: string; url?: string }) {
  return (
    <Box
      sx={{
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '10px',
        backgroundColor: colors.white1,
        color: colors.white
      }}>
      {text}
    </Box>
  );
}

function StatusWithPending({ text }: { text: string }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        height: '30px',
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
        {text}
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
  );
}
