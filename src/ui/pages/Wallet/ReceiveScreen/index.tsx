import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { CHAINS_ENUM } from '@/shared/constant';
import { BalanceItem } from '@/shared/types';
import { Button, Column, Content, Header, Icon, Layout, Row, Text } from '@/ui/components';
import { colors } from '@/ui/theme/colors';
import { copyToClipboard } from '@/ui/utils';

import './index.less';

export default function ReceiveScreen() {
  const { state } = useLocation();
  const { chain, token, addressType, address } = state as {
    chain: CHAINS_ENUM;
    token: BalanceItem;
    addressType: string;
    address: string;
  };
  const [isClickCopy, setIsClickCopy] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Layout>
      <Header title="Receive" />
      <Content
        style={{
          marginTop: '32px'
        }}>
        <Column full itemsCenter style={{ position: 'relative' }}>
          <QRCodeSVG
            style={{
              borderRadius: '10px'
            }}
            includeMargin
            bgColor={colors.white}
            fgColor={colors.black}
            value={address || ''}
            size={140}></QRCodeSVG>

          <Row itemsCenter mt="lg" mb="lg">
            <Text
              color="white"
              size="md"
              text={`Your ${chain === CHAINS_ENUM.BTC ? 'Bitcoin' : 'Side Chain'} (${addressType}) Address`}></Text>
          </Row>

          <Row fullX bg="card_bgColor" px="lg" py="lg" itemsCenter style={{ borderRadius: '10px' }}>
            <Text color="white" size="sm" wrap text={address}></Text>
          </Row>

          <Row
            onClick={(e) => {
              copyToClipboard(address).then(() => {
                // tools.toastSuccess('Copied');
                setTimeout(() => {
                  setIsClickCopy(false);
                }, 3000);
              });
              setIsClickCopy(true);
            }}
            fullX
            px="lg"
            bg="card_bgColor"
            py="lg"
            itemsCenter
            style={{ borderRadius: '10px' }}
            justifyCenter>
            <Icon
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
              icon={isClickCopy ? 'check-circle-broken' : 'copy2'}
              color={isClickCopy ? 'primary' : isHovered ? 'main' : 'white'}
              containerStyle={{
                display: 'inline-block',
                position: 'relative'
              }}></Icon>
            <Text color={isClickCopy ? 'primary' : 'white'} size="sm" text={isClickCopy ? 'Copied' : 'Copy'}></Text>
          </Row>

          <Row fullX style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} mt="lg">
            <Button
              onClick={() => {
                window.history.go(-1);
              }}
              preset="default"
              text="Close"
              full></Button>
          </Row>
        </Column>
      </Content>
    </Layout>
  );
}
