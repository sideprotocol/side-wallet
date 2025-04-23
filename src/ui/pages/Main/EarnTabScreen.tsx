import 'swiper/css';

import { Column, Content, Footer, Layout, Text } from '@/ui/components';
import { NavTabBar } from '@/ui/components/NavTabBar';
import MainHeader from '@/ui/pages/Main/MainHeader';

export default function EarnTabScreen() {
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
