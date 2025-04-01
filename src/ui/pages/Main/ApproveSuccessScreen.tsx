import 'swiper/css';

import { SIDE_HUB_URL } from '@/shared/constant';
import { Button, Column, Content, Footer, Layout, Row, Text } from '@/ui/components';
import { NavTabBar } from '@/ui/components/NavTabBar';
import MainHeader from '@/ui/pages/Main/MainHeader';
import { useLocationState } from '@/ui/utils';

interface ApproveSuccessLocationState {
  loanId: string;
}

export default function ApproveSuccessScreen() {
  const { loanId } = useLocationState<ApproveSuccessLocationState>();

  return (
    <Layout>
      <MainHeader title={''} />
      <Content gap="lg" mt="xl">
        <Column mb="lg" itemsCenter>
          <svg width="81" height="80" viewBox="0 0 81 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle opacity="0.8" cx="40.5" cy="40" r="40" fill="#003D1A" />
            <circle cx="40.5" cy="40" r="24" fill="#20D76D" />
            <path
              d="M36.3024 49.9999C35.354 50.0059 34.4414 49.6416 33.7627 48.986L26.3678 41.9086C26.0936 41.6504 25.8753 41.3398 25.7261 40.9957C25.5769 40.6515 25.5 40.2809 25.5 39.9064C25.5 39.5319 25.5769 39.1613 25.7261 38.8171C25.8753 38.4729 26.0936 38.1623 26.3678 37.9042C27.5225 36.7972 29.3952 36.7972 30.5526 37.9042L36.3024 43.4068L49.4498 30.8302C50.6045 29.7233 52.4772 29.7233 53.6346 30.8302C53.9081 31.0887 54.1258 31.3995 54.2746 31.7436C54.4233 32.0877 54.5 32.4581 54.5 32.8324C54.5 33.2067 54.4233 33.5771 54.2746 33.9212C54.1258 34.2654 53.9081 34.5761 53.6346 34.8346L38.8324 48.9973C38.1541 49.6462 37.2458 50.0061 36.3024 49.9999Z"
              fill="white"
            />
          </svg>

          <Text text="Loan Approved" color="green_success" size="xl" preset="bold"></Text>
        </Column>

        <Text
          text="Collateral received. Your loan will be sent to your wallet after 6 confirmations. You can track and manage your position in the web app."
          color="white"
          size="xs"></Text>

        <Row fullX mt="sm">
          <Button
            onClick={() => {
              window.open(`${SIDE_HUB_URL}/loan/${loanId}`, '_blank');
            }}
            preset="primary"
            text="Open Web App"
            full></Button>
        </Row>
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="loans" />
      </Footer>
    </Layout>
  );
}
