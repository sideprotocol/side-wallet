import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { CHAINS_ENUM } from '@/shared/constant';
import { BitcoinToken, SideToken } from '@/shared/types';
import { Column, Content, Header, Icon, Image, Input, Layout, Row, Text } from '@/ui/components';
import ImageIcon from '@/ui/components/ImageIcon';
import { useCalcPrice } from '@/ui/hooks/useCalcPrice';
import { useGetSideTokenBalance } from '@/ui/hooks/useGetBalance';
import { useGetSideTokenList } from '@/ui/hooks/useGetTokenList';
import { useAccountBalance } from '@/ui/state/accounts/hooks';
import { useRuneAndBtcBalances } from '@/ui/state/bridge/hook';
import { useResetUiTxCreateScreen } from '@/ui/state/ui/hooks';
import { formatUnitAmount, getTruncate } from '@/ui/utils';

import { useNavigate } from '../MainRoute';

function BitcoinCryptoItem({ token }: { token: BitcoinToken }) {
  const accountBalance = useAccountBalance();
  // const { data: totalPrice } = useCalcPrice(accountBalance.btc_amount, token.coingecko_id);

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
        <Text preset="regular" textEnd text={token?.balance}></Text>
        <Text preset="sub" textEnd text={`${getTruncate(token?.price)}`}></Text>
      </Column>
    </>
  );
}

function BitCrypto({ searchTerm }) {
  const runeAndBtcTokens = useRuneAndBtcBalances();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { chain, type } = state as {
    chain: CHAINS_ENUM;
    type: 'receive' | 'send';
  };
  const resetUiTxCreateScreen = useResetUiTxCreateScreen();

  return (
    <>
      {runeAndBtcTokens.map((token) => {
        return (
          <Row
            classname={'bg-item-hover'}
            onClick={() => {
              if (type === 'receive') {
                navigate('SelectAddressScreen', { ...state, base: token.symbol, token });
              } else {
                resetUiTxCreateScreen();
                navigate('TxCreateScreen', { ...state, base: token.symbol, token });
              }
            }}
            full
            key={token.symbol + token.name}
            justifyBetween
            style={{
              cursor: 'pointer',
              margin: '0 16px',
              padding: '10px 16px',
              height: '44px'
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
        <ImageIcon
          url={token.logo}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%'
          }}
        />
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

function SideCrypto({ searchTerm }) {
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
    return (
      item.symbol.toLocaleLowerCase().includes(searchTerm.trim()) ||
      item.name.toLocaleLowerCase().includes(searchTerm.trim())
    );
  });
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
              margin: '0 16px',
              cursor: 'pointer',
              padding: '10px 16px',
              height: '44px'
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
  const [isFocus, setIsFocus] = useState(false);
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
          marginTop: '16px'
        }}>
        <Column
          style={{
            padding: '0 16px'
            // margin: '0 16px'
          }}>
          <div
            className={
              'hover:border-[#ffffff50] border-[1px] border-solid border-[#ffffff20] px-[10px] flex items-center rounded-[10px] bg-[#1E1E1F] relative gap-[8px]'
            }>
            <Icon icon="search" color={'search_icon'} size={20}></Icon>
            <Input
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value.trim());
              }}
              onFocus={() => {
                setIsFocus(true);
              }}
              onBlur={() => {
                setIsFocus(false);
              }}
              containerStyle={{
                width: '100%',
                border: 'none',
                padding: '0'
              }}
              placeholder="Search crypto"
            />
            <div
              onClick={() => {
                setSearchTerm('');
              }}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                display: searchTerm ? 'block' : 'none'
              }}>
              <Icon icon="clear" color={'search_icon'} size={20}></Icon>
            </div>
          </div>
        </Column>

        <Column>
          {chain === CHAINS_ENUM.SIDE ? <SideCrypto searchTerm={searchTerm} /> : <BitCrypto searchTerm={searchTerm} />}
        </Column>
      </Content>
    </Layout>
  );
}
