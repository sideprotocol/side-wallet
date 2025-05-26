import BigNumber from 'bignumber.js';
import { useLocation } from 'react-router-dom';

import { Button, Column, Content, Header, Layout, Row, Text } from '@/ui/components';
import useGetLendingParams from '@/ui/hooks/useGetLendingParams';
import useGetLiquidationParams from '@/ui/hooks/useGetLiquidationParams';
import useGetPoolExchangeRate from '@/ui/hooks/useGetPoolExchangeRate';
import { PoolDataItem } from '@/ui/hooks/useGetPoolsData';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { colors } from '@/ui/theme/colors';
import { formatUnitAmount, getTruncate } from '@/ui/utils';
import { Box, Typography } from '@mui/material';

import { useNavigate } from '../MainRoute';

export default function LendingPoolDetailScreen() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const currentAccount = useCurrentAccount();
  const { pool } = state as { pool: PoolDataItem };
  const { balanceList } = useGetSideBalanceList(currentAccount?.address);

  const { data: exchangeRate } = useGetPoolExchangeRate({ poolId: pool.baseData.id });
  const { data: liquidationParams } = useGetLiquidationParams();
  const { data: lendingParams } = useGetLendingParams();
  const debtAssetInfo = balanceList.find((item) => item.denom === pool.baseData.total_stokens.denom);

  const data1 = [
    {
      label: '# of suppliers',
      value: BigNumber(pool.ofSuppliers).toFormat()
    },
    {
      label: '# of borrowers',
      value: BigNumber(pool.ofBorrowers).toFormat()
    },
    {
      label: 'Daily supplying interests',
      value: '-'
    },
    {
      label: 'Daily borrowing interests',
      value: '-'
    },
    {
      label: 'Reserve factor',
      value: `${pool.baseData.config.reserve_factor / 10}%`
    },
    {
      label: 'Exchange rate',
      value: (
        <Typography
          sx={{
            fontSize: '12px',
            color: colors.white,
            fontWeight: 600
          }}>
          1&nbsp;
          <small
            style={{
              fontSize: '100%',
              color: colors.grey12
            }}>
            {pool.token.asset.symbol}
          </small>
          &nbsp;=&nbsp;{exchangeRate || '-'}
          &nbsp;
          <small
            style={{
              fontSize: '100%',
              color: colors.grey12
            }}>
            s{pool.token.asset.symbol}
          </small>
        </Typography>
      )
    }
  ];

  if (pool.tranches[2]) {
    data1.unshift({
      label: `Total Borrow (${new BigNumber(pool.tranches[2].maturity).div(3600).div(24).toFixed(0)}d-maturity)`,
      value: `${BigNumber(formatUnitAmount(pool.tranches[2].total_borrowed, pool.token.asset.exponent)).toFormat()}`
    });
  }
  if (pool.tranches[1]) {
    data1.unshift({
      label: `Total Borrow (${new BigNumber(pool.tranches[1].maturity).div(3600).div(24).toFixed(0)}d-maturity)`,
      value: `${BigNumber(formatUnitAmount(pool.tranches[1].total_borrowed, pool.token.asset.exponent)).toFormat()}`
    });
  }

  if (pool.tranches[0]) {
    data1.unshift({
      label: `Total Borrow (${new BigNumber(pool.tranches[0].maturity).div(3600).div(24).toFixed(0)}d-maturity)`,
      value: `${BigNumber(formatUnitAmount(pool.tranches[0].total_borrowed, pool.token.asset.exponent)).toFormat()}`
    });
  }

  const data2 = [
    {
      label: 'Debt Ceiling',
      value: +pool.baseData.config.max_borrow_amount
        ? getTruncate(
            formatUnitAmount(pool.baseData.config.max_borrow_amount, debtAssetInfo?.asset.exponent || 6),
            debtAssetInfo?.asset.precision || 6
          )
        : '-'
    },
    {
      label: 'Borrow Cap',
      value: +pool.baseData.config.borrow_cap
        ? getTruncate(
            formatUnitAmount(pool.baseData.config.borrow_cap, debtAssetInfo?.asset.exponent || 6),
            debtAssetInfo?.asset.precision || 6
          )
        : '-'
    },
    {
      label: 'Supply Cap',
      value: +pool.baseData.config.supply_cap
        ? getTruncate(
            formatUnitAmount(pool.baseData.config.supply_cap, debtAssetInfo?.asset.exponent || 6),
            debtAssetInfo?.asset.precision || 6
          )
        : '-'
    },
    {
      label: 'Pause (Supply+Borrow）',
      value: (
        <Typography
          sx={{
            fontSize: '14px',
            color: pool.baseData.config.paused ? colors.red : colors.green,
            fontWeight: 600
          }}>{`${pool.baseData.config.paused ? 'Yes' : 'No'}`}</Typography>
      )
    },
    {
      label: 'Min Borrow Amount',
      value: +pool.baseData.config.min_borrow_amount
        ? formatUnitAmount(pool.baseData.config.min_borrow_amount, debtAssetInfo?.asset.exponent || 6)
        : '-'
    },
    {
      label: 'Max Borrow Amount',
      value: +pool.baseData.config.max_borrow_amount
        ? getTruncate(
            formatUnitAmount(pool.baseData.config.max_borrow_amount, debtAssetInfo?.asset.exponent || 6),
            debtAssetInfo?.asset.precision || 6
          )
        : '-'
    },
    {
      label: 'Max LTV',
      value: `${pool?.baseData.config?.max_ltv || '-'}%`
    },
    {
      label: 'Liquidation Threshold',
      value: `${pool?.baseData.config?.liquidation_threshold || '-'}%`
    },
    {
      label: 'Min Duration',
      value: lendingParams?.params.min_loan_duration
    },
    {
      label: 'Max Duration',
      value: lendingParams?.params.max_loan_duration
    },
    {
      label: 'Liquidation Bonus',
      value: `${(liquidationParams?.params.liquidation_bonus_factor || 0) / 10}%`
    },
    {
      label: 'Min Liquidate Amount',
      value: `${(liquidationParams?.params.min_liquidation_factor || 0) / 10}%`
    },
    {
      label: 'Protocol Liquidation Fee',
      value: `${new BigNumber(liquidationParams?.params.protocol_liquidation_fee || '0').div(10).toFixed(2)}%`
    },
    {
      label: 'Reserve Factor',
      value: `${new BigNumber(pool.baseData.config.reserve_factor || '0').div(10).toFixed(2)}%`
    }
  ];

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Pool Detail"
      />
      <Content
        style={{
          padding: '0 16px 70px',
          marginTop: 16
        }}>
        <Column gap={'md'}>
          <Text
            style={{
              fontSize: '18px',
              fontWeight: 600,
              color: colors.white
            }}>
            Market Info
          </Text>
          {data1.map((item) => (
            <Row full justifyBetween itemsCenter key={item.label}>
              <Text
                style={{
                  fontSize: '12px',
                  color: colors.grey12
                }}>
                {item.label}
              </Text>
              <Row
                justifyEnd
                itemsCenter
                gap="md"
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: colors.white
                }}>
                {item.value}
              </Row>
            </Row>
          ))}
          <Box
            sx={{
              height: '1px',
              backgroundColor: colors.black_dark
            }}
          />
          <Text
            style={{
              fontSize: '18px',
              fontWeight: 600,
              color: colors.white
            }}>
            Parameters
          </Text>
          {data2.map((item) => (
            <Row full justifyBetween itemsCenter key={item.label}>
              <Text
                style={{
                  fontSize: '12px',
                  color: colors.grey12
                }}>
                {item.label}
              </Text>
              <Row
                justifyEnd
                itemsCenter
                gap="md"
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: colors.white
                }}>
                {item.value}
              </Row>
            </Row>
          ))}
          <Box
            sx={{
              height: '1px',
              backgroundColor: colors.black_dark
            }}
          />
        </Column>
      </Content>
      <Button
        preset="primary"
        style={{ position: 'fixed', bottom: 16, left: 16, right: 16 }}
        onClick={() => {
          navigate('EarnSupplyScreen', {
            poolData: pool
          });
        }}>
        Supply
      </Button>
    </Layout>
  );
}
