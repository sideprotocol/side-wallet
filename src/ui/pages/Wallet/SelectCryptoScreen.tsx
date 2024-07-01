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

import { useNavigate } from '../MainRoute';

function BitcoinCryptoItem({ token }: { token: BitcoinToken }) {
  const accountBalance = useAccountBalance();
  const { data: totalPrice } = useCalcPrice(accountBalance.btc_amount, token.coingecko_id);

  return (
    <>
      <Row>
        <Image src={token.logo} size={42}></Image>
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

function BitCrypto() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { chain, type } = state as {
    chain: CHAINS_ENUM;
    type: 'receive' | 'send';
  };
  const resetUiTxCreateScreen = useResetUiTxCreateScreen();
  const { data: bitcoinTokenList } = useGetBitcoinTokenList();
  return (
    <>
      {bitcoinTokenList.map((token) => {
        return (
          <Row
            onClick={() => {
              if (type === 'receive') {
                navigate('SelectAddressScreen', { chain, base: token.symbol });
              } else {
                resetUiTxCreateScreen();
                navigate('TxCreateScreen', { chain, base: token.symbol });
              }
            }}
            full
            key={token.symbol + token.name}
            justifyBetween
            style={{
              cursor: 'pointer'
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
      <Row>
        <Image src={token.logo} size={42}></Image>
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
        <Text preset="regular" textEnd text={formatUnitAmount(balanceAmount, token.exponent)}></Text>
        <Text preset="sub" textEnd text={`$${getTruncate(totalPrice)}`}></Text>
      </Column>
    </>
  );
}

function SideCrypto() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { chain, type } = state as {
    chain: CHAINS_ENUM;
    type: 'receive' | 'send';
  };
  const resetUiTxCreateScreen = useResetUiTxCreateScreen();
  const { data: sideTokenList } = useGetSideTokenList();
  return (
    <>
      {sideTokenList.map((token) => {
        return (
          <Row
            onClick={() => {
              if (type === 'receive') {
                navigate('SelectAddressScreen', { chain, base: token.base });
              } else {
                resetUiTxCreateScreen();
                navigate('TxCreateScreen', { chain, base: token.base });
              }
            }}
            full
            key={token.symbol + token.name}
            justifyBetween
            style={{
              cursor: 'pointer'
            }}>
            <SideCryptoItem token={token} />
          </Row>
        );
      })}
    </>
  );
}

export default function SelecCryptoScreen() {
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
          backgroundColor: '#09090A'
        }}>
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

        <Column>{chain === CHAINS_ENUM.SIDE ? <SideCrypto /> : <BitCrypto />}</Column>
      </Content>
    </Layout>
  );
}
