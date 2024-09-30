// import { CHAINS_ENUM } from '@/shared/constant';
import { useState } from 'react';

import { Column, Content, Header, Icon, Input, Layout, Row, Text } from '@/ui/components';
import ImageIcon from '@/ui/components/ImageIcon';
import useGetBitcoinBalanceList from '@/ui/hooks/useGetBitcoinBalanceList';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { bridgeStore, useBridgeStore } from '@/ui/stores/BridgeStore';

export default function Index(props) {
  let { open, onClose } = props;
  const currentAccount = useCurrentAccount();
  let { balanceList: sideBalanceList } = useGetSideBalanceList(currentAccount?.address);
  let { balanceList: btcBalanceList } = useGetBitcoinBalanceList(currentAccount?.address);

  // list, onSearch
  const [searchValue, onSearch] = useState<string>('');
  const [isHover, setIsHover] = useState(false);
  const { from } = useBridgeStore();
  // let { tokens } = useRuneListV2();
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
          {isDeposit
            ? btcBalanceList?.map((asset) => {
                return (
                  <Row
                    classname={'bg-item-hover'}
                    onClick={() => {
                      bridgeStore.base = asset.denom;
                      bridgeStore.exponent = +asset.asset.exponent;
                      onClose();
                    }}
                    full
                    key={asset.asset.symbol}
                    justifyBetween
                    style={{
                      cursor: 'pointer',
                      height: '44px',
                      padding: '10px 16px'
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
                      <Text preset="regular" textEnd text={asset.formatAmount}></Text>
                      <Text preset="sub" textEnd text={`$${asset.totalValue}`}></Text>
                    </Column>
                  </Row>
                );
              })
            : sideBalanceList.map((item) => {
                return (
                  <div
                    key={item?.asset?.symbol + item?.asset?.name}
                    className={''}
                    onClick={() => {
                      bridgeStore.base = item?.denom;
                      bridgeStore.exponent = Number(item?.asset.exponent);
                      onClose();
                    }}>
                    <Row
                      classname={'bg-item-hover-v2'}
                      justifyBetween
                      style={{
                        cursor: 'pointer',
                        padding: '10px 12px',
                        borderRadius: 10
                      }}>
                      <Row>
                        <ImageIcon
                          url={item.asset.logo}
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
                          <Text classname={'symbol'} preset="regular" text={item.asset.symbol}></Text>
                          <Text preset="sub" text={item.asset.name}></Text>
                        </Column>
                      </Row>

                      <Column
                        style={{
                          gap: '0px'
                        }}>
                        {/*<Text preset="regular" text={balanceVisible ? formatUnitAmount(balanceAmount, token.exponent) : '**'}*/}
                        <Text preset="regular" text={item.formatAmount} textEnd />
                        {/*<Text preset="sub" text={`${'$' + getTruncate(totalPrice)}`} textEnd />*/}
                        {/*<Text preset="sub" text={`${balanceVisible ? '$' + getTruncate(totalPrice) : '**'}`} textEnd/>*/}
                        <Text preset="sub" text={`$${item.totalValue}`} textEnd />
                      </Column>
                    </Row>
                  </div>
                );
              })}
        </Column>
      </Content>
    </Layout>
  );
}
