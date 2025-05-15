import { AxiosRequestConfig } from 'axios';

import ApiClient from '@/ui/services/network/ApiClient';

import { getQueryParams } from '../getQueryParams';

export default class BTCStoreService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getSidePriceInSats(config: AxiosRequestConfig) {
    const response = await this.apiClient.get<string>('/btcstore/side_price_in_sats', config);
    return response;
  }

  async getMinPurchaseAmount(config: AxiosRequestConfig) {
    const response = await this.apiClient.get<string>('/btcstore/min_purchase_amount_of_sides', config);
    return response;
  }

  async getMaxPurchaseAmount(config: AxiosRequestConfig) {
    const response = await this.apiClient.get<string>('/btcstore/max_purchase_amount_of_sides', config);
    return response;
  }

  async getTradesByAddress(address: string, config: AxiosRequestConfig) {
    const queryParams = getQueryParams({
      address: address
    });
    const response = await this.apiClient.get<string>(`/btcstore/get_trades_by_address?${queryParams}`, config);
    return response;
  }

  async getTradeByTxId(txId: string, config: AxiosRequestConfig) {
    const queryParams = getQueryParams({
      txid: txId
    });
    const response = await this.apiClient.get<string>(`/btcstore/get_trade_byBtctxhash?${queryParams}`, config);
    return response;
  }

  async getBtcVaultAddress(config: AxiosRequestConfig) {
    const response = await this.apiClient.get<string>('/btcstore/btc_vault_address', config);
    return response;
  }

  async submit_btctxhash(btctxhash: string, config: AxiosRequestConfig) {
    const queryParams = getQueryParams({
      btcTxhash: btctxhash
    });
    const response = await this.apiClient.post(`/btcstore/submit_btctxhash?${queryParams}`, '', config);
    return response;
  }
}
