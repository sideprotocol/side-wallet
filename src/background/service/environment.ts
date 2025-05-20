import { createPersistStore } from '@/background/utils';
import {
  ChainType,
  DEX_CONTRACT_MAINNET,
  DEX_CONTRACT_TESTNET,
  DEX_ROUTER_CONTRACT_MAINNET,
  DEX_ROUTER_CONTRACT_TESTNET,
  SERVICE_BASE_URL_MAINNET,
  SERVICE_BASE_URL_TESTNET,
  SIDE_BRIDGEEXPLORER_URL_MAINNET,
  SIDE_BRIDGEEXPLORER_URL_TESTNET,
  SIDE_BTC_EXPLORER_MAINNET,
  SIDE_BTC_EXPLORER_TESTNET,
  SIDE_CHAIN_MAINNET,
  SIDE_CHAIN_TESTNET,
  SIDE_STATION_URL_MAINNET,
  SIDE_STATION_URL_TESTNET,
  UNISAT_IO_API_MAINNET,
  UNISAT_IO_API_TESTNET,
  UNISAT_RUNE_URL_MAINNET,
  UNISAT_RUNE_URL_TESTNET,
  UNISAT_SERVICE_ENDPOINT_MAINNET,
  UNISAT_SERVICE_ENDPOINT_TESTNET
} from '@/shared/constant';
import services from '@/ui/services';

export type EnvironmentStore = {
  UNISAT_RUNE_URL: string;
  DEX_CONTRACT: string;
  DEX_ROUTER_CONTRACT: string;
  SERVICE_BASE_URL: string;
  SIDE_BTC_EXPLORER: string;
  UNISAT_SERVICE_ENDPOINT: string;
  UNISAT_IO_API: string;
  SIDE_STATION_URL: string;
  SIDE_BRIDGEEXPLORER_URL: string;
  sideChain: typeof SIDE_CHAIN_MAINNET;
};

class EnvironmentService {
  store!: EnvironmentStore;

  init = async () => {
    this.store = await createPersistStore<EnvironmentStore>({
      name: 'environment',
      template: {
        UNISAT_RUNE_URL: UNISAT_RUNE_URL_MAINNET,
        DEX_CONTRACT: DEX_CONTRACT_MAINNET,
        DEX_ROUTER_CONTRACT: DEX_ROUTER_CONTRACT_MAINNET,
        SERVICE_BASE_URL: SERVICE_BASE_URL_MAINNET,
        SIDE_BTC_EXPLORER: SIDE_BTC_EXPLORER_MAINNET,
        UNISAT_SERVICE_ENDPOINT: UNISAT_SERVICE_ENDPOINT_MAINNET,
        UNISAT_IO_API: UNISAT_IO_API_MAINNET,
        SIDE_STATION_URL: SIDE_STATION_URL_MAINNET,
        SIDE_BRIDGEEXPLORER_URL: SIDE_BRIDGEEXPLORER_URL_MAINNET,
        sideChain: SIDE_CHAIN_MAINNET
      }
    });
  };

  setChainType = async (chainType: ChainType) => {
    let chainID = '';
    try {
      const res = await services.base.getBlocksLatest({
        baseURL: chainType === ChainType.BITCOIN_MAINNET ? SIDE_CHAIN_MAINNET.restUrl : SIDE_CHAIN_TESTNET.restUrl
      });
      chainID = res.block.header.chain_id;
    } catch (err) {
      chainID = chainType === ChainType.BITCOIN_MAINNET ? SIDE_CHAIN_MAINNET.chainID : SIDE_CHAIN_TESTNET.chainID;
    }
    if (chainType === ChainType.BITCOIN_MAINNET) {
      this.store.sideChain = {
        ...SIDE_CHAIN_MAINNET,
        chainID
      };
      this.store.UNISAT_RUNE_URL = UNISAT_RUNE_URL_MAINNET;
      this.store.DEX_CONTRACT = DEX_CONTRACT_MAINNET;
      this.store.DEX_ROUTER_CONTRACT = DEX_ROUTER_CONTRACT_MAINNET;
      this.store.SERVICE_BASE_URL = SERVICE_BASE_URL_MAINNET;
      this.store.SIDE_BTC_EXPLORER = SIDE_BTC_EXPLORER_MAINNET;
      this.store.UNISAT_SERVICE_ENDPOINT = UNISAT_SERVICE_ENDPOINT_MAINNET;
      this.store.UNISAT_IO_API = UNISAT_IO_API_MAINNET;
      this.store.SIDE_STATION_URL = SIDE_STATION_URL_MAINNET;
      this.store.SIDE_BRIDGEEXPLORER_URL = SIDE_BRIDGEEXPLORER_URL_MAINNET;
    } else {
      this.store.sideChain = {
        ...SIDE_CHAIN_TESTNET,
        chainID
      };
      this.store.UNISAT_RUNE_URL = UNISAT_RUNE_URL_TESTNET;
      this.store.DEX_CONTRACT = DEX_CONTRACT_TESTNET;
      this.store.DEX_ROUTER_CONTRACT = DEX_ROUTER_CONTRACT_TESTNET;
      this.store.SERVICE_BASE_URL = SERVICE_BASE_URL_TESTNET;
      this.store.SIDE_BTC_EXPLORER = SIDE_BTC_EXPLORER_TESTNET;
      this.store.UNISAT_SERVICE_ENDPOINT = UNISAT_SERVICE_ENDPOINT_TESTNET;
      this.store.UNISAT_IO_API = UNISAT_IO_API_TESTNET;
      this.store.SIDE_STATION_URL = SIDE_STATION_URL_TESTNET;
      this.store.SIDE_BRIDGEEXPLORER_URL = SIDE_BRIDGEEXPLORER_URL_TESTNET;
    }
  };

  getEnvironment = () => {
    return {
      UNISAT_RUNE_URL: this.store.UNISAT_RUNE_URL,
      DEX_CONTRACT: this.store.DEX_CONTRACT,
      DEX_ROUTER_CONTRACT: this.store.DEX_ROUTER_CONTRACT,
      SERVICE_BASE_URL: this.store.SERVICE_BASE_URL,
      SIDE_BTC_EXPLORER: this.store.SIDE_BTC_EXPLORER,
      UNISAT_SERVICE_ENDPOINT: this.store.UNISAT_SERVICE_ENDPOINT,
      UNISAT_IO_API: this.store.UNISAT_IO_API,
      SIDE_STATION_URL: this.store.SIDE_STATION_URL,
      SIDE_BRIDGEEXPLORER_URL: this.store.SIDE_BRIDGEEXPLORER_URL,
      sideChain: this.store.sideChain
    };
  };
}

export default new EnvironmentService();
