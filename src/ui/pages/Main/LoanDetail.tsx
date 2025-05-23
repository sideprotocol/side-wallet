import BigNumber from 'bignumber.js';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

import { Button, Column, Content, Header, Layout, Row, Text } from '@/ui/components';
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
import { Box } from '@mui/material';

import { useNavigate } from '../MainRoute';
import { HealthFactor, LoanLTV } from './MyLoans';

export default function LoanDetailScreen() {
  const navigate = useNavigate();
  const currentAccount = useCurrentAccount();
  const { state } = useLocation();
  const { loan_id } = state as { loan_id: string };

  const { sideChain, SERVICE_BASE_URL, SIDE_BTC_EXPLORER } = useEnvironment();
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
          <Row full justifyBetween itemsCenter>
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
                fontSize: '10px',
                backgroundColor: colors.grey65,
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
          <Row full justifyBetween itemsCenter>
            <Text
              style={{
                fontSize: '12px',
                color: colors.grey12
              }}>
              Amount
            </Text>
            <Row justifyEnd itemsCenter gap="md">
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
            </Row>
          </Row>
          <Row full justifyBetween itemsCenter>
            <Text
              style={{
                fontSize: '12px',
                color: colors.grey12
              }}>
              Vault
            </Text>
            <Text
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color: colors.white
              }}>
              {formatAddress(loan.vault_address, 6)}
            </Text>
          </Row>
          <Row full justifyBetween itemsCenter>
            <Text
              style={{
                fontSize: '12px',
                color: colors.grey12
              }}>
              Deposit Tx
            </Text>
            <Box>
              {loan.authorizations[0] &&
                (loan.authorizations[0]?.deposit_txs || [])?.map((tx, index) => (
                  <Text
                    key={index}
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      color: colors.white
                    }}
                    onClick={() => {
                      window.open(`${SIDE_BTC_EXPLORER}/tx/${tx}`);
                    }}>
                    {formatAddress(tx, 6)}
                  </Text>
                ))}
            </Box>
          </Row>
          <Row full justifyBetween itemsCenter>
            <Text
              style={{
                fontSize: '12px',
                color: colors.grey12
              }}>
              Withdraw Tx
            </Text>
            <Text
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color: colors.white
              }}
              onClick={() => {
                if (loan.status === 'Liquidated') return;
                window.open(`${SIDE_BTC_EXPLORER}/tx/${loanDetailCex?.returnBtcTxhash}`);
              }}>
              {loan.status !== 'Liquidated' ? formatAddress(loanDetailCex?.returnBtcTxhash || '', 6) : ''}
            </Text>
          </Row>
          <Row full justifyBetween itemsCenter>
            <Text
              style={{
                fontSize: '12px',
                color: colors.grey12
              }}>
              Unilateral Exit After
            </Text>
            <Text
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color: colors.white
              }}>
              {formatTimeWithUTC(+loan.final_timeout * 1000)}
            </Text>
          </Row>
          <Box
            sx={{
              height: '1px',
              backgroundColor: colors.black_dark
            }}
          />
          <Row full justifyBetween itemsCenter>
            <Text
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: colors.white
              }}>
              Loan
            </Text>
            {['Repaid', 'Closed'].includes(loan.status) ? (
              <Box
                sx={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  backgroundColor: colors.grey65,
                  color: colors.grey64
                }}>
                Repaid
              </Box>
            ) : null}
          </Row>
          <Row full justifyBetween itemsCenter>
            <Text
              style={{
                fontSize: '12px',
                color: colors.grey12
              }}>
              Amount
            </Text>
            <Row justifyEnd itemsCenter gap="md">
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
            </Row>
          </Row>
          <Row full justifyBetween itemsCenter>
            <Text
              style={{
                fontSize: '12px',
                color: colors.grey12
              }}>
              Maturity Time
            </Text>
            <Text
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color: colors.white
              }}>
              {formatTimeWithUTC(+loan.maturity_time * 1000)}
            </Text>
          </Row>
          <Row full justifyBetween itemsCenter>
            <Text
              style={{
                fontSize: '12px',
                color: colors.grey12
              }}>
              Accrued Interest
            </Text>
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
          </Row>
          <Row full justifyBetween itemsCenter>
            <Text
              style={{
                fontSize: '12px',
                color: colors.grey12
              }}>
              Max Interest
            </Text>
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
          </Row>
          <Row full justifyBetween itemsCenter>
            <Text
              style={{
                fontSize: '12px',
                color: colors.grey12
              }}>
              Disburse Tx
            </Text>
            <Text
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color: colors.white
              }}
              onClick={() => {
                window.open(`${sideChain.explorerUrl}/tx/${loanDetailCex?.disbursementTxhash || ''}`);
              }}>
              {formatAddress(loanDetailCex?.disbursementTxhash || '', 6)}
            </Text>
          </Row>
          <Row full justifyBetween itemsCenter>
            <Text
              style={{
                fontSize: '12px',
                color: colors.grey12
              }}>
              Repay Tx
            </Text>
            <Text
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color: colors.white
              }}
              onClick={() => {
                window.open(`${sideChain.explorerUrl}/tx/${loanDetailCex?.repaymentTxhash || ''}`);
              }}>
              {formatAddress(loanDetailCex?.repaymentTxhash || '', 6)}
            </Text>
          </Row>
          <Box
            sx={{
              height: '1px',
              backgroundColor: colors.black_dark
            }}
          />
          <Row full justifyBetween itemsCenter>
            <Text
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: colors.white
              }}>
              Liquidation
            </Text>
          </Row>
          <Row full justifyBetween itemsCenter>
            <Text
              style={{
                fontSize: '12px',
                color: colors.grey12
              }}>
              Health Factor
            </Text>
            <HealthFactor loan={loan} />
          </Row>
          <Row full justifyBetween itemsCenter>
            <Text
              style={{
                fontSize: '12px',
                color: colors.grey12
              }}>
              Current LTV
            </Text>
            <LoanLTV loan={loan} sx={{ fontSize: '12px', fontWeight: 500 }} />
          </Row>
          <Row full justifyBetween itemsCenter>
            <Text
              style={{
                fontSize: '12px',
                color: colors.grey12
              }}>
              Liquidation LTV
            </Text>
            <Text
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color: colors.white
              }}>
              {`${lendingPool?.pool?.config?.liquidation_threshold || '-'}%`}
            </Text>
          </Row>
          <Row full justifyBetween itemsCenter>
            <Text
              style={{
                fontSize: '12px',
                color: colors.grey12
              }}>
              Liquidation Penalty
            </Text>
            <Text
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color: colors.white
              }}>
              {`${(liquidationParams?.params.liquidation_bonus_factor || 0) / 10}%`}
            </Text>
          </Row>
          <Row full justifyBetween itemsCenter>
            <Text
              style={{
                fontSize: '12px',
                color: colors.grey12
              }}>
              Liquidated Collateral
            </Text>
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
          </Row>
          <Row full justifyBetween itemsCenter>
            <Text
              style={{
                fontSize: '12px',
                color: colors.grey12
              }}>
              Unliquidated Collateral
            </Text>
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
          </Row>
          <Row full justifyBetween itemsCenter>
            <Text
              style={{
                fontSize: '12px',
                color: colors.grey12
              }}>
              Liquidation Id
            </Text>
            <Text
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color: colors.white
              }}>
              {liquidation?.liquidation.id}
            </Text>
          </Row>
          <Box
            sx={{
              height: '1px',
              backgroundColor: colors.black_dark
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
              liquidationEvent
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
