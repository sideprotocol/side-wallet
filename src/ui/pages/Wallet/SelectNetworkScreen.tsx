import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { CHAINS_ENUM } from '@/shared/constant';
import { Column, Content, Header, Image, Layout } from '@/ui/components';
import { colors } from '@/ui/theme/colors';

import { useNavigate } from '../MainRoute';

export default function SelectNetworkScreen() {
  // TODO: set select network

  const [isCheck, setIsCheck] = useState(false);
  const [number, setNumber] = useState(-1);
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
          backgroundColor: colors.black,
          marginTop: '32px'
        }}>
        <Column
          onClick={() => {
            navigate('SelectCryptoScreen', {
              chain: CHAINS_ENUM.BTC,
              type
            });
            setNumber(0);
            setIsCheck(true);
          }}>
          <Image
            onMouseEnter={() => {
              setNumber(0);
            }}
            onMouseLeave={() => {
              // setNumber(-1);
            }}
            style={{
              cursor: 'pointer'
            }}
            size={'100%'}
            src={number === 0 ? '/images/icons/wallet/btc-selected.svg' : '/images/icons/wallet/btc-select-dark.svg'}
          />
        </Column>

        <Column
          onClick={() => {
            navigate('SelectCryptoScreen', {
              chain: CHAINS_ENUM.SIDE,
              type
            });
            setNumber(1);
            setIsCheck(true);
          }}>
          <Image
            onMouseEnter={() => {
              setNumber(1);
            }}
            onMouseLeave={() => {
              setNumber(-1);
            }}
            style={{
              cursor: 'pointer'
            }}
            size={'100%'}
            src={number === 1 ? '/images/icons/wallet/side-selected.svg' : '/images/icons/wallet/side-select-dark.svg'}
          />
        </Column>
      </Content>
    </Layout>
  );
}
