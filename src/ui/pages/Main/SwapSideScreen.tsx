import BigNumber from 'bignumber.js';
import { useMemo, useState } from 'react';
import 'swiper/css';

import { Button, Column, Content, Footer, Grid, Image, Layout, Row, Text } from '@/ui/components';
import { CoinInput } from '@/ui/components/CoinInput';
import { NavTabBar } from '@/ui/components/NavTabBar';
import useGetBitcoinBalanceList from '@/ui/hooks/useGetBitcoinBalanceList';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { colors } from '@/ui/theme/colors';
import { Box } from '@mui/material';

import MainHeader from './MainHeader';

export default function SwapSideScreen() {
  const currentAccount = useCurrentAccount();

  const [sideAmount, setSideAmount] = useState('');

  const [satAmount, setSatAmount] = useState('');

  const [rateExchange, setRateExchange] = useState(false);
  const { balanceList } = useGetSideBalanceList(currentAccount?.address);

  const { balanceList: bitcoinBalanceList } = useGetBitcoinBalanceList(currentAccount?.address);

  const sideBalance = balanceList.find((b) => b.denom === 'uside');

  const satBalance = bitcoinBalanceList.find((b) => b.denom === 'sat');

  const satValue = useMemo(() => {
    return (
      '$' +
      BigNumber(satAmount || '0')
        .times(satBalance?.denomPrice || 0)
        .toFormat()
    );
  }, [satAmount, satBalance]);

  return (
    <Layout>
      <MainHeader title={'Swap SIDE'} />
      <Content gap="lg" mt="md">
        <Column
          gap="xs"
          style={{
            borderRadius: '10px'
          }}
          px="lg"
          py="md">
          <Row px="md" full justifyBetween itemsCenter>
            <Text color="white" size="xs">
              How much would you like to buy?
            </Text>
          </Row>

          <Row
            bg="card_bgColor"
            style={{
              height: 68
            }}
            px="md"
            itemsCenter
            rounded
            py="md">
            <Row
              style={{
                flexShrink: 0
              }}
              rounded={true}
              px="lg"
              py="md"
              bg="black">
              <Image src={sideBalance?.asset.logo} height={24} width={24}></Image>

              <Text text={sideBalance?.asset.symbol || 'BTC'} color="white" size="md"></Text>
            </Row>

            <Box py={'2px'} display={'flex'} justifyContent={'space-between'} gap={'2px'} height={'max-content'}>
              <CoinInput
                size={22}
                coin={{
                  amount: sideAmount,
                  denom: sideBalance?.denom || 'uside'
                }}
                onChange={(value) => {
                  setSideAmount(value);
                }}></CoinInput>

              <Grid
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '4px'
                }}>
                {['100', '200', '500', '800'].map((item) => (
                  <Box
                    key={item}
                    sx={{
                      fontSize: '8px',
                      borderRadius: '4px',
                      bgcolor: colors.white1,
                      p: '0px 4px',
                      height: '20px',
                      color: colors.white2,
                      width: 'max-content',
                      cursor: 'pointer',
                      ':hover': {
                        color: colors.main
                      }
                    }}
                    onClick={() => {
                      setSideAmount(item);
                    }}>
                    {item}
                  </Box>
                ))}
              </Grid>
            </Box>
          </Row>

          <Row px="md" full justifyBetween itemsCenter mt="lg">
            <Text color="white" size="xs">
              You need to pay
            </Text>
          </Row>

          <Row
            bg="card_bgColor"
            style={{
              height: 68
            }}
            px="md"
            itemsCenter
            rounded
            py="md">
            <Row
              style={{
                flexShrink: 0
              }}
              rounded={true}
              py="md"
              px="lg"
              itemsCenter
              bg="black">
              <Image src={satBalance?.asset.logo} height={24} width={24}></Image>

              <Text text={satBalance?.asset.symbol || 'BTC'} color="white" size="md"></Text>
            </Row>

            <Box py={'2px'} display={'flex'} alignItems={'center'} justifyContent={'space-between'} gap={'2px'}>
              <CoinInput
                readOnly
                onChange={(_) => null}
                size={22}
                coin={{
                  amount: satAmount,
                  denom: satBalance?.denom || 'uusdc'
                }}></CoinInput>

              <Box>
                <Text text={satValue} color="grey12" size="xs"></Text>
              </Box>
            </Box>
          </Row>

          <Column rounded px="lg" py="md" full justifyBetween bg="card_bgColor" mt="lg">
            <Row itemsCenter justifyBetween>
              <Row itemsCenter gap="xs">
                <Text text={rateExchange ? 'BTC/SIDE' : 'SIDE/BTC'} color="grey12" size="sm"></Text>
                <Box
                  sx={{
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setRateExchange((b) => !b);
                  }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1.66797 10.3333H12.3346M12.3346 10.3333L9.66797 7.66667M12.3346 10.3333L9.66797 13M12.3346 3.66667H1.66797M1.66797 3.66667L4.33464 1M1.66797 3.66667L4.33464 6.33333"
                      stroke="#6C7080"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Box>
              </Row>

              <Text text="809523.32" color="white" size="sm"></Text>
            </Row>

            <Row itemsCenter justifyBetween>
              <Text text="Estimated Time" color="grey12" size="sm"></Text>

              <Text text="~ 10 minutes" color="white" size="sm"></Text>
            </Row>
          </Column>

          <Row>
            <Text color="red" size="xs">
              Max purchase amount: 800
            </Text>
          </Row>

          <Row fullX mt="xl">
            <Button text="Buy Now" preset="primary" full></Button>
          </Row>
        </Column>
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="swap" />
      </Footer>
    </Layout>
  );
}
