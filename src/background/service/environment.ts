import { createPersistStore } from '@/background/utils';
import { ChainType, SERVICE_BASE_URL_MAINNET, SERVICE_BASE_URL_TESTNET, SIDE_CHAIN_MAINNET } from '@/shared/constant';
import { IChain } from '@/shared/types';
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
  sideChain: IChain;
  chains: IChain[];
};

class EnvironmentService {
  store!: EnvironmentStore;

  init = async () => {
    this.store = await createPersistStore<EnvironmentStore>({
      name: 'environment',
      template: {
        UNISAT_RUNE_URL: '',
        DEX_CONTRACT: '',
        DEX_ROUTER_CONTRACT: '',
        SERVICE_BASE_URL: SERVICE_BASE_URL_MAINNET,
        SIDE_BTC_EXPLORER: '',
        UNISAT_SERVICE_ENDPOINT: '',
        UNISAT_IO_API: '',
        SIDE_STATION_URL: '',
        SIDE_BRIDGEEXPLORER_URL: '',
        sideChain: SIDE_CHAIN_MAINNET,
        chains: []
      }
    });
    try {
      const { config, chains } = await services.environment.getWalletParams({
        baseURL: this.store.SERVICE_BASE_URL
      });
      if (this.store.UNISAT_RUNE_URL !== config.UNISAT_RUNE_URL) {
        this.store.UNISAT_RUNE_URL = config.UNISAT_RUNE_URL;
      }
      if (this.store.DEX_CONTRACT !== config.DEX_CONTRACT) {
        this.store.DEX_CONTRACT = config.DEX_CONTRACT;
      }
      if (this.store.DEX_ROUTER_CONTRACT !== config.DEX_ROUTER_CONTRACT) {
        this.store.DEX_ROUTER_CONTRACT = config.DEX_ROUTER_CONTRACT;
      }
      if (this.store.SIDE_BTC_EXPLORER !== config.SIDE_BTC_EXPLORER) {
        this.store.SIDE_BTC_EXPLORER = config.SIDE_BTC_EXPLORER;
      }
      if (this.store.UNISAT_SERVICE_ENDPOINT !== config.UNISAT_SERVICE_ENDPOINT) {
        this.store.UNISAT_SERVICE_ENDPOINT = config.UNISAT_SERVICE_ENDPOINT;
      }
      if (this.store.UNISAT_IO_API !== config.UNISAT_IO_API) {
        this.store.UNISAT_IO_API = config.UNISAT_IO_API;
      }
      if (this.store.SIDE_STATION_URL !== config.SIDE_STATION_URL) {
        this.store.SIDE_STATION_URL = config.SIDE_STATION_URL;
      }
      if (this.store.SIDE_BRIDGEEXPLORER_URL !== config.SIDE_BRIDGEEXPLORER_URL) {
        this.store.SIDE_BRIDGEEXPLORER_URL = config.SIDE_BRIDGEEXPLORER_URL;
      }
      this.store.sideChain = config.SIDE_CHAIN;
      this.store.chains = chains;
    } catch (err) {
      console.error(err);
    }
  };

  setChainType = async (chainType: ChainType) => {
    let baseURL = SERVICE_BASE_URL_MAINNET;
    if (chainType === ChainType.BITCOIN_TESTNET) {
      baseURL = SERVICE_BASE_URL_TESTNET;
    }
    const { config, chains } = await services.environment.getWalletParams({ baseURL });
    this.store.UNISAT_RUNE_URL = config.UNISAT_RUNE_URL;
    this.store.DEX_CONTRACT = config.DEX_CONTRACT;
    this.store.DEX_ROUTER_CONTRACT = config.DEX_ROUTER_CONTRACT;
    this.store.SIDE_BTC_EXPLORER = config.SIDE_BTC_EXPLORER;
    this.store.UNISAT_SERVICE_ENDPOINT = config.UNISAT_SERVICE_ENDPOINT;
    this.store.UNISAT_IO_API = config.UNISAT_IO_API;
    this.store.SIDE_STATION_URL = config.SIDE_STATION_URL;
    this.store.SIDE_BRIDGEEXPLORER_URL = config.SIDE_BRIDGEEXPLORER_URL;
    this.store.sideChain = config.SIDE_CHAIN;
    this.store.chains = chains;
    this.store.SERVICE_BASE_URL = baseURL;
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
      sideChain: this.store.sideChain,
      chains: this.store.chains
    };
  };
}

export default new EnvironmentService();
