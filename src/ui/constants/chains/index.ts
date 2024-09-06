// import { IChain } from "@/components/WalletConnect/Wallet";
import { SIDE_DEV_ID, SIDE_TEST_ID } from './chainId';
import { SIDE_DEV_EXPLORER_LIST, SIDE_TEST_EXPLORER_LIST } from './explorer';
import { SIDE_DEV_RPC_LIST, SIDE_TEST_RPC_LIST, SIDE_DEV_REST_LIST, SIDE_TEST_REST_LIST } from './rpc';

export const CHAINS_DEV = [
  {
    chainID: SIDE_DEV_ID,
    name: 'SIDE devnet',
    prefix: 'tb',
    rpcUrl: SIDE_DEV_RPC_LIST[0].value,
    restUrl: SIDE_DEV_REST_LIST[0].value,
    denom: 'uside',
    hdPath: 'm/44\'/118/0\'/0/0',
    logo: 'side-Proxima',
    faucetUrl: 'https://faucet.side.exchange',
    explorerUrl: SIDE_DEV_EXPLORER_LIST[0].value
  }
];

export const CHAINS_TEST = [
  {
    chainID: SIDE_TEST_ID,
    name: 'SIDE Testnet',
    prefix: 'bc',
    rpcUrl: SIDE_TEST_RPC_LIST[0].value,
    restUrl: SIDE_TEST_REST_LIST[0].value,
    denom: 'uside',
    hdPath: 'm/44\'/118/0\'/0/0',
    logo: 'side-Proxima',
    faucetUrl: 'https://faucet.side.one',
    explorerUrl: SIDE_TEST_EXPLORER_LIST[0].value
  }
];

export const CHAINS_MAIN = [];
