import { useState } from 'react';
import { useLocation } from 'react-router-dom';

// import { useGetBitcoinTokenList, useGetSideTokenList } from '@/ui/hooks/useGetTokenList';
// import { useAccountBalance } from '@/ui/state/accounts/hooks';
// import { useResetUiTxCreateScreen } from '@/ui/state/ui/hooks';
import { BalanceItem } from '@/shared/types';
// import { CHAINS_ENUM } from '@/shared/constant';
import { Column, Content, Header, Icon, Input, Layout, Row, Text } from '@/ui/components';
import ImageIcon from '@/ui/components/ImageIcon';
import { colors } from '@/ui/theme/colors';
import { Box } from '@mui/material';

function SideCryptoItem({ token }: { token: BalanceItem }) {
  const isIbc = token.asset.denom.includes('ibc/');
  return (
    <>
      <Row>
        <ImageIcon
          url={token?.asset?.logo}
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
          <Text preset="regular" text={token?.asset?.symbol}></Text>
          <Row itemsCenter>
            <Text preset="sub" text={token?.asset?.name}></Text>
            {isIbc && (
              <Box
                sx={{
                  borderRadius: '4px',
                  color: '#F7771A',
                  bgcolor: '#F7771A33',
                  fontSize: '10px',
                  fontWeight: 500,
                  height: '16px',
                  px: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                IBC
              </Box>
            )}
          </Row>
        </Column>
      </Row>

      <Column
        style={{
          gap: '0px'
        }}>
        <Text preset="regular" textEnd text={token.formatAmount}></Text>
        <Text preset="sub" textEnd text={`$${token.totalValue}`}></Text>
      </Column>
    </>
  );
}

export default function Index(props) {
  // const [searchTerm, setSearchTerm] = useState('');
  const { state } = useLocation();
  const [focus, setFocus] = useState<boolean>(false);
  const [isHover, setIsHover] = useState(false);
  let { open, onClose, onSelect, assetsList, popularList, onSearch, searchValue, curTokenDenom } = props;
  // console.log(`popularList: `, popularList);
  popularList = popularList.filter((item) => {
    return (
      item?.asset?.symbol.toLocaleLowerCase().includes(searchValue.trim()) ||
      item?.asset?.name.toLocaleLowerCase().includes(searchValue.trim())
    );
  });
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
          backgroundColor: colors.black,
          padding: 0,
          marginTop: 16
        }}>
        <Column
          style={{
            padding: '0 24px'
          }}>
          <div
            className={
              'flex items-center px-[10px] text-xs rounded-[12px] py-3  bg-[#F0B622] text-[#f0b622] bg-opacity-30 relative gap-2'
            }>
            <Icon icon="warning2" color="warning_yellow" size={24}></Icon>

            <div>Only support Side Chain asset swaps</div>
          </div>

          <div
            className={
              'hover:border-[#ffffff50] border-[1px] border-solid border-[#ffffff20] flex gap-[8px] items-center px-[10px] rounded-[12px] bg-[#17171C] relative '
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
          style={{
            marginTop: '14px'
          }}>
          {popularList?.map((asset) => {
            return (
              <Row
                classname={'bg-item-hover'}
                onClick={() => {
                  // onSelect();
                  onSelect({
                    denom: asset.denom,
                    amount: '1'
                  });
                  onClose();
                }}
                full
                key={asset?.asset?.symbol + asset?.asset?.name}
                justifyBetween
                style={{
                  cursor: 'pointer',
                  height: '44px',
                  padding: '10px 16px',
                  margin: '0 16px'
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
