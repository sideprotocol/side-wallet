import {
  COSMOS_DEV_ID,
  COSMOS_TEST_ID,
  SIDE_DEV_ID,
  SIDE_TEST_ID,
  NOBLE_DEV_ID,
  NOBLE_TEST_ID,
  AXELAR_DEV_ID,
  AXELAR_TEST_ID,
  BABYLON_TEST_ID,
  OSMOSIS_DEV_ID,
  OSMOSIS_TEST_ID,
} from '@/ui/constants/chains/chainId';
import { IBridgeAsset, IChainAsset } from './type';
import { SIDE_DEV_ASSETLIST, SIDE_TEST_ASSETLIST } from './sideAsset';
import { COSMOS_DEV_ASSETLIST, COSMOS_TEST_ASSETLIST } from './cosmosAsset';
import { NOBLE_DEV_ASSETLIST, NOBLE_TEST_ASSETLIST } from './nobleAsset';
import { AXELAR_DEV_ASSETLIST, AXELAR_TEST_ASSETLIST } from './axelarAsset';
import { BABYLON_TEST_ASSETLIST } from './babylonAsset';
import { OSMOSIS_DEV_ASSETLIST, OSMOSIS_TEST_ASSETLIST } from './osmosisAsset';

export type { IAsset } from './type';

// all chain asset
export const ASSETS_DEV: IChainAsset[] = [
  {
    chainID: SIDE_DEV_ID,
    assets: Object.values(SIDE_DEV_ASSETLIST),
  },
  {
    chainID: COSMOS_DEV_ID,
    assets: Object.values(COSMOS_DEV_ASSETLIST),
  },
  {
    chainID: NOBLE_DEV_ID,
    assets: Object.values(NOBLE_DEV_ASSETLIST),
  },
  {
    chainID: AXELAR_DEV_ID,
    assets: Object.values(AXELAR_DEV_ASSETLIST),
  },
  {
    chainID: OSMOSIS_DEV_ID,
    assets: Object.values(OSMOSIS_DEV_ASSETLIST),
  },
];

export const ASSETS_TEST: IChainAsset[] = [
  {
    chainID: SIDE_TEST_ID,
    assets: Object.values(SIDE_TEST_ASSETLIST),
  },
  {
    chainID: COSMOS_TEST_ID,
    assets: Object.values(COSMOS_TEST_ASSETLIST),
  },
  {
    chainID: NOBLE_TEST_ID,
    assets: Object.values(NOBLE_TEST_ASSETLIST),
  },
  {
    chainID: AXELAR_TEST_ID,
    assets: Object.values(AXELAR_TEST_ASSETLIST),
  },
  {
    chainID: BABYLON_TEST_ID,
    assets: Object.values(BABYLON_TEST_ASSETLIST),
  },
  {
    chainID: OSMOSIS_TEST_ID,
    assets: Object.values(OSMOSIS_TEST_ASSETLIST),
  },
];

export const ASSETS_MAIN: IChainAsset[] = [];

// swap pool asset
export const SWAP_ASSETS_DEV: IChainAsset = {
  chainID: SIDE_DEV_ID,
  assets: [
    SIDE_DEV_ASSETLIST.Side,
    SIDE_DEV_ASSETLIST.Usdc,
    SIDE_DEV_ASSETLIST.Usdt,
    SIDE_DEV_ASSETLIST.Btc,
    SIDE_DEV_ASSETLIST.Wbtc,
    SIDE_DEV_ASSETLIST['runes/8776:1'],
  ],
};

export const SWAP_ASSETS_TEST: IChainAsset = {
  chainID: SIDE_TEST_ID,
  assets: [
    SIDE_TEST_ASSETLIST.Side,
    SIDE_TEST_ASSETLIST.Usdc,
    SIDE_TEST_ASSETLIST.Usdt,
    SIDE_TEST_ASSETLIST.Btc,
    SIDE_TEST_ASSETLIST.Wbtc,
    SIDE_TEST_ASSETLIST['runes/9110:1'],
  ],
};

export const SWAP_ASSETS_MAIN: IChainAsset = {} as IChainAsset;

// bridge asset
export const BRIDGE_ASSETS_DEV: IBridgeAsset = {
  [NOBLE_DEV_ID]: {
    [SIDE_DEV_ID]: {
      assets: [SIDE_DEV_ASSETLIST.Side, SIDE_DEV_ASSETLIST.Usdc_ibc_noble],
    },
    [NOBLE_DEV_ID]: {
      assets: [NOBLE_DEV_ASSETLIST.Usdc, NOBLE_DEV_ASSETLIST.Side_ibc_side],
    },
  },
  [AXELAR_DEV_ID]: {
    [SIDE_DEV_ID]: {
      assets: [SIDE_DEV_ASSETLIST.Side, SIDE_DEV_ASSETLIST.Ausdc_ibc_axelar],
    },
    [AXELAR_DEV_ID]: {
      assets: [AXELAR_DEV_ASSETLIST.Ausdc, AXELAR_DEV_ASSETLIST.Side_ibc_side],
    },
  },
};

export const BRIDGE_ASSETS_TEST: IBridgeAsset = {
  [NOBLE_TEST_ID]: {
    [SIDE_TEST_ID]: {
      assets: [
        SIDE_TEST_ASSETLIST.Btct,
        SIDE_TEST_ASSETLIST.Side,
        SIDE_TEST_ASSETLIST.Usdc_ibc_noble,
      ],
    },
    [NOBLE_TEST_ID]: {
      assets: [NOBLE_TEST_ASSETLIST.Usdc, NOBLE_TEST_ASSETLIST.Side_ibc_side],
    },
  },
  [AXELAR_TEST_ID]: {
    [SIDE_TEST_ID]: {
      assets: [SIDE_TEST_ASSETLIST.Side, SIDE_TEST_ASSETLIST.Ausdc_ibc_axelar],
    },
    [AXELAR_TEST_ID]: {
      assets: [
        AXELAR_TEST_ASSETLIST.Ausdc,
        AXELAR_TEST_ASSETLIST.Side_ibc_side,
      ],
    },
  },
  [BABYLON_TEST_ID]: {
    [SIDE_TEST_ID]: {
      assets: [SIDE_TEST_ASSETLIST.Side, SIDE_TEST_ASSETLIST.Bbn_ibc_babylon],
    },
    [BABYLON_TEST_ID]: {
      assets: [
        BABYLON_TEST_ASSETLIST.Bbn,
        BABYLON_TEST_ASSETLIST.Side_ibc_side,
      ],
    },
  },
};
export const BRIDGE_ASSETS_MAIN: IBridgeAsset = {};
