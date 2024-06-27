import ApiClient from "@/ui/services/network/ApiClient";
import { ApiConfiguration } from "@/ui/services/network/ApiConfiguration";


import TxService from "./tx";
import BaseService from "./base";
import DexService from "./dex";


class Services {
  tx: TxService;
  base: BaseService;
  dex: DexService;

  constructor() {
    const apiClient = new ApiConfiguration({ baseURL: "" });
    this.tx = new TxService(new ApiClient(apiClient));
    this.base = new BaseService(new ApiClient(apiClient));
    this.dex = new DexService(new ApiClient(apiClient));
  }
}

export default new Services();
