import { DISCORD_URL, TELEGRAM_URL, TWITTER_URL } from '@/shared/constant';
import { Card, Column, Content, Header, Icon, Image, Layout, Row, Text } from '@/ui/components';
import aboutIcon from '@/ui/assets/icons/about.svg'

export default function AboutScreen() {
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
          <Column
            style={{
              paddingTop: '30px',
              paddingBottom: '25px'
            }}>
            <Image
              src={aboutIcon}
              size={120}
              style={{
                borderRadius: '50%',
                margin: 'auto'
              }}
            />

            <Text
              style={{
                fontSize: '24px',
                fontWeight: '600',
                textAlign: 'center',
                paddingTop: '20px'
              }}
              text="Side Wallet"></Text>
          </Column>

          <Column>
            <Card style={{
              height: '58px',
              borderRadius: '10px',
            }} mt={'md'}>
              <Row style={{
                padding: '0 8px'
              }} justifyBetween itemsCenter full>
                <Text preset="regular" text={'Terms of Service'}></Text>
                <Icon icon={'link'} size={18}></Icon>
              </Row>
            </Card>

            <Card style={{
              height: '58px',
              borderRadius: '10px',
            }} mt={'md'}>
              <Row style={{
                padding: '0 8px'
              }} justifyBetween itemsCenter full>
                <Text preset="regular" text={'Privacy Policy'}></Text>

                <Icon icon={'link'} size={18}></Icon>
              </Row>
            </Card>

            <Card style={{
              height: '58px',
              borderRadius: '10px',
            }} mt={'md'}>
              <Row style={{
                padding: '0 8px'
              }} justifyBetween itemsCenter full>
                <Text preset="regular" text={'Contact us'}></Text>

                <Row itemsCenter>
                  <Text preset="sub" text="contact@side.one"></Text>
                  <Icon icon={'copy2'} size={20}></Icon>
                </Row>
              </Row>
            </Card>
          </Column>
        </Column>

        <Column>
          <Row justifyCenter gap="x3l" mt="lg">
            <Row
              itemsCenter
              justifyCenter
              style={{
                border: '0.7px solid #2A2A2A',
                borderRadius: '100%',
                width: '40px',
                height: '40px'
              }}>
              <Icon
                size={20}
                icon="twitter"
                onClick={() => {
                  window.open(TWITTER_URL);
                }}
              />
            </Row>

            <Row
              itemsCenter
              justifyCenter
              style={{
                border: '0.7px solid #2A2A2A',
                borderRadius: '100%',
                width: '40px',
                height: '40px'
              }}>
              <Icon
                size={20}
                icon="telegram"
                onClick={() => {
                  window.open(TELEGRAM_URL);
                }}
              />
            </Row>

            <Row
              itemsCenter
              justifyCenter
              style={{
                border: '0.7px solid #2A2A2A',
                borderRadius: '100%',
                width: '40px',
                height: '40px'
              }}>
              <Icon
                icon="discord"
                size={20}
                onClick={() => {
                  window.open(DISCORD_URL);
                }}
              />
            </Row>
          </Row>
        </Column>
      </Content>
    </Layout>
  );
}
