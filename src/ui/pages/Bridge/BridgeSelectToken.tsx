// import { CHAINS_ENUM } from '@/shared/constant';
import BigNumber from 'bignumber.js';
import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { BalanceItem, IChain } from '@/shared/types';
import { Column, Content, Header, Icon, Input, Layout, Row, Text } from '@/ui/components';
import ImageIcon from '@/ui/components/ImageIcon';
import { useGetAllBridgeChains } from '@/ui/hooks/bridge';
import useGetBitcoinBalanceList from '@/ui/hooks/useGetBitcoinBalanceList';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { BridgeActions } from '@/ui/state/bridge/reducer';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useAppDispatch } from '@/ui/state/hooks';
import { colors } from '@/ui/theme/colors';
import { Stack } from '@mui/material';

interface SelectAsset extends BalanceItem {
  chainType: string;
}

export default function BridgeSelectTokenScreen() {
  const currentAccount = useCurrentAccount();
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const { type } = state as { type: 'from' | 'to' };
  const allBridgeChains = useGetAllBridgeChains();
  const { sideChain } = useEnvironment();

  let { balanceList: sideBalanceList } = useGetSideBalanceList(currentAccount?.address);
  let { balanceList: bitcoinBalanceList } = useGetBitcoinBalanceList(currentAccount?.address);

  // list, onSearch
  const [isHover, setIsHover] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedAsset, setSelectedAsset] = useState<SelectAsset | null>(null);

  const { assetList } = useMemo(() => {
    let assetList: SelectAsset[] = [];

    const allAssetList = [
      ...bitcoinBalanceList.map((item) => ({ ...item, chainType: 'bitcoin' })),
      ...sideBalanceList.map((item) => ({ ...item, chainType: 'sidechain' }))
    ];
    assetList = allAssetList.filter((item) => {
      return item?.asset.symbol?.toLocaleLowerCase().includes(searchValue?.trim());
    });

    return {
      assetList
    };
  }, [sideBalanceList, bitcoinBalanceList, searchValue]);

  const { chainList } = useMemo(() => {
    let chainList: IChain[] = [];
    if (selectedAsset) {
      console.log(allBridgeChains);
      console.log(selectedAsset);
      const bitcoinChain = allBridgeChains.find((item) => item.isBitcoin)!;
      if (selectedAsset.denom === 'sat') {
        if (selectedAsset?.chainType === 'bitcoin') {
          chainList = [bitcoinChain];
        } else {
          chainList = [sideChain];
        }
      } else {
        chainList = [sideChain];
        if (selectedAsset.asset.ibcData) {
          selectedAsset.asset.ibcData.forEach((item) => {
            const chain = allBridgeChains.find((chain) => chain.chainID === item.oppositeChainId);
            if (chain) {
              chainList.push(chain);
            }
          });
        }
        if (selectedAsset.denom.includes('rune')) {
          chainList.unshift(bitcoinChain);
        }
      }
    }

    return {
      chainList
    };
  }, [allBridgeChains, selectedAsset, searchValue]);

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Select crypto and chain"
      />
      <Content
        style={{
          backgroundColor: colors.black,
          padding: 0,
          marginTop: 16
        }}>
        <Column>
          <Column px="xl" gap="md">
            <Stack
              direction="row"
              alignItems="center"
              sx={[
                {
                  border: `1px solid ${colors.white20}`,
                  px: '10px',
                  borderRadius: '10px',
                  bgcolor: colors.card_bgColor,
                  position: 'relative',
                  gap: '8px',
                  ':hover': {
                    border: `1px solid ${colors.white_4}`
                  }
                }
              ]}>
              <Icon icon="search" color={'search_icon'} size={20} />
              {selectedAsset && (
                <Stack
                  direction="row"
                  alignItems="center"
                  gap="4px"
                  sx={{
                    borderRadius: '8px',
                    flexShrink: '0',
                    padding: '4px 7px',
                    bgcolor: colors.grey12
                  }}>
                  <ImageIcon url={selectedAsset.asset.logo} style={{ width: '14px', height: '14px' }} />
                  <Text preset="regular" size="xs" text={selectedAsset.asset.name} color="white"></Text>
                </Stack>
              )}
              <Input
                value={searchValue}
                onChange={(event) => {
                  setSearchValue(event.target.value.trim());
                }}
                containerStyle={{
                  minHeight: '38px',
                  width: '100%',
                  border: 'none',
                  padding: '0',
                  fontSize: '12px',
                  fontWeight: 400,
                  color: colors.white,
                  backgroundColor: 'transparent'
                }}
                placeholder={selectedAsset ? 'Search chain' : 'Search crypto'}
              />
              <div
                onClick={() => {
                  setSearchValue('');
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
            </Stack>
            {selectedAsset ? (
              <>
                {chainList?.map((chain) => {
                  return (
                    <Stack
                      key={chain.name}
                      direction="row"
                      alignItems="center"
                      gap="8px"
                      onClick={() => {
                        if (type === 'from') {
                          dispatch(
                            BridgeActions.update({
                              fromChain: chain,
                              fromAsset: selectedAsset,
                              bridgeAmount: '',
                              balance: selectedAsset.formatAmount
                            })
                          );
                        } else {
                          dispatch(
                            BridgeActions.update({
                              toChain: chain,
                              toAsset: selectedAsset,
                              bridgeAmount: '',
                              balance: selectedAsset.formatAmount
                            })
                          );
                        }
                        window.history.go(-1);
                      }}
                      sx={{
                        padding: '10px 16px',
                        cursor: 'pointer',
                        backgroundColor: colors.card_bgColor,
                        borderRadius: '8px',
                        transition: '.4s',
                        ':hover': {
                          backgroundColor: colors.black_dark
                        }
                      }}>
                      <ImageIcon
                        url={chain.logo}
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%'
                        }}
                      />
                      <Text preset="regular" text={chain.name}></Text>
                    </Stack>
                  );
                })}
              </>
            ) : (
              <>
                {assetList?.map((asset) => {
                  return (
                    <Stack
                      key={asset.asset.symbol}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      onClick={() => {
                        setSelectedAsset(asset);
                        setSearchValue('');
                      }}
                      sx={{
                        padding: '10px 16px',
                        cursor: 'pointer',
                        backgroundColor: colors.card_bgColor,
                        borderRadius: '8px',
                        transition: '.4s',
                        ':hover': {
                          backgroundColor: colors.black_dark
                        }
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
                          <Text preset="regular" text={asset.asset.symbol}></Text>
                          <Text preset="sub" text={asset.asset.name}></Text>
                        </Column>
                      </Row>

                      <Column
                        style={{
                          gap: '0px'
                        }}>
                        <Text preset="regular" textEnd text={BigNumber(asset.formatAmount).toFormat()}></Text>
                        <Text preset="sub" textEnd text={`$${BigNumber(asset.totalValue).toFormat(2)}`}></Text>
                      </Column>
                    </Stack>
                  );
                })}
              </>
            )}
          </Column>
        </Column>
      </Content>
    </Layout>
  );
}
