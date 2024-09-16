// import { CHAINS_ENUM } from '@/shared/constant';
import { useState } from 'react';

import { runesUtils } from '@/shared/lib/runes-utils';
import { BitcoinToken, SideToken } from '@/shared/types';
import { Column, Content, Header, Icon, Input, Layout, Row, Text } from '@/ui/components';
import ImageIcon from '@/ui/components/ImageIcon';
import { useCalcPrice } from '@/ui/hooks/useCalcPrice';
import { useGetSideTokenBalance } from '@/ui/hooks/useGetBalance';
import { useAccountBalance } from '@/ui/state/accounts/hooks';
import { useRuneListV2 } from '@/ui/state/bridge/hook';
import { bridgeStore, useBridgeStore } from '@/ui/stores/BridgeStore';
import { getTruncate } from '@/ui/utils';

function BtcItem({ token }: { token: SideToken & { price: string; amount: string } }) {
  const { balanceAmount } = useGetSideTokenBalance(token.base);
  const { from } = useBridgeStore();
  const accountBalance = useAccountBalance();
  const totalAmount = accountBalance.amount;
  const isDeposit = (from?.name || '').includes('Bitcoin');

  const displayBalance = isDeposit ? totalAmount : balanceAmount;
  const { data: totalPrice } = useCalcPrice(displayBalance, token.base, token.exponent);

  return (
    <>
      <Row>
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
        <Text preset="regular" textEnd text={displayBalance}></Text>
        <Text preset="sub" textEnd text={`$${totalPrice}`}></Text>
      </Column>
    </>
  );
}

function SideCryptoItem({ token }: { token: SideToken & { price: string; amount: string } }) {
  const { balanceAmount } = useGetSideTokenBalance(token.base);
  const { from } = useBridgeStore();

  const { data: totalPrice } = useCalcPrice(balanceAmount, token.base, token.exponent);

  const isDeposit = (from?.name || '').includes('Bitcoin');

  const displayAmount = isDeposit ? token.amount : balanceAmount;
  const displayPrice = isDeposit ? token.price : totalPrice;

  const balance = runesUtils.toDecimalNumber(displayAmount, token?.divisibility);
  return (
    <>
      <Row>
        <ImageIcon
          url={`https://api-t2.unisat.io/icon-v1/icon/runes/${token?.spacedRune}`}
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
          <Text preset="regular" text={token?.spacedRune}></Text>
          <Text preset="sub" text={token?.symbol}></Text>
        </Column>
      </Row>

      <Column
        style={{
          gap: '0px'
        }}>
        <Text preset="regular" textEnd text={balance?.toString()}></Text>
        <Text preset="sub" textEnd text={`$${getTruncate(displayPrice)}`}></Text>
      </Column>
    </>
  );
}

