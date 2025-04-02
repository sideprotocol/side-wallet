import QRCode from 'qrcode.react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { CHAINS_ENUM } from '@/shared/constant';
import { BalanceItem } from '@/shared/types';
import { Button, Card, Column, Content, Header, Icon, Layout, Row, Text } from '@/ui/components';
import { colors } from '@/ui/theme/colors';
import { sizes } from '@/ui/theme/spacing';
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
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Receive"
      />
      <Content
        style={{
          marginTop: '32px'
        }}>
        <Card
          bg="white"
          gap="lg"
          style={{
            flexDirection: 'column',
            justifyItems: 'start',
            borderRadius: '14px'
          }}>
          <Row full itemsCenter>
            {/* <ImageIcon
              url={token.asset.logo}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%'
              }}
            /> */}
            <Column>
              {/* <Row>
                <Text
                  preset="regular"
                  style={{
                    padding: '0'
                  }}
                  color="black"
                  text={token.asset.symbol}></Text>
              </Row> */}

              <Row>
                <Text
                  style={{
                    padding: '4px 8px',
                    borderRadius: '8px'
                  }}
                  color="black"
                  // bg="orange"
                  bg={chain === CHAINS_ENUM.BTC ? 'orange' : 'primary'}
                  preset="sub"
                  text={chain === CHAINS_ENUM.BTC ? 'Bitcoin' : 'Side Chain'}></Text>

                <Text
                  style={{
                    padding: '4px 8px',
                    borderRadius: '8px'
                  }}
                  color="black"
                  preset="sub"
                  bg="light_gray"
                  text={addressType}></Text>
              </Row>
            </Column>
          </Row>

          <Row
            full
            style={{
              height: '1px',
              borderBottom: '1px solid #1E1E1F20'
            }}
            bg="border"></Row>

          <Row
            full
            onClick={(e) => {
              copyToClipboard(address).then(() => {
                // tools.toastSuccess('Copied');
                setTimeout(() => {
                  setIsClickCopy(false);
                }, 3000);
              });
              setIsClickCopy(true);
            }}>
            <Text
              wrap
              text={
                <>
                  {address}
                  <Icon
                    onMouseOver={handleMouseOver}
                    onMouseLeave={handleMouseLeave}
                    icon={isClickCopy ? 'check-circle-broken' : 'copy2'}
                    color={isClickCopy ? 'primary' : isHovered ? 'black' : 'search_icon'}
                    containerStyle={{
                      display: 'inline-block',
                      marginLeft: '8px',
                      position: 'relative',
                      top: '3px'
                    }}></Icon>
                  <span
                    style={{
                      display: isClickCopy ? 'inline-block' : 'none',
                      color: colors.primary,
                      fontSize: '12px',
                      marginLeft: '4px'
                    }}>
                    Copied!
                  </span>
                </>
              }
              style={{
                fontWeight: '400'
              }}
              color="background"></Text>
          </Row>
          <Column>
            <QRCode value={address || ''} renderAs="svg" size={sizes.qrcode}></QRCode>
          </Column>

          <Column>
            <Text
              color="background"
              style={{
                width: '270px',
                margin: 'auto',
                textAlign: 'center'
              }}
              text={`Send only ${chain === CHAINS_ENUM.BTC ? 'BTC' : 'Side'} network assets to this address`}></Text>
          </Column>

          <Row
            style={{
              display: 'none'
            }}
            full>
            <Button full preset="primary" text="Set amount"></Button>
          </Row>
        </Card>
      </Content>
    </Layout>
  );
}
