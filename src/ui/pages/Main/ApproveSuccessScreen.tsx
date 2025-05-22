import Lottie from 'react-lottie';
import 'swiper/css';

import successAnimation from '@/ui/assets/lottie/correct.json';
import { Button, Column, Content, Footer, Layout, Row, Text } from '@/ui/components';
import { NavTabBar } from '@/ui/components/NavTabBar';
import MainHeader from '@/ui/pages/Main/MainHeader';
import { useBridgeParams } from '@/ui/state/bridge/hook';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useLocationState } from '@/ui/utils';
import { Box } from '@mui/material';

import { useNavigate } from '../MainRoute';

interface ApproveSuccessLocationState {
  loanId: string;
}

export default function ApproveSuccessScreen() {
  const { loanId } = useLocationState<ApproveSuccessLocationState>();
  const { SIDE_STATION_URL } = useEnvironment();
  const navigate = useNavigate();
  const { params } = useBridgeParams();

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

          <Text text="Loan Approved" color="green_success" size="xl" preset="bold"></Text>
        </Column>

        <Text
          text={`Collateral received. Your loan will be sent to your wallet after ${
            params?.params?.confirmations || 6
          } confirmations. You can track and manage your position in the web app.`}
          color="white"
          size="xs"
          textCenter></Text>

        <Row fullX mt="sm">
          <Button
            onClick={() => {
              navigate('MainScreen');
            }}
            preset="primary"
            text="Close"
            full></Button>
        </Row>
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="loans" />
      </Footer>
    </Layout>
  );
}
