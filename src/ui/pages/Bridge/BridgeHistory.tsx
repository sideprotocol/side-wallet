import BigNumber from 'bignumber.js';
import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';

import { Content, Header, Icon, Layout, Row, Text } from '@/ui/components';
import ImageIcon from '@/ui/components/ImageIcon';
import useGetBitcoinBalanceList from '@/ui/hooks/useGetBitcoinBalanceList';
import useGetPoolDataById from '@/ui/hooks/useGetPoolDataById';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import services from '@/ui/services';
import { Loan } from '@/ui/services/lending/types';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { colors } from '@/ui/theme/colors';
import { formatUnitAmount, showFromTime } from '@/ui/utils';
import { formatTimeWithUTC } from '@/ui/utils/formatter';
import { Box, BoxProps, Stack, Typography } from '@mui/material';

import { useNavigate } from '../MainRoute';

export default function BridgeHistory() {
  const currentAccount = useCurrentAccount();
  const { SERVICE_BASE_URL } = useEnvironment();
  const { balanceList: sideBalanceList } = useGetSideBalanceList(currentAccount?.address);
  const [isHoverId, setIsHoverId] = useState('');
  const navigate = useNavigate();

  const { data, isLoading: loading } = useQuery({
    queryKey: ['getBridgeActivities', { userAddress: currentAccount.address }],
    queryFn: async () => {
      return services.dex.getBridgeActivities(
        { userAddress: currentAccount.address, pageNumber: 0, pageSize: 100 },
        { baseURL: SERVICE_BASE_URL }
      );
    }
  });
  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="History"
      />
      <Content
        style={{
          marginTop: 16,
          padding: '0 16px'
        }}>
        {!loading && data?.content.length ? (
          <>
            {data.content.map((item) => {
              let assetLogo = item.tokenLogo;
              if (item.rune) {
                assetLogo = sideBalanceList.find((a) => a.denom === item.tokenSymbol)?.asset.logo || '';
              }
              return (
                <Stack
                  key={item.id}
                  gap="8px"
                  onMouseOver={() => {
                    setIsHoverId(item.txhash || item.btcTxhash);
                  }}
                  onMouseLeave={() => {
                    setIsHoverId('');
                  }}
                  onClick={() => {
                    navigate('BridgeDetail', { txHash: item.txhash || item.btcTxhash });
                  }}
                  sx={{
                    padding: '16px 16px 0',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: '.4s',
                    ':hover': {
                      bgcolor: colors.black_dark
                    }
                  }}>
                  <Row full justifyBetween itemsCenter>
                    <Row itemsCenter gap="md">
                      <ImageIcon
                        url={assetLogo}
                        style={{
                          width: '28px',
                          height: '28px'
                        }}
                      />
                      <Text
                        style={{
                          fontSize: '14px',
                          fontWeight: 600,
                          color: colors.white
                        }}>
                        {item.tokenSymbol}
                      </Text>
                    </Row>
                    <Icon
                      icon="arrow-right"
                      color={isHoverId === (item.txhash || item.btcTxhash) ? 'main' : 'white'}
                      size={16}
                    />
                  </Row>
                  <Row full justifyBetween itemsCenter>
                    <Text
                      style={{
                        fontSize: '12px',
                        color: colors.grey12
                      }}>
                      Amount
                    </Text>
                    <Text
                      style={{
                        fontSize: '12px',
                        fontWeight: 500,
                        color: colors.white
                      }}>
                      {formatUnitAmount(item.tokenAmount, item.tokenExponent)}
                    </Text>
                  </Row>
                  <Row full justifyBetween itemsCenter>
                    <Text
                      style={{
                        fontSize: '12px',
                        color: colors.grey12
                      }}>
                      Status
                    </Text>
                    <Row justifyEnd itemsCenter>
                      <Text
                        style={{
                          fontSize: '12px',
                          fontWeight: 500,
                          color: colors.white
                        }}>
                        {item.status}
                      </Text>
                      {item.status === 'Pending' && (
                        <svg
                          className="animate-[spin_3s_linear_infinite] inline-block ml-1"
                          width="17"
                          height="17"
                          viewBox="0 0 17 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8.5 2V3.66667M8.5 12.5V15.1667M4.33333 8.5H2M14.6667 8.5H13.6667M12.8047 12.8047L12.3333 12.3333M12.9428 4.11052L12 5.05333M3.78105 13.219L5.66667 11.3333M3.91912 3.97245L5.33333 5.38667"
                            stroke={colors.white}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </Row>
                  </Row>
                  <Row full justifyBetween itemsCenter>
                    <Text
                      style={{
                        fontSize: '12px',
                        color: colors.grey12
                      }}>
                      Time
                    </Text>
                    <Text
                      style={{
                        fontSize: '12px',
                        fontWeight: 500,
                        color: colors.white
                      }}>
                      {formatTimeWithUTC(item.time)} ({showFromTime(item.time)})
                    </Text>
                  </Row>
                  <Box
                    sx={{
                      height: '1px',
                      backgroundColor: colors.black_dark
                    }}
                  />
                </Stack>
              );
            })}
            <Text
              style={{
                fontSize: '12px',
                color: colors.grey12,
                textAlign: 'center',
                marginTop: '4px'
              }}>
              No more data
            </Text>
          </>
        ) : (
          <Text style={{ fontSize: '12px', color: colors.grey12, textAlign: 'center', marginTop: '100px' }}>
            No data
          </Text>
        )}
      </Content>
    </Layout>
  );
}

export function HealthFactor({ loan }: { loan: Loan }) {
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

export function LoanLTV({ loan, sx }: { loan: Loan; sx?: BoxProps['sx'] }) {
  const currentAccount = useCurrentAccount();

  const { balanceList } = useGetSideBalanceList(currentAccount?.address);
  const { balanceList: bitcoinBalanceList } = useGetBitcoinBalanceList(currentAccount?.address);

  const { data: lendingPool } = useGetPoolDataById({ poolId: loan.pool_id });

  const borrowToken = balanceList.find((item) => item.denom === loan.borrow_amount.denom);
  const bitcoinToken = bitcoinBalanceList.find((item) => item.denom === 'sat');
  const bitcoinAmount = formatUnitAmount(loan.collateral_amount, bitcoinToken?.asset.exponent || 8);
  const borrowTokenAmount = formatUnitAmount(loan.borrow_amount.amount, borrowToken?.asset.exponent || 6);

  const { healthFactor } = useMemo(() => {
    if (BigNumber(bitcoinAmount || 0).eq(0) || BigNumber(borrowTokenAmount || 0).eq(0) || !lendingPool?.pool?.config) {
      return {
        healthFactor: '-'
      };
    }
    return {
      healthFactor: new BigNumber(bitcoinAmount)
        .times(bitcoinToken?.denomPrice || 0)
        .times(lendingPool?.pool?.config?.liquidation_threshold || 0)
        .div(100)
        .div(new BigNumber(borrowTokenAmount || 1).times(borrowToken?.denomPrice || 0))
        .toFixed(2)
    };
  }, [loan.vault_address, lendingPool, bitcoinAmount, borrowTokenAmount, borrowToken, bitcoinToken?.denomPrice]);

  if (+bitcoinAmount && +borrowTokenAmount && bitcoinToken?.denomPrice && ['Requested', 'Open'].includes(loan.status)) {
    return (
      <Typography
        sx={{
          color:
            +healthFactor > 2
              ? colors.green
              : +healthFactor <= 1.2
              ? colors.red
              : +healthFactor > 1.5
              ? colors.yellow
              : colors.main,
          fontSize: '14px',
          fontWeight: 600,
          ...sx
        }}>
        {new BigNumber(borrowTokenAmount || 0)
          .multipliedBy(borrowToken?.denomPrice || 0)
          .div(bitcoinAmount || 1)
          .div(bitcoinToken?.denomPrice || '1')
          .times(100)
          .toFixed(2) + '%'}
      </Typography>
    );
  }
  return (
    <Typography
      sx={{
        fontSize: '14px',
        fontWeight: 600,
        ...sx
      }}>
      -
    </Typography>
  );
}
