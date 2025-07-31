import Lottie from 'react-lottie';
import 'swiper/css';

import successAnimation from '@/ui/assets/lottie/correct.json';
import { Button, Column, Content, Footer, Layout, Row, Text } from '@/ui/components';
import { NavTabBar } from '@/ui/components/NavTabBar';
import MainHeader from '@/ui/pages/Main/MainHeader';
import { useTxIdUrl } from '@/ui/state/settings/hooks';
import { useLocationState } from '@/ui/utils';
import { Box } from '@mui/material';

import { useNavigate } from '../MainRoute';

interface SwapSideSuccessLocationState {
  txid: string;
}

export default function SwapSideSuccessScreen() {
  const state = useLocationState<SwapSideSuccessLocationState>();
  const navigate = useNavigate();
  const txid = state?.txid;

  const txIdUrl = useTxIdUrl(txid || '');

  return (
    <Layout>
      <MainHeader title={''} />
      <Content gap="lg" mt="xl">
        <Column mb="lg" itemsCenter>
          <Box>
            <Lottie
              options={{
                loop: false,
                autoplay: true,
                animationData: successAnimation
              }}
              width={100}
            />
          </Box>

          <Text text="Completed" color="green_success" size="xl" preset="bold"></Text>
        </Column>

        <Text
          text="This transaction requires 2 Bitcoin confirmations to complete. You can track the progress below."
          color="white"
          size="xs"
          textCenter></Text>

        <Row fullX mt="sm">
          <Button
            onClick={() => {
              window.open(txIdUrl, '_blank');
            }}
            preset="primary"
            text="View Tx"
            full></Button>
        </Row>
        <Row fullX mt="sm">
          <Button
            onClick={() => {
              navigate('MainScreen');
            }}
            preset="default"
            text="Close"
            full></Button>
        </Row>
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="swap" />
      </Footer>
    </Layout>
  );
}
