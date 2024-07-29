import { Column, Content, Header, Layout, Row, Text } from '@/ui/components';
import { shortAddress } from '@/ui/utils';

import { useNavigate } from '../MainRoute';
import { useAccountAddress, useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useLocation } from 'react-router-dom';

interface Address {
  type: string;
  address: string;
  balance: string;
  value: string;
}

export default function SelecAddressScreen() {
  // TODO: set select network

  const currentAccount = useCurrentAccount();
  const address = useAccountAddress();
  const { state } = useLocation();
  const navigate = useNavigate();

  const addresses: Address[] = [
    {
      type: 'Taproot',
      address: address,
      balance: '',
      value: ''
    }
  ];

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Select address type"
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
                  navigate('ReceiveScreen', {
                    ...state
                  });
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
