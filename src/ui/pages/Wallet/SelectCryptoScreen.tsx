import { useLocation } from 'react-router-dom';

import { CHAINS_ENUM } from '@/shared/constant';
import { BitcoinToken, SideToken } from '@/shared/types';
import { Column, Content, Header, Icon, Image, Input, Layout, Row, Text } from '@/ui/components';
import { useCalcPrice } from '@/ui/hooks/useCalcPrice';
import { useGetSideTokenBalance } from '@/ui/hooks/useGetBalance';
import { useGetBitcoinTokenList, useGetSideTokenList } from '@/ui/hooks/useGetTokenList';
import { useAccountBalance } from '@/ui/state/accounts/hooks';
import { useResetUiTxCreateScreen } from '@/ui/state/ui/hooks';
import { formatUnitAmount, getTruncate } from '@/ui/utils';
import React, {useState} from 'react';

import { useNavigate } from '../MainRoute';
import ImageIcon from '@/ui/components/ImageIcon';

function BitcoinCryptoItem({ token }: { token: BitcoinToken }) {
  const accountBalance = useAccountBalance();
  const { data: totalPrice } = useCalcPrice(accountBalance.btc_amount, token.coingecko_id);

  return (
    <>
      <Row>
        <Image src={token.logo} size={38}></Image>
        <Column
          style={{
            gap: '0px'
          }}>
          <Text preset="regular" text={token.symbol}></Text>
          <Text preset="sub" text={token.name}></Text>
        </Column>
      </Row>

      <Column
        style={{
          gap: '0px'
        }}>
        <Text preset="regular" textEnd text={accountBalance.btc_amount}></Text>
        <Text preset="sub" textEnd text={`${getTruncate(totalPrice)}`}></Text>
      </Column>
    </>
  );
}

function BitCrypto({searchTerm}) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { chain, type } = state as {
    chain: CHAINS_ENUM;
    type: 'receive' | 'send';
  };
  const resetUiTxCreateScreen = useResetUiTxCreateScreen();
  let { data: bitcoinTokenList } = useGetBitcoinTokenList();
  // console.log(`chain, type: `, chain, type);
  bitcoinTokenList = bitcoinTokenList.filter((item) => {
    return item.symbol.toLocaleLowerCase().includes(searchTerm.trim()) || item.name.toLocaleLowerCase().includes(searchTerm.trim());
  })
  return (
    <>
      {bitcoinTokenList.map((token) => {
        return (
          <Row
            classname={'bg-item-hover'}
            onClick={() => {
              if (type === 'receive') {
                navigate('SelectAddressScreen', { ...state, base: token.symbol, token });
              } else {
                resetUiTxCreateScreen();
                navigate('TxCreateScreen', { ...state, base: token.symbol });
              }
            }}
            full
            key={token.symbol + token.name}
            justifyBetween
            style={{
              cursor: 'pointer',
              padding: '10px 24px',
              height: '44px',
            }}>
            <BitcoinCryptoItem token={token} />
          </Row>
        );
      })}
    </>
  );
}

function SideCryptoItem({ token }: { token: SideToken }) {
  const { balanceAmount } = useGetSideTokenBalance(token.base);
  const { data: totalPrice } = useCalcPrice(balanceAmount, token.coingecko_id, token.exponent);

  return (
    <>
      <Row classname={'bg-item-hover'}>
        <ImageIcon url={token.logo} style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
        }} />
        <Column
          style={{
            gap: '0px',
          }}>
          <Text preset="regular" text={token.symbol}></Text>
          <Text preset="sub" text={token.name}></Text>
        </Column>
      </Row>

      <Column
        style={{
          gap: '0px'
        }}>
        <Text preset="regular" textEnd text={formatUnitAmount(balanceAmount, token.exponent)}></Text>
        <Text preset="sub" textEnd text={`$${getTruncate(totalPrice)}`}></Text>
      </Column>
    </>
  );
}

function SideCrypto({searchTerm}) {
  // console.log(`searchTerm: `, searchTerm);
  // debugger;
  const navigate = useNavigate();
  const { state } = useLocation();
  const { chain, type } = state as {
    chain: CHAINS_ENUM;
    type: 'receive' | 'send';
  };
  const resetUiTxCreateScreen = useResetUiTxCreateScreen();
  let { data: sideTokenList } = useGetSideTokenList();
  sideTokenList = sideTokenList.filter((item) => {
    return item.symbol.toLocaleLowerCase().includes(searchTerm.trim()) || item.name.toLocaleLowerCase().includes(searchTerm.trim());
  })
  return (
    <>
      {sideTokenList.map((token) => {
        return (
          <Row
            classname={'bg-item-hover'}
            onClick={() => {
              if (type === 'receive') {
                navigate('SelectAddressScreen', { ...state, base: token.base, token });
              } else {
                resetUiTxCreateScreen();
                navigate('TxCreateScreen', { ...state, base: token.base });
              }
            }}
            full
            key={token.symbol + token.name}
            justifyBetween
            style={{
              cursor: 'pointer',
              padding: '10px 24px',
              height: '44px',
            }}>
            <SideCryptoItem token={token} />
          </Row>
        );
      })}
    </>
  );
}

export default function SelecCryptoScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const { state } = useLocation();
  const { chain } = state as {
    chain: CHAINS_ENUM;
  };
  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Select crypto"
      />
      <Content
        style={{
          backgroundColor: '#09090A',
          padding: 0,
          marginTop: '16px',
        }}>
        <Column style={{
          padding: '0 24px',
        }}>
          <Row
            style={{
              padding: '0 24px',
              borderRadius: '12px',
              backgroundColor: '#1E1E1F',
              position: 'relative',
            }}
            itemsCenter
            bg="search_box_bg"
            full>
            <Icon icon="search" color={'search_icon'} size={20}></Icon>
            <Input
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value.trim());
              }}
              containerStyle={{
                width: '100%',
                border: 'none',
                padding: '0'
              }}
              placeholder="Search crypto"
            />
            <div onClick={() => {
              setSearchTerm('');
            }} style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              display: searchTerm ? 'block' : 'none'
            }}>
              <Icon icon="clear" color={'search_icon'} size={20}></Icon>
            </div>
          </Row>
        </Column>

        <Column style={{
          // marginTop: '14px',
        }}>{chain === CHAINS_ENUM.SIDE ? <SideCrypto searchTerm={searchTerm} /> : <BitCrypto searchTerm={searchTerm} />}</Column>
      </Content>
    </Layout>
  );
}
