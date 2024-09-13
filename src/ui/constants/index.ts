import { IBC_CHANNELS_SIDE_CHAIN_DEV, IBC_CHANNELS_SIDE_CHAIN_MAIN, IBC_CHANNELS_SIDE_CHAIN_TEST } from './IBCPaths';
import {
  ASSETS_DEV,
  ASSETS_MAIN,
  ASSETS_TEST,
  BRIDGE_ASSETS_DEV,
  BRIDGE_ASSETS_MAIN,
  BRIDGE_ASSETS_TEST,
  SWAP_ASSETS_DEV,
  SWAP_ASSETS_MAIN,
  SWAP_ASSETS_TEST
} from './assets';
import { CHAINS_DEV, CHAINS_MAIN, CHAINS_TEST } from './chains';
import {
  AXELAR_DEV_ID,
  AXELAR_MAIN_ID,
  AXELAR_TEST_ID,
  BABYLON_DEV_ID,
  BABYLON_MAIN_ID,
  BABYLON_TEST_ID,
  COSMOS_DEV_ID,
  COSMOS_MAIN_ID,
  COSMOS_TEST_ID,
  NOBLE_DEV_ID,
  NOBLE_MAIN_ID,
  NOBLE_TEST_ID,
  OSMOSIS_DEV_ID,
  OSMOSIS_MAIN_ID,
  OSMOSIS_TEST_ID,
  SIDE_DEV_ID,
  SIDE_MAIN_ID,
  SIDE_TEST_ID
} from './chains/chainId';
import { SIDE_DEV_EXPLORER_LIST, SIDE_MAIN_EXPLORER_LIST, SIDE_TEST_EXPLORER_LIST } from './chains/explorer';
import {
  SIDE_DEV_REST_LIST,
  SIDE_DEV_RPC_LIST,
  SIDE_MAIN_REST_LIST,
  SIDE_MAIN_RPC_LIST,
  SIDE_TEST_REST_LIST,
  SIDE_TEST_RPC_LIST
} from './chains/rpc';
import { CHAINS_BRIDGE_DEV, CHAINS_BRIDGE_MAIN, CHAINS_BRIDGE_TEST } from './chainsBridge';
import { SIDE_DEV_GASTOKEN, SIDE_MAIN_GASTOKEN, SIDE_TEST_GASTOKEN } from './gasToken';

export const envMode = 'test';

export const isProduction = !process.env.DEBUG;
export const isTest = process.env.DEBUG;

export const ASSETS = isProduction ? ASSETS_MAIN : isTest ? ASSETS_TEST : ASSETS_DEV;

export const SWAP_ASSETS = isProduction ? SWAP_ASSETS_MAIN : isTest ? SWAP_ASSETS_TEST : SWAP_ASSETS_DEV;

export const BRIDGE_ASSETS = isProduction ? BRIDGE_ASSETS_MAIN : isTest ? BRIDGE_ASSETS_TEST : BRIDGE_ASSETS_DEV;

export const IBC_CHANNELS_SIDE_CHAIN = isProduction
  ? IBC_CHANNELS_SIDE_CHAIN_MAIN
  : isTest
  ? IBC_CHANNELS_SIDE_CHAIN_TEST
  : IBC_CHANNELS_SIDE_CHAIN_DEV;
export const CHAINS = isProduction ? CHAINS_MAIN : isTest ? CHAINS_DEV : CHAINS_DEV;
export const CHAINS_BRIDGE = isProduction ? CHAINS_BRIDGE_MAIN : isTest ? CHAINS_BRIDGE_TEST : CHAINS_BRIDGE_DEV;

export const SIDE_ID = isProduction ? SIDE_MAIN_ID : isTest ? SIDE_DEV_ID : SIDE_DEV_ID;
export const COSMOS_ID = isProduction ? COSMOS_MAIN_ID : isTest ? COSMOS_TEST_ID : COSMOS_DEV_ID;

export const NOBLE_ID = isProduction ? NOBLE_MAIN_ID : isTest ? NOBLE_TEST_ID : NOBLE_DEV_ID;

export const AXELAR_ID = isProduction ? AXELAR_MAIN_ID : isTest ? AXELAR_TEST_ID : AXELAR_DEV_ID;
export const BABYLON_ID = isProduction ? BABYLON_MAIN_ID : isTest ? BABYLON_TEST_ID : BABYLON_DEV_ID;
export const OSMOSIS_ID = isProduction ? OSMOSIS_MAIN_ID : isTest ? OSMOSIS_TEST_ID : OSMOSIS_DEV_ID;

// export const SERVICE_BASE_URL = 'https://insider.side.one/indexer-station-testnet';
export const SERVICE_BASE_URL = 'https://insider.side.one/indexer-station-devnet';

export const SIDE_RPC_LIST = isProduction ? SIDE_MAIN_RPC_LIST : isTest ? SIDE_TEST_RPC_LIST : SIDE_DEV_RPC_LIST;

export const SIDE_REST_LIST = isProduction ? SIDE_MAIN_REST_LIST : isTest ? SIDE_TEST_REST_LIST : SIDE_DEV_REST_LIST;

export const SIDE_EXPLORER_LIST = isProduction
  ? SIDE_MAIN_EXPLORER_LIST
  : isTest
  ? SIDE_TEST_EXPLORER_LIST
  : SIDE_DEV_EXPLORER_LIST;

export const SIDE_GASTOKEN = isProduction ? SIDE_MAIN_GASTOKEN : isTest ? SIDE_TEST_GASTOKEN : SIDE_DEV_GASTOKEN;

export const SIDE_FAUCET = '';

export const BTC_BRIDGE_VAULT = '';
export const SIDE_BTC_INDEXER = '';
export const UNISAT_IO_API = 'https://devnet-rest.side.one/side/btcbridge';
export const UNISAT_SERVICE_ENDPOINT = 'https://wallet-api-testnet.unisat.io';

export const SIDE_BTC_EXPLORER = 'https://signet.side.one';
export const SIDE_RUNE_INDEXER = 'https://signet.side.one';

export const DEX_CONTRACT = 'tb1pwkwy0xh89ksdgj9hr347dyd2dw7zesmtrue6kfzyml4vdtz6e5ws93fqnh';
export const DEX_ROUTER_CONTRACT = 'tb1p7p9rzwnnfxcjp32un9ug7yhhzgtkhvl9jfksztgw5uh69wac2pgscc4xdz';
