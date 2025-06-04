import { IAsset, IAssetItem } from '@/shared/types';

// import mainnetData from './mainnet.json';
// import testnetData from './testnet.json';
import devnetData from './devnet.json';

export function addIbcInformation(initData: IAssetItem[]): IAssetItem[] {
  const initDataMap = new Map<string, IAssetItem>(),
    ibcDataMap = new Map<string, IAsset>();
  devnetData.data.forEach((item) => {
    ibcDataMap.set(item.denom, item);
  });
  initData.forEach((item) => {
    let formatItem = item;
    if (ibcDataMap.has(item.denom)) {
      formatItem = {
        ...item,
        ibcData: ibcDataMap.get(item.denom)?.ibcData
      };
      ibcDataMap.delete(item.denom);
    }
    initDataMap.set(item.denom, formatItem);
  });
  const ibcDataArr = Array.from(ibcDataMap.values()).map((item) => {
    return {
      ...item,
      runeData: null,
      rune: false,
      sidePrice: '0',
      bitcoinPrice: '0',
      holdersCount: 0,
      totalSupplyOnSideChain: 0
    };
  });

  const allData = [...Array.from(initDataMap.values()), ...ibcDataArr];

  return allData;
}
