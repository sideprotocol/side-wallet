import { Column, Content, Header, Layout, Row, Text } from '@/ui/components';
import { shortAddress } from '@/ui/utils';

import { useNavigate } from '../MainRoute';

interface Address {
  type: string;
  address: string;
  balance: string;
  value: string;
}

export default function SelecAddressScreen() {
  // TODO: set select network

  const navigate = useNavigate();

  const addresses: Address[] = [
    {
      type: 'Taproot',
      address: 'bc1pq2323232323cn3q',
      balance: '1',
      value: '$1'
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
          {addresses.map((item) => {
            return (
              <Row
                style={{
                  cursor: 'pointer'
                }}
                full
                onClick={() => {
                  navigate('ReceiveScreen');
                }}
                key={item.address}
                justifyBetween>
                <Column>
                  <Text preset="regular" text={item.type}></Text>
                  <Text preset="sub" text={shortAddress(item.address)}></Text>
                </Column>

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
