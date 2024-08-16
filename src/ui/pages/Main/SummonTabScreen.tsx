import { useEffect } from 'react';

import { Column, Content, Footer, Layout, Row } from '@/ui/components';
import { NavTabBar } from '@/ui/components/NavTabBar';
import { colors } from '@/ui/theme/colors';
import MainHeader from '@/ui/pages/Main/MainHeader';

import Lottie from 'react-lottie';
import * as animationData from '@/ui/assets/lottie/coming-soon.json';


export default function SettingsTabScreen() {
  // const navigate = useNavigate();
  // const wallet = useWallet();
  // useEffect(() => {

  // }, []);

  return (
    <Layout>
      <MainHeader title={'Explore'} />
      <Content justifyCenter itemsCenter>
        <Column gap={'md'} justifyCenter itemsCenter>
          <Row justifyCenter itemsCenter>
            {/*<Image size={90} src={'/images/icons/main/comimg-soon.svg'} />*/}
            <Lottie options={
              // loop: true,
              {
                autoplay: true,
                animationData: animationData
              }
            }
                    width={180} />
          </Row>
          <Row style={{
            position: 'relative',
            top: '-80px'
          }}>
            <span style={{
              fontSize: '14px',
              color: colors.white
            }}> Comming soon </span>
          </Row>
        </Column>
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="explore" />
      </Footer>
    </Layout>
  );
}
