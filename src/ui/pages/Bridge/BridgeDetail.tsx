import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

import { Column, Content, Header, Layout, LightTooltip, Row, Text } from '@/ui/components';
import useGetBitcoinBalanceList from '@/ui/hooks/useGetBitcoinBalanceList';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import services from '@/ui/services';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { colors } from '@/ui/theme/colors';
import { formatUnitAmount, showFromTime } from '@/ui/utils';
import { formatAddress } from '@/ui/utils/format';
import { formatTimeWithUTC } from '@/ui/utils/formatter';
import { Box, Stack, Typography } from '@mui/material';

export default function BridgeDetail() {
  const currentAccount = useCurrentAccount();
  const { state } = useLocation();
  const { txHash } = state as { txHash: string };
  const { sideChain, SERVICE_BASE_URL, SIDE_BTC_EXPLORER, UNISAT_IO_API } = useEnvironment();

  const { balanceList: sideBalanceList } = useGetSideBalanceList(currentAccount?.address);
  const { balanceList: bitcoinBalanceList } = useGetBitcoinBalanceList(currentAccount?.address);

  const { data: bridgeParams } = useQuery({
    queryKey: ['getBridgeParams', { txHash }],
    queryFn: async () => {
      return services.bridge.getBridgeParams(UNISAT_IO_API);
    }
  });
  const { data } = useQuery({
    queryKey: ['getBridgeDetail', { txHash }],
    queryFn: async () => {
      return services.dex.getBridgeDetail(txHash, { baseURL: SERVICE_BASE_URL });
    }
  });

  if (!data) return null;

  const sideTxInfo = sideBalanceList.find((item) => item.denom === data.sideTxFeeDenom);
  const isDeposit = data.direction === 'IN';
  const bridgeFeeAssetInfo = isDeposit
    ? bitcoinBalanceList.find((item) => item.denom === 'sat')
    : sideBalanceList.find((item) => item.denom === 'sat');
  const bridgeSendAssetInfo = isDeposit
    ? bitcoinBalanceList.find((item) => item.denom === data.tokenDenom)
    : sideBalanceList.find((item) => item.denom === data.tokenDenom);
  const bridgeReceiveAssetInfo = isDeposit
    ? sideBalanceList.find((item) => item.denom === data.tokenDenom)
    : bitcoinBalanceList.find((item) => item.denom === data.tokenDenom);
  const bridgeFee = isDeposit
    ? bridgeParams?.params.protocol_fees.deposit_fee || '4000'
    : bridgeParams?.params.protocol_fees.withdraw_fee || '6000';

  const generalInfoData = [
    {
      label: 'Peg',
      value: (
        <Text
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: colors.white
          }}>
          {data.direction}
        </Text>
      ),
      tip: 'xxx'
    },
    {
      label: 'Status',
      value: (
        <Typography
          sx={{
            fontSize: '12px',
            fontWeight: 500,
            color: colors.white
          }}>
          {data.status}
        </Typography>
      ),
      tip: 'xxx'
    },
    {
      label: 'Time',
      value: (
        <Text
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: colors.white
          }}>
          {formatTimeWithUTC(data.time)} ({showFromTime(data.time)})
        </Text>
      ),
      tip: 'xxx'
    },
    {
      label: 'Asset (Source)',
      value: (
        <>
          <Text
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: colors.white
            }}>
            {formatUnitAmount(
              !isDeposit && data.tokenDenom === 'sat' ? `${+data.tokenAmount + +bridgeFee}` : data.tokenAmount,
              data.tokenExponent
            )}
          </Text>
          <Text
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: colors.grey12
            }}>
            {bridgeSendAssetInfo?.asset.symbol}
          </Text>
        </>
      ),
      tip: 'xxx'
    },
    {
      label: 'Asset (Destination)',
      value: (
        <>
          <Text
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: colors.white
            }}>
            {formatUnitAmount(
              isDeposit && data.tokenDenom === 'sat' ? `${+data.tokenAmount - +bridgeFee}` : data.tokenAmount,
              data.tokenExponent
            )}
          </Text>
          <Text
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: colors.grey12
            }}>
            {bridgeReceiveAssetInfo?.asset.symbol}
          </Text>
        </>
      ),
      tip: 'xxx'
    },
    {
      label: 'Bridge Fees',
      value: (
        <>
          <Text
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: colors.white
            }}>
            {formatUnitAmount(bridgeFee, bridgeFeeAssetInfo?.asset.exponent || 8)}
          </Text>
          <Text
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: colors.grey12
            }}>
            {bridgeFeeAssetInfo?.asset.symbol}
          </Text>
        </>
      ),
      tip: 'xxx'
    },
    {
      label: 'Transaction Fees',
      value: (
        <Stack>
          <Stack direction="row" gap="2px">
            <Text
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color: colors.white
              }}>
              {data.sideTxFeeAmount ? formatUnitAmount(data.sideTxFeeAmount, sideTxInfo?.asset.exponent || 6) : '-'}
            </Text>
            <Text
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color: colors.grey12
              }}>
              {sideTxInfo?.asset.symbol} (Side Chain)
            </Text>
          </Stack>
          <Stack direction="row" gap="2px">
            <Text
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color: colors.white
              }}>
              {data.btcTxFeeAmount ? formatUnitAmount(data.btcTxFeeAmount, 8) : '-'}
            </Text>
            <Text
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color: colors.grey12
              }}>
              BTC (Bitcoin)
            </Text>
          </Stack>
        </Stack>
      ),
      tip: 'xxx'
    },
    {
      label: 'Bitcoin Transaction',
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
            window.open(`${SIDE_BTC_EXPLORER}/tx/${data.btcTxhash}`);
          }}>
          {formatAddress(data.btcTxhash, 6)}
        </Typography>
      ),
      tip: 'xxx'
    },
    {
      label: 'Side Chain Trasaction',
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
            window.open(`${sideChain.explorerUrl}/tx/${data.txhash}`);
          }}>
          {formatAddress(data.txhash, 6)}
        </Typography>
      ),
      tip: 'xxx'
    }
  ];

  const routingData = [
    {
      label: 'Origin Chain',
      value: (
        <Text
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: colors.white
          }}>
          -
        </Text>
      ),
      tip: 'xxx'
    },
    {
      label: 'Origin Address',
      value: (
        <Text
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: colors.white
          }}>
          -
        </Text>
      ),
      tip: 'xxx'
    },
    {
      label: 'Status',
      value: (
        <Text
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: colors.white
          }}>
          -
        </Text>
      ),
      tip: 'xxx'
    },
    {
      label: 'Transaction (Origin Chain)',
      value: (
        <Text
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: colors.white
          }}>
          -
        </Text>
      ),
      tip: 'xxx'
    },
    {
      label: 'Time',
      value: (
        <Text
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: colors.white
          }}>
          -
        </Text>
      ),
      tip: 'xxx'
    },
    {
      label: 'Fees',
      value: (
        <Text
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: colors.white
          }}>
          -
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
        title="Bridge Detail"
      />
      <Content
        style={{
          padding: '0 16px 70px',
          marginTop: 16
        }}>
        <Column gap={'md'}>
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
              General Info
            </Text>
          </Row>
          {generalInfoData.map((item, index) => {
            return (
              <Row key={index} full justifyBetween itemsCenter>
                <Typography
                  sx={{
                    fontSize: '12px',
                    color: colors.grey12
                  }}>
                  {item.label}
                </Typography>
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
              Routing Info
            </Text>
          </Row>
          {routingData.map((item, index) => {
            return (
              <Row key={index} full justifyBetween itemsCenter>
                <LightTooltip title={item.tip} arrow placement="top">
                  <Typography
                    sx={{
                      fontSize: '12px',
                      color: colors.grey12
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
    </Layout>
  );
}
