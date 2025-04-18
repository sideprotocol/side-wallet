import { Drawer } from 'antd';
import { useMemo, useState } from 'react';

import { Chain } from '@/core/skip-go';
import { Column, Icon, Row, Search, Text } from '@/ui/components';
import { colors } from '@/ui/theme/colors';
import { Asset } from '@skip-go/client';

export default function Index({
  chainList,
  assetList,
  asset,
  onChange
}: {
  chainList: Chain[];
  assetList: Record<string, Asset[]>;
  asset?: Asset;
  onChange: (data: { chain: Chain; asset: Asset }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [assetKeywords, setAssetKeyWords] = useState('');
  const [chainKeywords, setChainKeyWords] = useState('');
  const [selectAssetInfo, setSelectAssetInfo] = useState<Pick<Asset, 'symbol' | 'logoURI'> | undefined>(undefined);

  const { assetWithChainMap } = useMemo(() => {
    const assetWithChainMap: {
      [key: string]: {
        chainIdList: string[];
        assetInfo: Pick<Asset, 'symbol' | 'logoURI'>;
      };
    } = {};
    Object.values(assetList).forEach((chainAssetList) => {
      chainAssetList.forEach((item) => {
        if (item.symbol) {
          if (assetWithChainMap[item.symbol]) {
            assetWithChainMap[item.symbol].chainIdList.push(item.chainID);
          } else {
            assetWithChainMap[item.symbol] = {
              chainIdList: [item.chainID],
              assetInfo: {
                symbol: item.symbol,
                logoURI: item.logoURI
              }
            };
          }
        }
      });
    });
    return { assetWithChainMap };
  }, [assetList]);

  const { selectAssetChainList } = useMemo(() => {
    let selectAssetChainList: Chain[] = [];
    if (selectAssetInfo) {
      selectAssetChainList = assetWithChainMap[selectAssetInfo.symbol!].chainIdList.map((chainId) => {
        return chainList.find((item) => item.chainID === chainId)!;
      });
    }

    return { selectAssetChainList };
  }, [selectAssetInfo]);

  const reset = () => {
    setOpen(false);
    setAssetKeyWords('');
    setChainKeyWords('');
    setSelectAssetInfo(undefined);
  };

  return (
    <>
      <Row
        itemsCenter
        style={{
          flexShrink: 0,
          padding: '10px',
          borderRadius: '10px',
          background: colors.black,
          gap: '5px',
          cursor: 'pointer'
        }}
        onClick={() => setOpen(true)}>
        <img
          src={asset?.logoURI}
          alt=""
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%'
          }}
        />
        <Text
          style={{
            fontSize: '14px'
          }}>
          {asset?.symbol}
        </Text>
        <Icon
          icon="down"
          style={{
            width: '8px',
            height: '8px',
            transition: '.4s',
            transform: `rotate(${open ? '-180deg' : '0'})`
          }}
        />
      </Row>
      <Drawer
        title={null}
        placement="bottom"
        width={500}
        onClose={reset}
        open={open}
        closable={false}
        headerStyle={{
          display: 'none'
        }}
        bodyStyle={{
          backgroundColor: '#17171C',
          borderRadius: '10px 10px 0 0',
          border: '1px solid #2D2D2D',
          padding: '16px'
        }}>
        <Column
          gap="lg"
          style={{
            overflow: 'hidden'
          }}>
          {!selectAssetInfo ? (
            <>
              {/* select asset */}
              <Search
                placeholder="Search for an asset"
                value={assetKeywords}
                setValue={(data) => {
                  setAssetKeyWords(data);
                }}
              />
              <Column
                style={{
                  flex: 1,
                  overflow: 'auto'
                }}>
                {Object.values(assetWithChainMap)
                  .filter((item) =>
                    (item.assetInfo.symbol || '').toLocaleLowerCase().includes(assetKeywords.toLocaleLowerCase())
                  )
                  .map((item) => (
                    <Row
                      key={item.assetInfo.symbol}
                      itemsCenter
                      gap="md"
                      classname={'bg-item-hover-v2'}
                      style={{
                        backgroundColor: colors.black,
                        padding: '10px 16px',
                        borderRadius: '10px',
                        cursor: 'pointer'
                      }}
                      onClick={() => setSelectAssetInfo(item.assetInfo)}>
                      <img className={'w-[14px] h-[14px]'} src={item.assetInfo.logoURI} alt="" />
                      <Text size="sm">{item.assetInfo.symbol}</Text>
                      <Text
                        size="xs"
                        style={{
                          color: colors.grey12
                        }}>
                        {assetWithChainMap[item.assetInfo.symbol!].chainIdList.length} networks
                      </Text>
                    </Row>
                  ))}
              </Column>
            </>
          ) : (
            <>
              {/* select chain */}
              <Row
                itemsCenter
                gap="sm"
                style={{
                  overflow: 'hidden'
                }}>
                <Icon
                  icon="left"
                  style={{
                    width: '12px',
                    height: '12px',
                    transition: '.4s',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setSelectAssetInfo(undefined);
                  }}
                />
                <Row
                  itemsCenter
                  style={{
                    flexShrink: 0,
                    padding: '10px',
                    borderRadius: '10px',
                    background: colors.black,
                    gap: '5px',
                    cursor: 'pointer'
                  }}>
                  <img
                    src={selectAssetInfo?.logoURI}
                    alt=""
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%'
                    }}
                  />
                  <Text
                    style={{
                      fontSize: '12px'
                    }}>
                    {selectAssetInfo?.symbol}
                  </Text>
                </Row>
                <Search
                  placeholder="Search neworks"
                  value={chainKeywords}
                  setValue={(data) => {
                    setChainKeyWords(data);
                  }}
                />
              </Row>
              <Column
                style={{
                  flex: 1,
                  overflow: 'auto'
                }}>
                {selectAssetChainList
                  .filter((chain) => {
                    return chain.chainName.toLocaleLowerCase().includes(chainKeywords.toLocaleLowerCase());
                  })
                  .map((chain, index) => {
                    return (
                      <Row
                        key={`${chain.chainName}-${index}`}
                        itemsCenter
                        gap="md"
                        classname={'bg-item-hover-v2'}
                        style={{
                          backgroundColor: colors.black,
                          padding: '10px 16px',
                          borderRadius: '10px',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          onChange({
                            chain,
                            asset: assetList[chain.chainID].find((item) => item.symbol === selectAssetInfo.symbol)!
                          });
                          reset();
                        }}>
                        <img className={'w-[14px] h-[14px]'} src={chain.logoURI} alt="" />
                        <Text size="sm">{chain.chainName}</Text>
                        <Text
                          size="xs"
                          style={{
                            color: colors.grey12
                          }}>
                          {chain.chainID}
                        </Text>
                      </Row>
                    );
                  })}
              </Column>
            </>
          )}
        </Column>
      </Drawer>
    </>
  );
}
