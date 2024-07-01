import { IChain } from '@/components/WalletConnect/Wallet';
import { AXELAR_DEV_ID, AXELAR_TEST_ID, OSMOSIS_DEV_ID, OSMOSIS_TEST_ID } from '@/ui/constants/chains/chainId';

export const BTC_CHAINS_BRIDGE_DEV: IChain[] = [
  {
    chainID: OSMOSIS_DEV_ID,
    name: 'Osmosis Testnet',
    prefix: 'osmo',
    rpcUrl: 'https://rpc.testcosmos.directory/osmosistestnet',
    restUrl: 'https://rest.testcosmos.directory/osmosistestnet',
    denom: 'uosmo',
    hdPath: "m/44'/118/0'/0/0",
    logo: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg',
    faucetUrl: 'https://faucet.circle.com',
    explorerUrl: 'https://mintscan.io/osmosis-testnet'
  },
  {
    chainID: AXELAR_DEV_ID,
    name: 'Axelar Testnet',
    prefix: 'axelar',
    rpcUrl: 'https://rpc-axelar-testnet.imperator.co:443',
    restUrl: 'https://lcd-axelar-testnet.imperator.co:443',
    denom: 'uaxl',
    hdPath: "m/44'/118/0'/0/0",
    logo: 'https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/axelar-dojo/chain.png',
    faucetUrl: 'https://faucet.testnet.axelar.dev',
    explorerUrl: 'https://testnet.axelarscan.io'
  }
];

export const BTC_CHAINS_BRIDGE_TEST: IChain[] = [
  {
    chainID: OSMOSIS_TEST_ID,
    name: 'Osmosis Testnet',
    prefix: 'osmo',
    rpcUrl: 'https://rpc.testcosmos.directory/osmosistestnet',
    restUrl: 'https://rest.testcosmos.directory/osmosistestnet',
    denom: 'uosmo',
    hdPath: "m/44'/118/0'/0/0",
    logo: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg',
    faucetUrl: 'https://faucet.circle.com',
    explorerUrl: 'https://mintscan.io/osmosis-testnet'
  },
  {
    chainID: AXELAR_TEST_ID,
    name: 'Axelar Testnet',
    prefix: 'axelar',
    rpcUrl: 'https://rpc-axelar-testnet.imperator.co:443',
    restUrl: 'https://lcd-axelar-testnet.imperator.co:443',
    denom: 'uaxl',
    hdPath: "m/44'/118/0'/0/0",
    logo: 'https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/axelar-dojo/chain.png',
    faucetUrl: 'https://faucet.testnet.axelar.dev',
    explorerUrl: 'https://testnet.axelarscan.io'
  }
];

export const BTC_CHAINS_BRIDGE_MAIN: IChain[] = [];
