// import { CHAINS_ENUM } from '@/shared/constant';
import BigNumber from 'bignumber.js';
import { useState } from 'react';

import { Column, Content, Header, Icon, Input, Layout, Row, Text } from '@/ui/components';
import ImageIcon from '@/ui/components/ImageIcon';
import useGetBitcoinBalanceList from '@/ui/hooks/useGetBitcoinBalanceList';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useBridgeState } from '@/ui/state/bridge/hook';
import { BridgeActions } from '@/ui/state/bridge/reducer';
import { useAppDispatch } from '@/ui/state/hooks';
import { colors } from '@/ui/theme/colors';

export default function BridgeSelectTokenScreen() {
  const currentAccount = useCurrentAccount();
  let { balanceList: sideBalanceList } = useGetSideBalanceList(currentAccount?.address);
  let { balanceList: btcBalanceList } = useGetBitcoinBalanceList(currentAccount?.address);

  // list, onSearch
  const [searchValue, onSearch] = useState<string>('');
  const [isHover, setIsHover] = useState(false);
  const { from } = useBridgeState();
  const dispatch = useAppDispatch();
  const isDeposit = (from?.name || '').includes('Bitcoin');
  sideBalanceList = sideBalanceList?.filter((item) => {
    return item?.denom.includes('rune') || item?.denom.includes('sat');
  });
  if (searchValue) {
    sideBalanceList = sideBalanceList.filter((item) => {
      return (
        item?.asset.symbol?.toLocaleLowerCase().includes(searchValue?.trim()) ||
        item?.asset.name?.toLocaleLowerCase()?.includes(searchValue?.trim())
      );
    });
    btcBalanceList = btcBalanceList.filter((item) => {
      return (
        item?.asset.symbol?.toLocaleLowerCase().includes(searchValue?.trim()) ||
        item?.asset.name?.toLocaleLowerCase()?.includes(searchValue?.trim())
      );
    });
  }
  const onClose = () => window.history.go(-1);
  // console.log('runeAndBtcTokens: ', runeAndBtcTokens);

  const renderList = isDeposit ? btcBalanceList : sideBalanceList;

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
          backgroundColor: colors.black,
          padding: 0,
          marginTop: 16
        }}>
        <Column>
          <Column>
            <div
              className={
                'hover:border-[#ffffff50]   border-[1px] border-solid border-[#ffffff20] flex gap-[8px] items-center px-[10px] rounded-[12px] bg-[#17171C] relative '
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

          <Column gap="sm">
            {renderList?.map((asset) => {
              return (
                <Row
                  classname={'bg-item-hover'}
                  onClick={() => {
                    dispatch(BridgeActions.update({ base: asset.denom, exponent: +asset.asset.exponent }));
                    onClose();
                  }}
                  full
                  px="lg"
                  key={asset.asset.symbol}
                  justifyBetween
                  style={{
                    cursor: 'pointer',
                    height: '44px',
                    padding: '10px 0px'
                  }}>
                  <Row>
                    <ImageIcon
                      url={asset.asset.logo}
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
                      <Text preset="regular" text={asset.asset.name}></Text>
                      <Text preset="sub" text={asset.asset.symbol}></Text>
                    </Column>
                  </Row>

                  <Column
                    style={{
                      gap: '0px'
                    }}>
                    <Text preset="regular" textEnd text={BigNumber(asset.formatAmount).toFormat()}></Text>
                    <Text preset="sub" textEnd text={`$${BigNumber(asset.totalValue).toFormat(2)}`}></Text>
                  </Column>
                </Row>
              );
            })}
          </Column>
        </Column>
      </Content>
    </Layout>
  );
}
