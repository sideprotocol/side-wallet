import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { CHAINS_ENUM } from '@/shared/constant';
import { BitcoinToken, SideToken } from '@/shared/types';
import { Column, Content, Header, Icon, Image, Input, Layout, Row, Text } from '@/ui/components';
import ImageIcon from '@/ui/components/ImageIcon';
import { useCalcPrice } from '@/ui/hooks/useCalcPrice';
import { useGetSideTokenBalance } from '@/ui/hooks/useGetBalance';
import { useGetSideTokenList } from '@/ui/hooks/useGetTokenList';
import { useAccountBalance } from '@/ui/state/accounts/hooks';
import { useRuneAndBtcBalances, useRuneListV2 } from '@/ui/state/bridge/hook';
import { useResetUiTxCreateScreen } from '@/ui/state/ui/hooks';
import { amountToSatoshis, formatUnitAmount, getTruncate, satoshisToAmount } from '@/ui/utils';

import { useNavigate } from '../MainRoute';
import { runesUtils } from '@/shared/lib/runes-utils';
import { useSafeBalance } from '@/ui/state/transactions/hooks';

function RuneItem({ token }: { token }) {
  const accountBalance = useAccountBalance();
  const safeBalance = useSafeBalance();
  const totalSatoshis = amountToSatoshis(accountBalance.amount);

  const avaiableSatoshis = useMemo(() => {
    return amountToSatoshis(safeBalance);
  }, [safeBalance]);
  const unavailableSatoshis = totalSatoshis - avaiableSatoshis;
  const avaiableAmount = safeBalance;
  const unavailableAmount = satoshisToAmount(unavailableSatoshis);
  const totalAmount = accountBalance.amount;
  const { data: totalPrice } = useCalcPrice(totalAmount?.toString(), token.base, token.exponent);
  const balance =  runesUtils.toDecimalNumber(token?.amount, token?.divisibility);
  console.log(`totalAmount: `, avaiableAmount, totalAmount, unavailableAmount);
  return (
    <>
      <Row>
        {
          token?.logo ? <Image src={token?.logo} size={38}></Image> : ''
        }
        <Column
          style={{
            gap: '0px'
          }}>
          <Text preset="regular" text={token?.spacedRune}></Text>
          <Text preset="sub" text={token?.symbol}></Text>
        </Column>
      </Row>

      <Column
        style={{
          gap: '0px'
        }}>
        <Text preset="regular" textEnd text={balance?.toString()}></Text>
        <Text preset="sub" textEnd text={`${getTruncate(totalPrice)}`}></Text>
      </Column>
    </>
  );
}

function BitcoinItem({ token }: { token }) {
  const accountBalance = useAccountBalance();
  const safeBalance = useSafeBalance();
  const totalSatoshis = amountToSatoshis(accountBalance.amount);

  const avaiableSatoshis = useMemo(() => {
    return amountToSatoshis(safeBalance);
  }, [safeBalance]);
  const unavailableSatoshis = totalSatoshis - avaiableSatoshis;
  const avaiableAmount = safeBalance;
  const unavailableAmount = satoshisToAmount(unavailableSatoshis);
  const totalAmount = accountBalance.amount;
  const { data: totalPrice } = useCalcPrice(totalAmount?.toString(), token.base, token.exponent);
  return (
    <>
      <Row>
        {
          token?.logo ? <Image src={token?.logo} size={38}></Image> : ''
        }
        <Column
          style={{
            gap: '0px'
          }}>
          {/*<Text preset="regular" text={token?.spacedRune}></Text>*/}
          <Text preset="regular" text={token?.symbol}></Text>
          <Text preset="sub" text={'Bitcoin'}></Text>
        </Column>
      </Row>

      <Column
        style={{
          gap: '0px'
        }}>
        <Text preset="regular" textEnd text={totalAmount}></Text>
        <Text preset="sub" textEnd text={`${getTruncate(totalPrice)}`}></Text>
      </Column>
    </>
  );
}