const item: BitcoinToken = {
  base: 'btc',
  coingecko_id: 'bitcoin',
  exponent: '8',
  logo: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPCEtLSBDcmVhdG9yOiBDb3JlbERSQVcgMjAxOSAoNjQtQml0KSAtLT4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZlcnNpb249IjEuMSIgc2hhcGUtcmVuZGVyaW5nPSJnZW9tZXRyaWNQcmVjaXNpb24iIHRleHQtcmVuZGVyaW5nPSJnZW9tZXRyaWNQcmVjaXNpb24iIGltYWdlLXJlbmRlcmluZz0ib3B0aW1pemVRdWFsaXR5IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIKdmlld0JveD0iMCAwIDQwOTEuMjcgNDA5MS43MyIKIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIgogeG1sbnM6eG9kbT0iaHR0cDovL3d3dy5jb3JlbC5jb20vY29yZWxkcmF3L29kbS8yMDAzIj4KIDxnIGlkPSJMYXllcl94MDAyMF8xIj4KICA8bWV0YWRhdGEgaWQ9IkNvcmVsQ29ycElEXzBDb3JlbC1MYXllciIvPgogIDxnIGlkPSJfMTQyMTM0NDAyMzMyOCI+CiAgIDxwYXRoIGZpbGw9IiNGNzkzMUEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTQwMzAuMDYgMjU0MC43N2MtMjczLjI0LDEwOTYuMDEgLTEzODMuMzIsMTc2My4wMiAtMjQ3OS40NiwxNDg5LjcxIC0xMDk1LjY4LC0yNzMuMjQgLTE3NjIuNjksLTEzODMuMzkgLTE0ODkuMzMsLTI0NzkuMzEgMjczLjEyLC0xMDk2LjEzIDEzODMuMiwtMTc2My4xOSAyNDc5LC0xNDg5Ljk1IDEwOTYuMDYsMjczLjI0IDE3NjMuMDMsMTM4My41MSAxNDg5Ljc2LDI0NzkuNTdsMC4wMiAtMC4wMnoiLz4KICAgPHBhdGggZmlsbD0id2hpdGUiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTI5NDcuNzcgMTc1NC4zOGM0MC43MiwtMjcyLjI2IC0xNjYuNTYsLTQxOC42MSAtNDUwLC01MTYuMjRsOTEuOTUgLTM2OC44IC0yMjQuNSAtNTUuOTQgLTg5LjUxIDM1OS4wOWMtNTkuMDIsLTE0LjcyIC0xMTkuNjMsLTI4LjU5IC0xNzkuODcsLTQyLjM0bDkwLjE2IC0zNjEuNDYgLTIyNC4zNiAtNTUuOTQgLTkyIDM2OC42OGMtNDguODQsLTExLjEyIC05Ni44MSwtMjIuMTEgLTE0My4zNSwtMzMuNjlsMC4yNiAtMS4xNiAtMzA5LjU5IC03Ny4zMSAtNTkuNzIgMjM5Ljc4YzAsMCAxNjYuNTYsMzguMTggMTYzLjA1LDQwLjUzIDkwLjkxLDIyLjY5IDEwNy4zNSw4Mi44NyAxMDQuNjIsMTMwLjU3bC0xMDQuNzQgNDIwLjE1YzYuMjYsMS41OSAxNC4zOCwzLjg5IDIzLjM0LDcuNDkgLTcuNDksLTEuODYgLTE1LjQ2LC0zLjg5IC0yMy43MywtNS44N2wtMTQ2LjgxIDU4OC41N2MtMTEuMTEsMjcuNjIgLTM5LjMxLDY5LjA3IC0xMDIuODcsNTMuMzMgMi4yNSwzLjI2IC0xNjMuMTcsLTQwLjcyIC0xNjMuMTcsLTQwLjcybC0xMTEuNDYgMjU2Ljk4IDI5Mi4xNSA3Mi44M2M1NC4zNSwxMy42MyAxMDcuNjEsMjcuODkgMTYwLjA2LDQxLjNsLTkyLjkgMzczLjAzIDIyNC4yNCA1NS45NCA5MiAtMzY5LjA3YzYxLjI2LDE2LjYzIDEyMC43MSwzMS45NyAxNzguOTEsNDYuNDNsLTkxLjY5IDM2Ny4zMyAyMjQuNTEgNTUuOTQgOTIuODkgLTM3Mi4zM2MzODIuODIsNzIuNDUgNjcwLjY3LDQzLjI0IDc5MS44MywtMzAzLjAyIDk3LjYzLC0yNzguNzggLTQuODYsLTQzOS41OCAtMjA2LjI2LC01NDQuNDQgMTQ2LjY5LC0zMy44MyAyNTcuMTgsLTEzMC4zMSAyODYuNjQsLTMyOS42MWwtMC4wNyAtMC4wNXptLTUxMi45MyA3MTkuMjZjLTY5LjM4LDI3OC43OCAtNTM4Ljc2LDEyOC4wOCAtNjkwLjk0LDkwLjI5bDEyMy4yOCAtNDk0LjJjMTUyLjE3LDM3Ljk5IDY0MC4xNywxMTMuMTcgNTY3LjY3LDQwMy45MXptNjkuNDMgLTcyMy4zYy02My4yOSwyNTMuNTggLTQ1My45NiwxMjQuNzUgLTU4MC42OSw5My4xNmwxMTEuNzcgLTQ0OC4yMWMxMjYuNzMsMzEuNTkgNTM0Ljg1LDkwLjU1IDQ2OC45NCwzNTUuMDVsLTAuMDIgMHoiLz4KICA8L2c+CiA8L2c+Cjwvc3ZnPgo=',
  name: 'Bitcoin',
  precision: 8,
  symbol: 'BTC'
};

export default function Index(props) {
  let { open, onClose } = props;

  // list, onSearch
  const [searchValue, onSearch] = useState<string>('');
  const [isHover, setIsHover] = useState(false);

  let { tokens } = useRuneListV2();

  if (searchValue && tokens?.length) {
    tokens = tokens.filter((item) => {
      return (
        item?.symbol?.toLocaleLowerCase().includes(searchValue?.trim()) ||
        item?.name?.toLocaleLowerCase()?.includes(searchValue?.trim())
      );
    });
  }

  // console.log('runeAndBtcTokens: ', runeAndBtcTokens);
  return (
    <Layout
      style={{
        width: '100%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        left: '50%',
        top: '50%',
        display: open ? 'flex' : 'none',
        zIndex: 2
      }}>
      <Header
        onBack={() => {
          onClose();
        }}
        title="Select crypto"
      />
      <Content
        style={{
          backgroundColor: '#09090A',
          padding: 0,
          marginTop: 16
        }}>
        <Column
          style={{
            padding: '0 24px'
          }}>
          <div
            className={
              'hover:border-[#ffffff50] border-[1px] border-solid border-[#ffffff20] flex gap-[8px] items-center px-[10px] rounded-[12px] bg-[#1E1E1F] relative '
            }>
            <Icon icon="search" color={'search_icon'} size={20}></Icon>

            <Input
              value={searchValue}
              onChange={(e) => {
                const value = e.target.value;
                onSearch(value);
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
                onSearch('');
              }}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                display: searchValue ? 'block' : 'none'
              }}>
              <Icon icon="clear" color={isHover ? 'white' : 'search_icon'} size={20}></Icon>
            </div>
          </div>
        </Column>

        <Column
          gap="xl"
          style={{
            margin: '0 16px'
          }}>
          <Row
            full
            justifyBetween
            style={{
              cursor: 'pointer',
              height: '44px',
              padding: '10px 16px'
            }}
            classname={'bg-item-hover'}>
            <BtcItem token={item} />
          </Row>
          {tokens?.map((asset) => {
            return (
              <Row
                classname={'bg-item-hover'}
                onClick={() => {
                  bridgeStore.base = asset?.runeid;
                  onClose();
                }}
                full
                key={asset?.symbol + asset?.runeid}
                justifyBetween
                style={{
                  cursor: 'pointer',
                  height: '44px',
                  padding: '10px 16px'
                }}>
                <SideCryptoItem
                  token={{
                    ...asset,
                    base: 'runes/' + asset.runeid
                  }}
                />
              </Row>
            );
          })}
        </Column>
      </Content>
    </Layout>
  );
}
