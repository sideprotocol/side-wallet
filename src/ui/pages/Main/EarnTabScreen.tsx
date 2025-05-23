import { useMemo, useState } from 'react';
import 'swiper/css';

import { NetworkType } from '@/shared/types';
import { Column, Content, Footer, Icon, Image, Layout, Row, Text } from '@/ui/components';
import SearchInput from '@/ui/components/Input/Search';
import { NavTabBar } from '@/ui/components/NavTabBar';
import useGetPoolsData from '@/ui/hooks/useGetPoolsData';
import MainHeader from '@/ui/pages/Main/MainHeader';
import { useNetworkType } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { Typography } from '@mui/material';

import { useNavigate } from '../MainRoute';

export default function EarnTabScreen() {
  const networkType = useNetworkType();
  const [value, setValue] = useState('');
  const { data } = useGetPoolsData();
  const navigate = useNavigate();

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
            px="md"
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

            <Row
              itemsCenter
              gap="sm"
              onClick={() => {
                navigate('MyEarnsScreen');
              }}>
              <Text color="white" size="xs" style={{ marginTop: '-1px' }}>
                My Earns
              </Text>
              <Icon icon="arrow-right" color="white" size={16} />
            </Row>
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
          <SearchInput
            value={value}
            onChange={setValue}
            sx={{
              border: 'none',
              ':hover': {
                border: 'none'
              }
            }}
          />
          <Row
            px="md"
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
            <Row
              key={item.baseData.id}
              bg="card_bgColor"
              px="xl"
              py="lg"
              full
              itemsCenter
              gap="md"
              style={{
                borderRadius: '10px'
              }}
              onClick={() => {
                navigate('EarnSupplyScreen');
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
                size="md"
                style={{
                  fontWeight: 600,
                  color: colors.green,
                  flex: 1,
                  textAlign: 'right'
                }}>
                {item.supplyApy}%
              </Text>
            </Row>
          ))}
        </Column>
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="earn" />
      </Footer>
    </Layout>
  );
}
