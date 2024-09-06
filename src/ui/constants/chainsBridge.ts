import { IChain } from '@/components/WalletConnect/Wallet';
import {
  NOBLE_DEV_ID,
  NOBLE_TEST_ID,
  AXELAR_DEV_ID,
  AXELAR_TEST_ID,
  BABYLON_TEST_ID
} from '@/ui/constants/chains/chainId';

export const CHAINS_BRIDGE_DEV: IChain[] = [
  {
    chainID: NOBLE_DEV_ID,
    name: 'Noble Testnet',
    prefix: 'noble',
    rpcUrl: 'https://rpc.testnet.noble.strange.love',
    restUrl: 'https://api.testnet.noble.strange.love',
    denom: 'uusdc',
    hdPath: 'm/44\'/118/0\'/0/0',
    logo: 'https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/noble/chain.png',
    faucetUrl: 'https://faucet.circle.com',
    explorerUrl: 'https://www.mintscan.io/noble-testnet'
  },
  {
    chainID: AXELAR_DEV_ID,
    name: 'Axelar Testnet',
    prefix: 'axelar',
    rpcUrl: 'https://rpc-axelar-testnet.imperator.co:443',
    restUrl: 'https://lcd-axelar-testnet.imperator.co:443',
    denom: 'uaxl',
    hdPath: 'm/44\'/118/0\'/0/0',
    logo: 'https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/axelar-dojo/chain.png',
    faucetUrl: 'https://faucet.testnet.axelar.dev',
    explorerUrl: 'https://testnet.axelarscan.io'
  }
];

export const CHAINS_BRIDGE_TEST: IChain[] = [
  {
    chainID: NOBLE_TEST_ID,
    name: 'Noble Testnet',
    prefix: 'noble',
    rpcUrl: 'https://rpc.testnet.noble.strange.love',
    restUrl: 'https://api.testnet.noble.strange.love',
    denom: 'uusdc',
    hdPath: 'm/44\'/118/0\'/0/0',
    logo: 'https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/noble/chain.png',
    faucetUrl: 'https://faucet.circle.com',
    explorerUrl: 'https://www.mintscan.io/noble-testnet'
  },
  {
    chainID: AXELAR_TEST_ID,
    name: 'Axelar Testnet',
    prefix: 'axelar',
    rpcUrl: 'https://rpc-axelar-testnet.imperator.co:443',
    restUrl: 'https://lcd-axelar-testnet.imperator.co:443',
    denom: 'uaxl',
    hdPath: 'm/44\'/118/0\'/0/0',
    logo: 'https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/axelar-dojo/chain.png',
    faucetUrl: 'https://faucet.testnet.axelar.dev',
    explorerUrl: 'https://testnet.axelarscan.io'
  },
  {
    chainID: BABYLON_TEST_ID,
    name: 'Babylon Testnet',
    prefix: 'bbn',
    rpcUrl: 'https://rpc.testnet3.babylonchain.io',
    restUrl: 'https://lcd.testnet3.babylonchain.io',
    denom: 'ubbn',
    hdPath: 'm/44\'/118/0\'/0/0',
    logo: 'https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/bbn-test/chain.png',
    faucetUrl: '',
    explorerUrl: 'https://testnet.babylon.explorers.guru'
  }
];

export const CHAINS_BRIDGE_MAIN: IChain[] = [];