function BitCrypto() {
  const item: BitcoinToken = {
    base: 'btc',
    coingecko_id: 'bitcoin',
    exponent: '8',
    logo: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPCEtLSBDcmVhdG9yOiBDb3JlbERSQVcgMjAxOSAoNjQtQml0KSAtLT4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZlcnNpb249IjEuMSIgc2hhcGUtcmVuZGVyaW5nPSJnZW9tZXRyaWNQcmVjaXNpb24iIHRleHQtcmVuZGVyaW5nPSJnZW9tZXRyaWNQcmVjaXNpb24iIGltYWdlLXJlbmRlcmluZz0ib3B0aW1pemVRdWFsaXR5IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIKdmlld0JveD0iMCAwIDQwOTEuMjcgNDA5MS43MyIKIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIgogeG1sbnM6eG9kbT0iaHR0cDovL3d3dy5jb3JlbC5jb20vY29yZWxkcmF3L29kbS8yMDAzIj4KIDxnIGlkPSJMYXllcl94MDAyMF8xIj4KICA8bWV0YWRhdGEgaWQ9IkNvcmVsQ29ycElEXzBDb3JlbC1MYXllciIvPgogIDxnIGlkPSJfMTQyMTM0NDAyMzMyOCI+CiAgIDxwYXRoIGZpbGw9IiNGNzkzMUEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTQwMzAuMDYgMjU0MC43N2MtMjczLjI0LDEwOTYuMDEgLTEzODMuMzIsMTc2My4wMiAtMjQ3OS40NiwxNDg5LjcxIC0xMDk1LjY4LC0yNzMuMjQgLTE3NjIuNjksLTEzODMuMzkgLTE0ODkuMzMsLTI0NzkuMzEgMjczLjEyLC0xMDk2LjEzIDEzODMuMiwtMTc2My4xOSAyNDc5LC0xNDg5Ljk1IDEwOTYuMDYsMjczLjI0IDE3NjMuMDMsMTM4My41MSAxNDg5Ljc2LDI0NzkuNTdsMC4wMiAtMC4wMnoiLz4KICAgPHBhdGggZmlsbD0id2hpdGUiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTI5NDcuNzcgMTc1NC4zOGM0MC43MiwtMjcyLjI2IC0xNjYuNTYsLTQxOC42MSAtNDUwLC01MTYuMjRsOTEuOTUgLTM2OC44IC0yMjQuNSAtNTUuOTQgLTg5LjUxIDM1OS4wOWMtNTkuMDIsLTE0LjcyIC0xMTkuNjMsLTI4LjU5IC0xNzkuODcsLTQyLjM0bDkwLjE2IC0zNjEuNDYgLTIyNC4zNiAtNTUuOTQgLTkyIDM2OC42OGMtNDguODQsLTExLjEyIC05Ni44MSwtMjIuMTEgLTE0My4zNSwtMzMuNjlsMC4yNiAtMS4xNiAtMzA5LjU5IC03Ny4zMSAtNTkuNzIgMjM5Ljc4YzAsMCAxNjYuNTYsMzguMTggMTYzLjA1LDQwLjUzIDkwLjkxLDIyLjY5IDEwNy4zNSw4Mi44NyAxMDQuNjIsMTMwLjU3bC0xMDQuNzQgNDIwLjE1YzYuMjYsMS41OSAxNC4zOCwzLjg5IDIzLjM0LDcuNDkgLTcuNDksLTEuODYgLTE1LjQ2LC0zLjg5IC0yMy43MywtNS44N2wtMTQ2LjgxIDU4OC41N2MtMTEuMTEsMjcuNjIgLTM5LjMxLDY5LjA3IC0xMDIuODcsNTMuMzMgMi4yNSwzLjI2IC0xNjMuMTcsLTQwLjcyIC0xNjMuMTcsLTQwLjcybC0xMTEuNDYgMjU2Ljk4IDI5Mi4xNSA3Mi44M2M1NC4zNSwxMy42MyAxMDcuNjEsMjcuODkgMTYwLjA2LDQxLjNsLTkyLjkgMzczLjAzIDIyNC4yNCA1NS45NCA5MiAtMzY5LjA3YzYxLjI2LDE2LjYzIDEyMC43MSwzMS45NyAxNzguOTEsNDYuNDNsLTkxLjY5IDM2Ny4zMyAyMjQuNTEgNTUuOTQgOTIuODkgLTM3Mi4zM2MzODIuODIsNzIuNDUgNjcwLjY3LDQzLjI0IDc5MS44MywtMzAzLjAyIDk3LjYzLC0yNzguNzggLTQuODYsLTQzOS41OCAtMjA2LjI2LC01NDQuNDQgMTQ2LjY5LC0zMy44MyAyNTcuMTgsLTEzMC4zMSAyODYuNjQsLTMyOS42MWwtMC4wNyAtMC4wNXptLTUxMi45MyA3MTkuMjZjLTY5LjM4LDI3OC43OCAtNTM4Ljc2LDEyOC4wOCAtNjkwLjk0LDkwLjI5bDEyMy4yOCAtNDk0LjJjMTUyLjE3LDM3Ljk5IDY0MC4xNywxMTMuMTcgNTY3LjY3LDQwMy45MXptNjkuNDMgLTcyMy4zYy02My4yOSwyNTMuNTggLTQ1My45NiwxMjQuNzUgLTU4MC42OSw5My4xNmwxMTEuNzcgLTQ0OC4yMWMxMjYuNzMsMzEuNTkgNTM0Ljg1LDkwLjU1IDQ2OC45NCwzNTUuMDVsLTAuMDIgMHoiLz4KICA8L2c+CiA8L2c+Cjwvc3ZnPgo=',
    name: 'Bitcoin',
    precision: 8,
    symbol: 'BTC',
  };
  const navigate = useNavigate();
  const { state } = useLocation();
  const { chain, type } = state as {
    chain: CHAINS_ENUM;
    type: 'receive' | 'send';
  };
  const resetUiTxCreateScreen = useResetUiTxCreateScreen();

  return (
    <>
      <Row
        classname={'bg-item-hover'}
        onClick={() => {
          if (type === 'receive') {
            navigate('SelectAddressScreen', { ...state, base: item?.symbol, token: item });
          } else {
            resetUiTxCreateScreen();
            navigate('TxCreateScreen', { ...state, base: item?.symbol, token: item });
          }
        }}
        full
        key={item?.symbol + item?.name}
        justifyBetween
        style={{
          cursor: 'pointer',
          margin: '0 16px',
          padding: '10px 16px',
          height: '44px'
        }}>
        <BitcoinItem token={item} />
      </Row>
    </>
  );
}

