import { useMemo, useState } from 'react';
import 'swiper/css';

import { NetworkType } from '@/shared/types';
import { Column, Content, Footer, Icon, Image, Layout, Row, Text } from '@/ui/components';
import SearchInput from '@/ui/components/Input/Search';
import { NavTabBar } from '@/ui/components/NavTabBar';
import useGetPoolsData from '@/ui/hooks/useGetPoolsData';
import MainHeader from '@/ui/pages/Main/MainHeader';
import { useReloadAccounts } from '@/ui/state/accounts/hooks';
import { useChangeEnvironmentCallback, useEnvironment } from '@/ui/state/environment/hooks';
import { useChangeNetworkTypeCallback, useNetworkType } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { Stack, Typography } from '@mui/material';

import { useNavigate } from '../MainRoute';

export default function EarnTabScreen() {
  const networkType = useNetworkType();
  const [value, setValue] = useState('');
  const { data } = useGetPoolsData();
  const navigate = useNavigate();
  const { SIDE_STATION_URL } = useEnvironment();
  const changeEnvironment = useChangeEnvironmentCallback();
  const changeNetworkType = useChangeNetworkTypeCallback();
  const reloadAccounts = useReloadAccounts();

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
            gap="md"
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
            <Text
              text="SWITCH TO TESTNET"
              color="white"
              style={{
                fontWeight: 700
              }}
              onClick={() => {
                changeEnvironment(NetworkType.TESTNET);
                changeNetworkType(NetworkType.TESTNET);
                reloadAccounts();
                navigate('MainScreen');
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
            itemsCenter
            bg="card_bgColor"
            style={{
              height: '98px',
              width: '100%',
              flexShrink: 0,
              borderRadius: '10px',
              backgroundColor: colors.card_bgColor,
              position: 'relative'
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="245"
              height="98"
              viewBox="0 0 245 98"
              fill="none"
              style={{
                position: 'absolute',
                top: '50%',
                right: '0',
                transform: 'translateY(-50%)'
              }}>
              <path
                d="M57.114 107.107C71.8744 104.565 84.2531 97.761 93.6479 86.0055L94.1093 85.4218C103.739 73.0814 107.862 59.0032 106.199 43.4374L106.115 42.6948C104.634 30.1601 99.5675 19.2168 90.9935 10.0164L90.1524 9.13179C81.3486 0.0320937 70.6362 -5.51215 58.2558 -7.81521C64.1944 -8.37676 70.0674 -8.0115 75.8808 -6.73357L77.0631 -6.46044C80.1567 -5.71271 83.1575 -4.7082 86.0845 -3.47428L87.3349 -2.93124L87.337 -2.93113C87.4453 -2.88361 87.5547 -2.85463 87.6485 -2.83304C87.7378 -2.8125 87.803 -2.79917 87.8711 -2.78203L96.0477 1.85586C98.6617 3.80032 101.23 5.77026 103.591 8.00612L103.59 8.00564C119.411 22.9914 125.411 46.3666 118.789 67.0591L118.464 68.0423C113.893 81.4532 105.609 91.8929 93.585 99.1427L92.4104 99.8338C81.4711 106.12 69.6489 108.503 57.114 107.107Z"
                stroke="url(#paint0_linear_23917_13437)"
                strokeWidth="0.614098"
              />
              <path
                d="M269.752 107.892C255.089 104.837 242.955 97.6052 233.976 85.5291L233.535 84.9297C224.342 72.2609 220.713 58.0474 222.918 42.5491L223.028 41.8099C224.945 29.3345 230.39 18.5745 239.28 9.67887L240.151 8.82417C249.267 0.037142 260.167 -5.13 272.62 -6.99975C266.704 -7.76813 260.822 -7.60799 254.968 -6.53365L253.777 -6.30193C250.659 -5.66258 247.625 -4.76337 244.657 -3.63232L243.388 -3.13323L243.386 -3.13319C243.276 -3.08948 243.166 -3.06434 243.071 -3.04603C242.981 -3.02862 242.916 -3.01757 242.847 -3.00281L234.513 1.347C231.833 3.19907 229.198 5.07822 226.76 7.23034L226.761 7.22989C210.427 21.6546 203.615 44.8063 209.511 65.7172L209.802 66.7111C213.903 80.2734 221.817 90.9956 233.581 98.6605L234.73 99.3922C245.444 106.056 257.176 108.851 269.752 107.892Z"
                stroke="url(#paint1_linear_23917_13437)"
                strokeWidth="0.614098"
              />
              <path
                d="M111.327 144.63C111.358 129.652 115.991 116.308 126.005 105.075L126.503 104.523C137.054 92.9606 150.242 86.5359 165.866 85.5657L166.613 85.524C179.218 84.8819 190.856 88.0425 201.364 94.9528L202.377 95.6336C212.824 102.787 220.085 112.419 224.431 124.238C223.989 118.289 222.645 112.56 220.41 107.043L219.943 105.924C218.687 102.999 217.193 100.209 215.486 97.5305L214.741 96.3889L214.741 96.3868C214.676 96.288 214.629 96.185 214.592 96.0962C214.557 96.0116 214.533 95.9496 214.504 95.8853L208.561 88.6019C206.206 86.3509 203.834 84.1493 201.233 82.1964L201.234 82.1972C183.808 69.113 159.758 67.116 140.468 77.1138L139.554 77.5993C127.099 84.3541 118.196 94.2707 113.064 107.34L112.58 108.614C108.217 120.452 107.849 132.506 111.327 144.63Z"
                stroke="url(#paint2_linear_23917_13437)"
                strokeWidth="0.614098"
              />
              <path
                d="M222.619 -37.7276C221.28 -22.81 215.5 -9.92128 204.544 0.393971L203.999 0.901028C192.478 11.4976 178.78 16.7461 163.131 16.3481L162.384 16.3245C149.77 15.8633 138.453 11.6985 128.589 3.89704L127.639 3.13035C117.857 -4.90825 111.464 -15.1369 108.167 -27.2904C108.087 -21.3258 108.927 -15.5016 110.671 -9.81065L111.039 -8.65439C112.034 -5.63144 113.278 -2.72171 114.745 0.0958442L115.388 1.29812L115.388 1.30029C115.444 1.40437 115.482 1.51108 115.511 1.60282C115.539 1.6901 115.557 1.75403 115.58 1.82052L120.864 9.59505C123.014 12.0432 125.185 14.4435 127.605 16.616L127.604 16.6152C143.821 31.1711 167.605 35.2608 187.694 26.9856L188.647 26.5819C201.644 20.9406 211.379 11.8394 217.633 -0.731793L218.226 -1.95843C223.606 -13.3704 225.026 -25.3468 222.619 -37.7276Z"
                stroke="url(#paint3_linear_23917_13437)"
                strokeWidth="0.614098"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_23917_13437"
                  x1="122.182"
                  y1="44.9774"
                  x2="94.9727"
                  y2="46.4216"
                  gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F7771A" />
                  <stop offset="1" stopColor="#17171C" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_23917_13437"
                  x1="206.891"
                  y1="43.5306"
                  x2="234.033"
                  y2="45.9231"
                  gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F7771A" />
                  <stop offset="1" stopColor="#17171C" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_23917_13437"
                  x1="161.669"
                  y1="70.0668"
                  x2="164.807"
                  y2="97.1331"
                  gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F7771A" />
                  <stop offset="1" stopColor="#17171C" />
                </linearGradient>
                <linearGradient
                  id="paint3_linear_23917_13437"
                  x1="165.959"
                  y1="32.1544"
                  x2="165.197"
                  y2="4.91747"
                  gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F7771A" />
                  <stop offset="1" stopColor="#17171C" />
                </linearGradient>
              </defs>
            </svg>
            <Stack gap="4px">
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: colors.white,
                  ml: '16px'
                }}>
                Deposit to&nbsp;
                <small
                  style={{
                    fontSize: '100%',
                    color: colors.main
                  }}>
                  Side Chain
                </small>
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: colors.white,
                  ml: '16px'
                }}>
                Start earning yield
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{
                position: 'absolute',
                right: '48px',
                top: '40px',
                zIndex: 10,
                borderRadius: '20px',
                height: '22px',
                width: '64px',
                fontSize: '8px',
                fontWeight: 600,
                color: colors.white,
                border: `1px solid ${colors.white1}`,
                cursor: 'pointer',
                transition: '.4s',
                ':hover': {
                  background: colors.white,
                  color: colors.main
                }
              }}
              onClick={() => {
                window.open('https://go.skip.build/');
              }}>
              Borrow Here
            </Stack>
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
