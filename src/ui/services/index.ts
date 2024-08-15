import ApiClient from '@/ui/services/network/ApiClient';
import { ApiConfiguration } from '@/ui/services/network/ApiConfiguration';

import BaseService from './base';
import DexService from './dex';
import NodeService from './node';
import TxService from './tx';

class Services {
  tx: TxService;
  base: BaseService;
  dex: DexService;
  node: NodeService;

  constructor() {
    const apiClient = new ApiConfiguration({ baseURL: '' });
    this.tx = new TxService(new ApiClient(apiClient));
    this.base = new BaseService(new ApiClient(apiClient));
    this.dex = new DexService(new ApiClient(apiClient));
    this.node = new NodeService(new ApiClient(apiClient));
  }
}

export default new Services();
