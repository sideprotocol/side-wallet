import { useState } from 'react';
import { useLocation } from 'react-router-dom';

// import { CHAINS_ENUM } from '@/shared/constant';
import { SideToken } from '@/shared/types';
import { Column, Content, Header, Icon, Input, Layout, Row, Text } from '@/ui/components';
import ImageIcon from '@/ui/components/ImageIcon';
import { useCalcPrice } from '@/ui/hooks/useCalcPrice';
import { useGetSideTokenBalance } from '@/ui/hooks/useGetBalance';
// import { useGetBitcoinTokenList, useGetSideTokenList } from '@/ui/hooks/useGetTokenList';
// import { useAccountBalance } from '@/ui/state/accounts/hooks';
// import { useResetUiTxCreateScreen } from '@/ui/state/ui/hooks';
import { formatUnitAmount, getTruncate } from '@/ui/utils';

function SideCryptoItem({ token }: { token: SideToken }) {
  const { balanceAmount } = useGetSideTokenBalance(token.base);
  const { data: totalPrice } = useCalcPrice(balanceAmount, token.coingecko_id, token.exponent);

  return (
    <>
      <Row>
        {/*<Image src={token.logo} size={42}></Image>*/}
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

export default function Index(props) {
  const { state } = useLocation();
  const [focus, setFocus] = useState<boolean>(false);
  const { open, onClose, onSelect, assetsList, popularList, onSearch, searchValue, curTokenDenom } = props;
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
          backgroundColor: '#09090A',
          padding: '0',
        }}>
        <Column style={{
          padding: '0 24px',
        }}>
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
          </Row>
        </Column>

        <Column style={{
          marginTop: '14px',
        }}>
          {popularList?.map((asset) => {
            return (
              <Row
                classname={'bg-item-hover'}
                onClick={() => {
                  // onSelect();
                  onSelect({
                    denom: asset.base,
                    amount: '1'
                  });
                  onClose();
                }}
                full
                key={asset.symbol + asset.name}
                justifyBetween
                style={{
                  cursor: 'pointer',
                  height: '44px',
                  padding: '10px 24px',
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
