import { useState } from 'react';
import { useQuery } from 'react-query';

import { Content, Header, Icon, Layout, Row, Text } from '@/ui/components';
import ImageIcon from '@/ui/components/ImageIcon';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import services from '@/ui/services';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { colors } from '@/ui/theme/colors';
import { formatUnitAmount, showFromTime } from '@/ui/utils';
import { formatTimeWithUTC } from '@/ui/utils/formatter';
import { Box, Stack } from '@mui/material';

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
                      {item.forIbc && (
                        <Box
                          sx={{
                            backgroundColor: colors.white1,
                            p: '0 6px',
                            borderRadius: '4px',
                            color: colors.white,
                            fontSize: '10px'
                          }}>
                          IBC
                        </Box>
                      )}
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
