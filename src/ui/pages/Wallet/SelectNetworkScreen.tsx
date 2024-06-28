import { useLocation } from 'react-router-dom';

import { CHAINS_ENUM } from '@/shared/constant';
import { Column, Content, Header, Image, Layout } from '@/ui/components';

import { useNavigate } from '../MainRoute';

export default function SelectNetworkScreen() {
  // TODO: set select network

  const navigate = useNavigate();
  const { state } = useLocation();
  const { type } = state as {
    type: 'receive' | 'send';
  };

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Select network"
      />
      <Content
        style={{
          backgroundColor: '#09090A'
        }}>
        <Column
          onClick={() => {
            navigate('SelectCryptoScreen', {
              chain: CHAINS_ENUM.BTC,
              type
            });
          }}>
          <Image
            style={{
              cursor: 'pointer'
            }}
            size={'100%'}
            src="/images/icons/wallet/btc-selected.svg"
          />
        </Column>

        <Column
          onClick={() => {
            navigate('SelectCryptoScreen', {
              chain: CHAINS_ENUM.SIDE,
              type
            });
          }}>
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
