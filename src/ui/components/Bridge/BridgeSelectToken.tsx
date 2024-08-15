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

  const { data: totalPrice } = useCalcPrice(balanceAmount, token.base, token.exponent);

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
  let { open, onClose } = props;

  // list, onSearch
  const [searchValue, onSearch] = useState<string>('');
  const [focus, setFocus] = useState<boolean>(false);
  let runeAndBtcTokens = useRuneAndBtcBalances();
  if (searchValue && runeAndBtcTokens?.length) {
    runeAndBtcTokens = runeAndBtcTokens.filter((item) => {
      return (
        item?.symbol?.toLocaleLowerCase().includes(searchValue?.trim()) ||
        item?.name?.toLocaleLowerCase()?.includes(searchValue?.trim())
      );
    });
  }
  console.log(`runeAndBtcTokens: `, runeAndBtcTokens);

  return (
    <Layout
      style={{
        width: '100%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        left: '50%',
        top: '50%',
        display: open ? 'flex' : 'none'
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
          {/*<Row*/}
          {/*  style={{*/}
          {/*    padding: '0px 10px',*/}
          {/*    borderRadius: '12px',*/}
          {/*    backgroundColor: '#1E1E1F',*/}
          {/*    position: 'relative'*/}
          {/*  }}*/}
          {/*  itemsCenter*/}
          {/*  bg="search_box_bg"*/}
          {/*  full>*/}
          <div
            className={
              'hover:border-[#ffffff50] border-[1px] border-solid border-[#ffffff20] flex gap-[8px] items-center px-[10px] rounded-[12px] bg-[#1E1E1F] relative '
            }>
            <Icon icon="search" color={'search_icon'} size={20}></Icon>

            <Input
              value={searchValue}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
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
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                display: searchValue ? 'block' : 'none'
              }}>
              <Icon icon="clear" color={'search_icon'} size={20}></Icon>
            </div>
          </div>
        </Column>

        <Column
          gap="xl"
          style={{
            margin: '0 16px'
          }}>
          {runeAndBtcTokens?.map((asset) => {
            return (
              <Row
                classname={'bg-item-hover'}
                onClick={() => {
                  bridgeStore.base = asset.base;
                  onClose();
                }}
                full
                key={asset.symbol + asset.name}
                justifyBetween
                style={{
                  cursor: 'pointer',
                  height: '44px',
                  padding: '10px 16px'
                  // margin: '0 16px',
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
