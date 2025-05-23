import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { Column, Content, Header, Icon, Image, Layout, Row, Text } from '@/ui/components';
import useGetBitcoinBalanceList from '@/ui/hooks/useGetBitcoinBalanceList';
import useGetLoansData from '@/ui/hooks/useGetLoansData';
import useGetPoolDataById from '@/ui/hooks/useGetPoolDataById';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import { Loan, LoanStatus } from '@/ui/services/lending/types';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { colors } from '@/ui/theme/colors';
import { formatUnitAmount, getTruncate } from '@/ui/utils';
import { formatTimeWithUTC } from '@/ui/utils/formatter';
import { Box } from '@mui/material';

import { useNavigate } from '../MainRoute';

export const loanStatusStyle: Record<
  LoanStatus,
  {
    bgColor: string;
    color: string;
  }
> = {
  Unspecified: { bgColor: '', color: '' },
  Requested: { bgColor: colors.grey63, color: colors.grey62 },
  Authorized: { bgColor: colors.grey63, color: colors.grey62 },
  Rejected: { bgColor: colors.grey65, color: colors.grey64 },
  Open: { bgColor: colors.green10, color: colors.green },
  Repaid: { bgColor: colors.green10, color: colors.green },
  Defaulted: { bgColor: colors.blue3, color: colors.main },
  Liquidated: { bgColor: colors.red11, color: colors.red },
  Closed: { bgColor: colors.grey65, color: colors.grey64 }
};

export default function MyLoansScreen() {
  const currentAccount = useCurrentAccount();
  const { data: allLoansData } = useGetLoansData();
  const { balanceList: sideBalanceList } = useGetSideBalanceList(currentAccount?.address);
  const { balanceList: bitcoinBalanceList } = useGetBitcoinBalanceList(currentAccount?.address);
  const navigate = useNavigate();
  const data = useMemo(() => {
    return allLoansData.filter((item) => item.borrower === currentAccount.address);
  }, [currentAccount.address, allLoansData]);
  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="My Loans"
      />
      <Content
        style={{
          padding: '0 16px',
          marginTop: 16
        }}>
        {data?.length > 0 ? (
          data.map((item) => {
            const borrowToken = sideBalanceList.find((o) => o.denom === item.borrow_amount.denom);
            const collateralToken = bitcoinBalanceList.find((item) => item.denom === 'sat');
            const collateralAmount = formatUnitAmount(item.collateral_amount, collateralToken?.asset.exponent || 6);
            const borrowTokenAmount = formatUnitAmount(item.borrow_amount.amount, borrowToken?.asset.exponent || 6);

            return (
              <Column key={item.create_at} gap={'md'}>
                <Row
                  full
                  justifyBetween
                  itemsCenter
                  onClick={() => {
                    navigate('LoanDetailScreen', { loanId: item.vault_address });
                  }}>
                  <Row itemsCenter gap="md">
                    <Image src={borrowToken?.asset.logo} height={28} width={28}></Image>
                    <Text
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: colors.white
                      }}>
                      {borrowTokenAmount}
                    </Text>
                    <Text
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: colors.grey12
                      }}>
                      {borrowToken?.asset.symbol}
                    </Text>
                    <Box
                      sx={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        color: loanStatusStyle[item.status].color,
                        bgcolor: loanStatusStyle[item.status].bgColor
                      }}>
                      {item.status}
                    </Box>
                  </Row>
                  <Icon icon="arrow-right" color="white" size={16} />
                </Row>
                <Row full justifyBetween itemsCenter>
                  <Text
                    style={{
                      fontSize: '12px',
                      color: colors.grey12
                    }}>
                    Collateral
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
                      {collateralToken?.asset.symbol}
                    </Text>
                    <Image src={collateralToken?.asset.logo} height={16} width={16}></Image>
                  </Row>
                </Row>
                <Row full justifyBetween itemsCenter>
                  <Text
                    style={{
                      fontSize: '12px',
                      color: colors.grey12
                    }}>
                    Health Factor
                  </Text>
                  <HealthFactor loan={item} />
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
                      formatUnitAmount(item.interest, borrowToken?.asset.exponent || 6),
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
                    Maturity
                  </Text>
                  <Text
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      color: colors.white
                    }}>
                    {formatTimeWithUTC(+item.maturity_time * 1000)}
                  </Text>
                </Row>
                <Box
                  sx={{
                    height: '1px',
                    backgroundColor: colors.black_dark
                  }}
                />
              </Column>
            );
          })
        ) : (
          <Text style={{ fontSize: '12px', color: colors.grey12, textAlign: 'center', marginTop: '100px' }}>
            No data
          </Text>
        )}
      </Content>
    </Layout>
  );
}

function HealthFactor({ loan }: { loan: Loan }) {
  const currentAccount = useCurrentAccount();
  const { balanceList: sideBalanceList } = useGetSideBalanceList(currentAccount?.address);
  const { balanceList: bitcoinBalanceList } = useGetBitcoinBalanceList(currentAccount?.address);
  const { data: lendingPool } = useGetPoolDataById({ poolId: loan.pool_id });
  const borrowToken = sideBalanceList.find((o) => o.denom === loan.borrow_amount.denom);
  const collateralToken = bitcoinBalanceList.find((item) => item.denom === 'sat');
  const collateralAmount = formatUnitAmount(loan.collateral_amount, collateralToken?.asset.exponent || 6);
  const borrowTokenAmount = formatUnitAmount(loan.borrow_amount.amount, borrowToken?.asset.exponent || 6);

  const { healthFactor } = useMemo(() => {
    if (
      BigNumber(collateralAmount || 0).eq(0) ||
      BigNumber(borrowTokenAmount || 0).eq(0) ||
      !lendingPool?.pool?.config
    ) {
      return {
        healthFactor: '-'
      };
    }
    return {
      healthFactor: new BigNumber(collateralAmount)
        .times(collateralToken?.denomPrice || 0)
        .times(lendingPool?.pool?.config?.liquidation_threshold || 0)
        .div(100)
        .div(new BigNumber(borrowTokenAmount || 1).times(borrowToken?.denomPrice || 0))
        .toFixed(2)
    };
  }, [borrowTokenAmount, collateralAmount, borrowToken?.denomPrice, collateralToken?.denomPrice, lendingPool]);

  return (
    <Text
      style={{
        fontSize: '12px',
        fontWeight: 500,
        color:
          +healthFactor > 2
            ? colors.green
            : +healthFactor <= 1.2
            ? colors.red
            : +healthFactor > 1.5
            ? colors.yellow
            : colors.main
      }}>
      {healthFactor}
    </Text>
  );
}
