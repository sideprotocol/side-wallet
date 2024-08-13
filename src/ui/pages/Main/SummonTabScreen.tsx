import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ADDRESS_TYPES, KEYRING_TYPE, NETWORK_TYPES } from '@/shared/constant';
import { Card, Column, Content, Footer, Header, Image, Layout, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { Button } from '@/ui/components/Button';
import { Icon, IconTypes } from '@/ui/components/Icon';
import { getCurrentTab, useExtensionIsInTab, useOpenExtensionInTab } from '@/ui/features/browser/tabs';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useCurrentKeyring } from '@/ui/state/keyrings/hooks';
import { useNetworkType } from '@/ui/state/settings/hooks';
import { spacing } from '@/ui/theme/spacing';
import { useWallet } from '@/ui/utils';
import { RightOutlined } from '@ant-design/icons';
import { NavTabBar } from '@/ui/components/NavTabBar';
import { colors } from '@/ui/theme/colors';
import MainHeader from '@/ui/pages/Main/MainHeader';

import Lottie from 'react-lottie';
import * as animationData from '@/ui/assets/lottie/coming-soon.json';


export default function SettingsTabScreen() {
  // const navigate = useNavigate();
  // const wallet = useWallet();
  useEffect(() => {

  }, []);

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
