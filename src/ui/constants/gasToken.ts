import {
  SIDE_DEV_ASSETLIST,
  SIDE_TEST_ASSETLIST,
  SIDE_MAIN_ASSETLIST,
} from "./assets/sideAsset";

export const SIDE_DEV_GASTOKEN = [
  {
    symbol: SIDE_DEV_ASSETLIST.Side.symbol,
    logo: SIDE_DEV_ASSETLIST.Side.logo,
    denom: SIDE_DEV_ASSETLIST.Side.base,
    feeAmount: "60000",
  },
  {
    symbol: SIDE_DEV_ASSETLIST.Usdc.symbol,
    logo: SIDE_DEV_ASSETLIST.Usdc.logo,
    denom: SIDE_DEV_ASSETLIST.Usdc.base,
    feeAmount: "60000",
  },
  {
    symbol: SIDE_DEV_ASSETLIST.Usdt.symbol,
    logo: SIDE_DEV_ASSETLIST.Usdt.logo,
    denom: SIDE_DEV_ASSETLIST.Usdt.base,
    feeAmount: "60000",
  },
];
export const SIDE_TEST_GASTOKEN = [
  {
    symbol: SIDE_TEST_ASSETLIST.Side.symbol,
    logo: SIDE_TEST_ASSETLIST.Side.logo,
    denom: SIDE_TEST_ASSETLIST.Side.base,
    feeAmount: "60000",
  },
  {
    symbol: SIDE_TEST_ASSETLIST.Btct.symbol,
    logo: SIDE_TEST_ASSETLIST.Btct.logo,
    denom: SIDE_TEST_ASSETLIST.Btct.base,
    feeAmount: "100",
  },
];
export const SIDE_MAIN_GASTOKEN = [
  {
    symbol: SIDE_MAIN_ASSETLIST.Side.symbol,
    logo: SIDE_MAIN_ASSETLIST.Side.logo,
    denom: SIDE_MAIN_ASSETLIST.Side.base,
    feeAmount: "60000",
  },
];
