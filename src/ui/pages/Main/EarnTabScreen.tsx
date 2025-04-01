import 'swiper/css';

import { Content, Footer, Icon, Layout, Row, Text } from '@/ui/components';
import { NavTabBar } from '@/ui/components/NavTabBar';
import MainHeader from '@/ui/pages/Main/MainHeader';
import { colors } from '@/ui/theme/colors';
import { Box } from '@mui/material';

import { useNavigate } from '../MainRoute';

export default function EarnTabScreen() {
  const navigator = useNavigate();
  return (
    <Layout>
      <MainHeader title={''} />
      <Content gap="lg" mt="lg">
        <Box p={1.5} bgcolor={'#222222'} color={colors.white_muted} borderRadius={'10px'}>
          <Row itemsCenter>
            <Icon icon="alert-circle" color={'search_icon'} size={24}></Icon>

            <Text
              text="Note:"
              color="search_icon"
              size="sm"
              style={{
                fontWeight: 600
              }}></Text>
          </Row>

          <Row mt="lg">
            <Text
              color="search_icon"
              size="xs"
              text="This feature allows you to earn interest by providing liquidity to the lending pool. Please use the web app to withdraw your assets from the pool."></Text>
          </Row>
        </Box>
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="earn" />
      </Footer>
    </Layout>
  );
}
