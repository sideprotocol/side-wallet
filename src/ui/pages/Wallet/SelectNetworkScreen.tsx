import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CHAINS_ENUM } from '@/shared/constant';
import { Button, Column, Content, Header, Image, Layout, Row } from '@/ui/components';

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
          backgroundColor: '#09090A',
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
        {/*<Row mt={'md'}>*/}
        {/*  <Button*/}
        {/*    full*/}
        {/*    text={'Confirm'}*/}
        {/*    preset="primary"*/}
        {/*    disabled={!isCheck}*/}
        {/*    onClick={async () => {*/}
        {/*      if (number === -1) return;*/}
        {/*      let chain = CHAINS_ENUM.BTC;*/}
        {/*      if (number === 1) {*/}
        {/*        chain = CHAINS_ENUM.SIDE;*/}
        {/*      }*/}
        {/*      navigate('SelectCryptoScreen', {*/}
        {/*        chain,*/}
        {/*        type*/}
        {/*      });*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</Row>*/}
      </Content>
    </Layout>
  );
}
