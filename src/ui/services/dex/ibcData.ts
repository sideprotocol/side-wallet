// import testnetData from './testnet.json';
import { SERVICE_BASE_URL_MAINNET } from '@/shared/constant';
import { IAsset, IAssetItem } from '@/shared/types';

import devnetData from './devnet.json';
import mainnetData from './mainnet.json';

export function addIbcInformation(initData: IAssetItem[], baseURL?: string): IAssetItem[] {
  const initDataMap = new Map<string, IAssetItem>(),
    ibcDataMap = new Map<string, IAsset>();
  (baseURL === SERVICE_BASE_URL_MAINNET ? mainnetData : devnetData).data.forEach((item) => {
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