function BitAndRuneCrypto({searchTerm}) {
  const { tokens: runeList } = useRuneListV2();
  // const runeAndBtcTokens = useRuneAndBtcBalances();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { chain, type } = state as {
    chain: CHAINS_ENUM;
    type: 'receive' | 'send';
  };
  const resetUiTxCreateScreen = useResetUiTxCreateScreen();

  return (
    <>
      <BitCrypto />
      {runeList.map((token) => {
        return (
          <Row
            classname={'bg-item-hover'}
            onClick={() => {
              if (type === 'receive') {
                navigate('SelectAddressScreen', { ...state, base: token?.symbol, token });
              } else {
                resetUiTxCreateScreen();
                navigate('TxCreateScreen', { ...state, base: token?.symbol, token });
              }
            }}
            full
            key={token?.symbol + token?.name}
            justifyBetween
            style={{
              cursor: 'pointer',
              margin: '0 16px',
              padding: '10px 16px',
              height: '44px'
            }}>
            <RuneItem token={token} />
          </Row>
        );
      })}
    </>
  );
}

function SideCryptoItem({ token }: { token: SideToken }) {
  const { balanceAmount } = useGetSideTokenBalance(token.base);
  const { data: totalPrice } = useCalcPrice(balanceAmount, token.base, token.exponent);

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
  const [isHover, setIsHover] = useState(false);
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
            className={`border-[1px] border-solid px-[10px] flex items-center rounded-[10px] bg-[#1E1E1F] relative gap-[8px] ${
              isFocus ? 'border-white' : ' border-[#ffffff20] hover:border-[#ffffff50]'
            }`}>
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
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                display: searchTerm ? 'block' : 'none'
              }}>
              <Icon icon="clear" color={isHover ? 'white' : 'search_icon'} size={20}></Icon>
            </div>
          </div>
        </Column>

        <Column>
          {chain === CHAINS_ENUM.SIDE ? <SideCrypto searchTerm={searchTerm} /> : <BitAndRuneCrypto searchTerm={searchTerm} />}
        </Column>
      </Content>
    </Layout>
  );
}
