import BitcoinService from '@/ui/services/bitcoin';
import ApiClient from '@/ui/services/network/ApiClient';
import { ApiConfiguration } from '@/ui/services/network/ApiConfiguration';

import BankService from './bank';
import BaseService from './base';
import BridgeService from './bridge';
import BTCStoreService from './btc-store';
import DexService from './dex';
import EnvironmentService from './environment';
import LendingService from './lending';
import NodeService from './node';
import SignetService from './signet-index';
import TxService from './tx';
import UnisatService from './unisat';

class Services {
  tx: TxService;
  base: BaseService;
  dex: DexService;
  node: NodeService;
  signet: SignetService;
  bridge: BridgeService;
  unisat: UnisatService;
  bank: BankService;
  bitcoin: BitcoinService;
  lending: LendingService;
  btcStore: BTCStoreService;
  environment: EnvironmentService;
  constructor() {
    const apiClient = new ApiConfiguration({ baseURL: '' });
    this.tx = new TxService(new ApiClient(apiClient));
    this.base = new BaseService(new ApiClient(apiClient));
    this.dex = new DexService(new ApiClient(apiClient));
    this.node = new NodeService(new ApiClient(apiClient));
    this.bridge = new BridgeService(new ApiClient(apiClient));
    this.bank = new BankService(new ApiClient(apiClient));
    this.unisat = new UnisatService(new ApiClient(apiClient));
    this.bitcoin = new BitcoinService(new ApiClient(apiClient));
    this.signet = new SignetService(new ApiClient(apiClient));
    this.btcStore = new BTCStoreService(new ApiClient(apiClient));
    this.lending = new LendingService(new ApiClient(apiClient));
    this.environment = new EnvironmentService(new ApiClient(apiClient));
  }
}

export default new Services();
