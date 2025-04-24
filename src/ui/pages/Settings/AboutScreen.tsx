import { useState } from 'react';

import { DISCORD_URL, TELEGRAM_URL, TWITTER_URL } from '@/shared/constant';
import { Card, Column, Content, Header, Icon, Image, Layout, Row, Text } from '@/ui/components';
import { colors } from '@/ui/theme/colors';
import { copyToClipboard } from '@/ui/utils';
import { Box } from '@mui/material';

const packageConfig = require('../../../../package.json');

export default function AboutScreen() {
  const [isClickCopy, setIsClickCopy] = useState(false);

  function copy(str: string) {
    copyToClipboard(str).then(() => {
      setTimeout(() => {
        setIsClickCopy(false);
      }, 3000);
    });
  }

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="About"
      />
      <Content justifyBetween>
        <Column>
          <Column mb="x3l" py="xl" gap="xl" justifyCenter itemsCenter>
            <Image src={'/images/logo/wallet-logo.png'} height={78} width={78} />

            <Image src={'/images/icons/side_wallet.svg'} height={20} width={186} />
          </Column>

          <Column gap="lg">
            <Card
              style={{
                height: '58px',
                borderRadius: '10px',
                backgroundColor: colors.card_bgColor
              }}>
              <Row
                style={{
                  padding: '0 8px'
                }}
                justifyBetween
                itemsCenter
                full>
                <Text preset="regular" text={'Terms of Service'}></Text>
                <Icon
                  onClick={() => {
                    window.open('https://docs.side.one/about/privacy-policy ', '_blank');
                  }}
                  icon={'link'}
                  size={18}></Icon>
              </Row>
            </Card>

            <Card
              style={{
                height: '58px',
                borderRadius: '10px',
                backgroundColor: colors.card_bgColor
              }}>
              <Row
                style={{
                  padding: '0 8px'
                }}
                justifyBetween
                itemsCenter
                full>
                <Text preset="regular" text={'Privacy Policy'}></Text>

                <Icon
                  onClick={() => {
                    window.open('https://docs.side.one/about/privacy-policy ', '_blank');
                  }}
                  icon={'link'}
                  size={18}></Icon>
              </Row>
            </Card>

            <Card
              style={{
                height: '58px',
                borderRadius: '10px',
                backgroundColor: colors.card_bgColor
              }}>
              <Row
                style={{
                  padding: '0 8px'
                }}
                justifyBetween
                itemsCenter
                full>
                <Text preset="regular" text={'Contact us'}></Text>

                <Row itemsCenter>
                  <Text
                    preset="sub"
                    text="contact@side.one"
                    style={{
                      color: 'white'
                    }}></Text>
                  <Icon
                    className={'copy-icon'}
                    onClick={(e) => {
                      e.stopPropagation();
                      copy('contact@side.one');
                      setIsClickCopy(true);
                    }}
                    icon={isClickCopy ? 'check-circle-broken' : 'copy2'}
                    color={isClickCopy ? 'primary' : 'white'}
                    size={20}
                  />
                  {isClickCopy ? <Text text={'Copied'} color={isClickCopy ? 'primary' : 'white'} /> : null}
                </Row>
              </Row>
            </Card>

            <Card
              style={{
                height: '58px',
                borderRadius: '10px',
                backgroundColor: colors.card_bgColor
              }}>
              <Row
                style={{
                  padding: '0 8px'
                }}
                justifyBetween
                itemsCenter
                full>
                <Text preset="regular" text={'Version'}></Text>

                <Text
                  preset="sub"
                  text={`v${packageConfig.version}`}
                  style={{
                    color: 'white'
                  }}></Text>
              </Row>
            </Card>
          </Column>
        </Column>

        <Column>
          <Row justifyCenter gap="x3l" mt="lg">
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              sx={{
                border: '0.7px solid #2A2A2A',
                borderRadius: '40px',
                width: '40px',
                height: '40px',
                ':hover': {
                  backgroundColor: '#4D4D4D'
                }
              }}>
              <Icon
                size={20}
                icon="twitter"
                onClick={() => {
                  window.open(TWITTER_URL);
                }}
              />
            </Box>

            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              sx={{
                border: '0.7px solid #2A2A2A',
                borderRadius: '100%',
                width: '40px',
                height: '40px',
                ':hover': {
                  backgroundColor: '#4D4D4D'
                }
              }}>
              <Icon
                size={20}
                icon="telegram"
                onClick={() => {
                  window.open(TELEGRAM_URL);
                }}
              />
            </Box>

            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              sx={{
                border: '0.7px solid #2A2A2A',
                borderRadius: '100%',
                width: '40px',
                height: '40px',
                ':hover': {
                  backgroundColor: '#4D4D4D'
                }
              }}>
              <Icon
                contain={'contain'}
                icon="discord"
                size={20}
                onClick={() => {
                  window.open(DISCORD_URL);
                }}
              />
            </Box>
          </Row>
        </Column>
      </Content>
    </Layout>
  );
}
