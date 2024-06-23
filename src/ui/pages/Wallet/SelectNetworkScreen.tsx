import { Column, Content, Header, Image, Layout } from '@/ui/components';

import { useNavigate } from '../MainRoute';

export default function SelectNetworkScreen() {
  // TODO: set select network

  const navigate = useNavigate();

  function handleSelectNetwork() {
    navigate('SelectCryptoScreen');
  }

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Select network"
      />
      <Content style={{
        backgroundColor: '#09090A'
      }}>
        <Column onClick={() => handleSelectNetwork()}>
          <Image
            style={{
              cursor: 'pointer'
            }}
            size={'100%'}
            src="/images/icons/wallet/btc-selected.svg"
          />
        </Column>

        <Column onClick={() => handleSelectNetwork()}>
          <Image
            style={{
              cursor: 'pointer'
            }}
            size={'100%'}
            src="/images/icons/wallet/side-select-dark.svg"
          />
        </Column>
      </Content>
    </Layout>
  );
}
