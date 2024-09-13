import ApiClient from '@/ui/services/network/ApiClient';
import { ApiConfiguration } from '@/ui/services/network/ApiConfiguration';

import BaseService from './base';
import BridgeService from './bridge';
import DexService from './dex';
import NodeService from './node';
import SignetService from './signet-index';
import TxService from './tx';
import BankService from './bank';
import UnisatService from './unisat';
import BitcoinService from '@/ui/services/bitcoin';

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
  }
}

export default new Services();
