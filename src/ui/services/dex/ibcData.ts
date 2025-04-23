import { isProduction } from '@/shared/constant';
import { NOBLE_DEV_ID, NOBLE_MAIN_ID, OSMOSIS_MAIN_ID } from '@/shared/constant/chainid';
import { IAsset } from '@/shared/types';

export const IBC_MAIN_DATA: IAsset[] = [
  {
    denom: 'ibc/65D0BEC6DAD96C7F5043D1E54E54B6BB5D5B3AEC3FF6CEBB75B9E059F3580EA3',
    symbol: 'USDC',
    name: 'Noble USDC',
    exponent: '6',
    precision: 6,
    logo: 'https://api.side.one/static/token/logo/usdc.svg',
    rune: false,
    ibcData: [
      {
        oppositeChainId: NOBLE_MAIN_ID,
        oppositeChainDenom: 'uusdc',
        oppositeChainChannelId: 'channel-1',
        sideChainChannelId: 'channel-123',
        portId: 'transfer'
      }
    ]
  },
  {
    denom: 'uside',
    symbol: 'SIDE',
    name: 'Side Protocol',
    exponent: '6',
    precision: 6,
    logo: 'https://api.side.one/static/token/logo/side.png',
    rune: false,
    ibcData: [
      {
        oppositeChainId: OSMOSIS_MAIN_ID,
        oppositeChainDenom: 'ibc/16B3CDBADC506456F3D71E22CE422BB990D7186D611B09744F39F47931B5C738',
        oppositeChainChannelId: 'channel-0',
        sideChainChannelId: 'channel-98081',
        portId: 'transfer'
      }
      // {
      //   oppositeChainId: NOBLE_MAIN_ID,
      //   oppositeChainDenom: "ibc/84B654AB6D8BF61EDAC7EFAAF36DB7E4BD7DE0219C6C7005D9CCAD0F9B6E33CA",
      //   oppositeChainChannelId: "channel-1",
      //   sideChainChannelId: "channel-123",
      //   portId: "transfer",
      // },
    ]
  },
  {
    denom: 'sat',
    symbol: 'sBTC',
    name: 'Bitcoin',
    exponent: '8',
    precision: 8,
    logo: 'https://api.side.one/static/token/logo/sBTC.svg',
    rune: false,
    ibcData: [
      {
        oppositeChainId: OSMOSIS_MAIN_ID,
        oppositeChainDenom: 'ibc/8765FF0D37A7A85357ED28061EDEBC736743216DB06FE92231957CE158FB351E',
        oppositeChainChannelId: 'channel-0',
        sideChainChannelId: 'channel-98081',
        portId: 'transfer'
      }
    ]
  }
];

export const IBC_DEV_DATA: IAsset[] = [
  {
    denom: 'ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5',
    symbol: 'n.USDC',
    name: 'Noble USDC',
    exponent: '6',
    precision: 6,
    logo: 'https://api.side.one/static/token/logo/usdc.svg',
    rune: false,
    ibcData: [
      {
        oppositeChainId: NOBLE_DEV_ID,
        oppositeChainDenom: 'uusdc',
        oppositeChainChannelId: 'channel-0',
        sideChainChannelId: 'channel-230',
        portId: 'transfer'
      }
    ]
  }
];

export const IBC_DATA = isProduction ? IBC_MAIN_DATA : IBC_DEV_DATA;

export function addIbcInformation(initData: IAsset[]): IAsset[] {
  const initDataMap = new Map<string, IAsset>(),
    ibcDataMap = new Map<string, IAsset>();
  IBC_DATA.forEach((item) => {
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
