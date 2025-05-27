import { useMemo, useState } from 'react';
import 'swiper/css';

import { NetworkType } from '@/shared/types';
import { Column, Content, Footer, Icon, Image, Layout, Row, Text } from '@/ui/components';
import SearchInput from '@/ui/components/Input/Search';
import { NavTabBar } from '@/ui/components/NavTabBar';
import useGetPoolsData from '@/ui/hooks/useGetPoolsData';
import MainHeader from '@/ui/pages/Main/MainHeader';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useNetworkType } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { Stack, Typography } from '@mui/material';

import { useNavigate } from '../MainRoute';

export default function EarnTabScreen() {
  const networkType = useNetworkType();
  const [value, setValue] = useState('');
  const { data } = useGetPoolsData();
  const navigate = useNavigate();
  const { SIDE_STATION_URL } = useEnvironment();

  const filterData = useMemo(() => {
    return data.filter((item) => {
      return item.token.asset.symbol.toLowerCase().includes(value.toLowerCase());
    });
  }, [data, value]);

  if (networkType === NetworkType.MAINNET) {
    return (
      <Layout>
        <MainHeader title={''} />
        <Content mt="lg" classname="fadeIn-page">
          <Column
            gap="lg"
            px="lg"
            full
            itemsCenter
            justifyCenter
            py="md"
            style={{
              borderRadius: '10px'
            }}>
            <Text
              text="COMING SOON"
              color="white"
              style={{
                fontWeight: 700
              }}
              size="xl"></Text>
          </Column>
        </Content>
        <Footer px="zero" py="zero">
          <NavTabBar tab="earn" />
        </Footer>
      </Layout>
    );
  }

  return (
    <Layout>
      <MainHeader title={''} />
      <Content mt="lg" classname="fadeIn-page">
        <Column gap="lg">
          <Row
            full
            justifyBetween
            itemsCenter
            style={{
              flexGrow: 0
            }}>
            <Text
              color="white"
              size="lg"
              style={{
                fontWeight: 600
              }}>
              Earn
            </Text>

            <Stack
              direction="row"
              alignItems="center"
              gap="4px"
              onClick={() => {
                navigate('MyEarnsScreen');
              }}
              sx={{
                cursor: 'pointer',
                p: {
                  color: colors.grey12,
                  transition: '.4s'
                },
                div: {
                  transition: '.4s'
                },
                ':hover': {
                  p: {
                    color: colors.white
                  },
                  div: {
                    div: {
                      color: `${colors.white} !important`,
                      bgcolor: `${colors.white} !important`
                    }
                  }
                }
              }}>
              <Typography
                sx={{
                  fontSize: '12px',
                  mt: '-1px'
                }}>
                My Earns
              </Typography>
              <Icon icon="arrow-right" color="white_muted" size={16} />
            </Stack>
          </Row>
          <Row
            full
            justifyCenter
            itemsCenter
            bg="card_bgColor"
            gap="xl"
            py="md"
            style={{
              borderRadius: '10px',
              flexShrink: 0
            }}>
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: 700,
                color: colors.white,
                maxWidth: '200px'
              }}>
              Put your assets to work and start earning yield
            </Typography>
            <Image src="./images/img/lending-banner.png" height={68} width={68}></Image>
          </Row>
          <SearchInput value={value} onChange={setValue} />
          <Row
            full
            justifyBetween
            itemsCenter
            style={{
              flexGrow: 0
            }}>
            <Text color="white" size="sm">
              Assets
            </Text>

            <Text color="white" size="sm">
              Est.APR
            </Text>
          </Row>
          {filterData.map((item) => (
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              key={item.baseData.id}
              sx={{
                px: '20px',
                py: '12px',
                borderRadius: '10px',
                background: colors.card_bgColor,
                cursor: 'pointer',
                transition: '.4s',
                ':hover': {
                  background: colors.grey66
                }
              }}
              onClick={() => {
                navigate('EarnSupplyScreen', {
                  poolData: item
                });
              }}>
              <Image
                src={item.token.asset.logo}
                size={32}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%'
                }}
              />
              <Text
                color="white"
                size="md"
                style={{
                  fontWeight: 600
                }}>
                {item.token.asset.symbol}
              </Text>
              <Text
                color="white_muted"
                size="sm"
                style={{
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'dashed underline',
                  textUnderlineOffset: '2px'
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  window.open(`${SIDE_STATION_URL}/lendingPool/${item.baseData.id}`, '_blank');
                }}>
                Details
              </Text>

              <Text
                size="md"
                style={{
                  fontWeight: 600,
                  color: colors.green,
                  flex: 1,
                  textAlign: 'right'
                }}>
                {item.supplyApy}%
              </Text>
            </Stack>
          ))}
        </Column>
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="earn" />
      </Footer>
    </Layout>
  );
}
