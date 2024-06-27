import { IAsset } from ".";
import { SIDE_TEST_ASSETLIST } from "./sideAsset";

export const COSMOS_DEV_ASSETLIST: { [key: string]: IAsset } = {
  // native token
  Atom: {
    base: "uatom",
    symbol: "ATOM",
    name: "Cosmos",
    exponent: "6",
    coingecko_id: "usd-coin",
    logo: "side-ATOM",
    precision: 6,
  },
  // ibc token
};

export const COSMOS_TEST_ASSETLIST: { [key: string]: IAsset } = {
  // native token
  Atom: {
    base: "uatom",
    symbol: "ATOM",
    name: "Cosmos",
    exponent: "6",
    coingecko_id: "usd-coin",
    logo: "side-ATOM",
    precision: 6,
  },
  // ibc token
  Side_ibc_side: {
    ...SIDE_TEST_ASSETLIST.Side,
    base: "ibc/807EDB0F32C066EA07BAC8E9B2CAAE036C1878E35F4A6BFB408E53CDEB0E5A35",
  },
};

export const COSMOS_MAIN_ASSETLIST = {};
