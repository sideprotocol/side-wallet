import { Column, Content, Header, Icon, Image, Input, Layout, Row, Text } from '@/ui/components';

import { useNavigate } from '../MainRoute';

interface Asset {
  icon: string;
  name: string;
  symbol: string;
  balance: string;
  value: string;
}

export default function SelecCryptoScreen() {
  // TODO: set select network

  const navigate = useNavigate();

  const assets: Asset[] = [
    {
      icon: '/images/img/btc.png',
      name: 'Bitcoin',
      symbol: 'BTC',
      balance: '1',
      value: '1'
    }
  ];

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Select crypto"
      />
      <Content>
        <Column>
          <Row
            style={{
              padding: '0px 10px',
              borderRadius: '12px',
              backgroundColor: '#1E1E1F'
            }}
            itemsCenter
            bg="search_box_bg"
            full>
            <Icon icon="search" color={'search_icon'} size={20}></Icon>

            <Input
              containerStyle={{
                width: '100%',
                border: 'none',
                padding: '0'
              }}
              placeholder="Search crypto"
            />
          </Row>
        </Column>

        <Column>
          {assets.map((item) => {
            return (
              <Row
                onClick={() => {
                  navigate('SelectAddressScreen');
                }}
                full
                key={item.symbol + item.name}
                justifyBetween
                style={{
                  cursor: 'pointer'
                }}>
                <Row>
                  <Image src={item.icon} size={42}></Image>
                  <Column>
                    <Text preset="regular" text={item.symbol}></Text>
                    <Text preset="sub" text={item.name}></Text>
                  </Column>
                </Row>

                <Column>
                  <Text preset="regular" text={item.balance}></Text>
                  <Text preset="sub" text={item.value}></Text>
                </Column>
              </Row>
            );
          })}
        </Column>
      </Content>
    </Layout>
  );
}
