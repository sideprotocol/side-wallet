import { useState } from 'react';

import { ButtonGroup, Content, Footer, Layout, Row } from '@/ui/components';
import { NavTabBar } from '@/ui/components/NavTabBar';
import Bridge from '@/ui/pages/Bridge';
import MainHeader from '@/ui/pages/Main/MainHeader';
import SkipGo from '@/ui/pages/SkipGo';

const tabArr = [
  {
    key: 0,
    label: 'Bridge'
  },
  {
    key: 1,
    label: 'Swap'
  }
];

export default function BridgeTabScreen() {
  const [curTab, setCurTab] = useState(tabArr[0].key);
  return (
    <Layout>
      <MainHeader title={''} />
      <Content classname={'hide-scrollbar fadeIn-page'}>
        <Row
          justifyCenter
          style={{
            marginTop: '12px'
          }}>
          <ButtonGroup
            size="big"
            rowProps={{
              justifyCenter: true
            }}
            list={tabArr}
            onChange={(value, index) => {
              setCurTab(value as number);
            }}
            value={curTab}
          />
        </Row>
        {curTab === tabArr[0].key ? <Bridge /> : <SkipGo />}
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="bridge" />
      </Footer>
    </Layout>
  );
}
