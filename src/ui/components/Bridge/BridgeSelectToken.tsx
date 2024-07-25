// import { CHAINS_ENUM } from '@/shared/constant';
import { useState } from 'react';

import { SideToken } from '@/shared/types';
import { Column, Content, Header, Icon, Input, Layout, Row, Text } from '@/ui/components';
import ImageIcon from '@/ui/components/ImageIcon';
import { useCalcPrice } from '@/ui/hooks/useCalcPrice';
import { useGetSideTokenBalance } from '@/ui/hooks/useGetBalance';
import { useRuneAndBtcBalances } from '@/ui/state/bridge/hook';
import { bridgeStore, useBridgeStore } from '@/ui/stores/BridgeStore';
import { formatUnitAmount, getTruncate } from '@/ui/utils';

function SideCryptoItem({ token }: { token: SideToken & { price: string; amount: string } }) {
  const { balanceAmount } = useGetSideTokenBalance(token.base);
  const { from } = useBridgeStore();

  const { data: totalPrice } = useCalcPrice(balanceAmount, token.coingecko_id, token.exponent);

  const isDeposit = (from?.name || '').includes('Bitcoin');

  const displayAmount = isDeposit ? token.amount : balanceAmount;
  const displayPrice = isDeposit ? token.price : totalPrice;

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
        <Text preset="regular" textEnd text={formatUnitAmount(displayAmount, token.exponent)}></Text>
        <Text preset="sub" textEnd text={`$${getTruncate(displayPrice)}`}></Text>
      </Column>
    </>
  );
}

export default function Index(props) {
  const { open, onClose } = props;

  // list, onSearch

  const runeAndBtcTokens = useRuneAndBtcBalances();

  const [searchValue, setSearchValue] = useState<string>('');

  function filterFunc(token: SideToken) {
    if (!searchValue) return true;
    return (
      new RegExp(searchValue, 'i').test(token.base) ||
      new RegExp(searchValue, 'i').test(token.symbol) ||
      new RegExp(searchValue, 'i').test(token.name)
    );
  }

  return (
    <Layout style={{ width: '100%', transform: 'translate(-50%, 0)', position: 'absolute', left: '50%', top: 0, display: open ? 'flex' : 'none' }}>
      <Header
        onBack={() => {
          onClose();
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
              onChange={(e) => {
                const value = e.target.value;
                setSearchValue(value);
              }}
              containerStyle={{
                width: '100%',
                border: 'none',
                padding: '0'
              }}
              placeholder="Search crypto"
            />
          </Row>
        </Column>

        <Column
          gap="xl"
          style={{
            marginTop: '20px'
          }}>
          {runeAndBtcTokens.filter(filterFunc)?.map((asset) => {
            return (
              <Row
                onClick={() => {
                  bridgeStore.base = asset.base;
                  onClose();
                }}
                full
                key={asset.symbol + asset.name}
                justifyBetween
                style={{
                  cursor: 'pointer'
                }}>
                <SideCryptoItem token={asset} />
              </Row>
            );
          })}
        </Column>
      </Content>
    </Layout>
  );
}
