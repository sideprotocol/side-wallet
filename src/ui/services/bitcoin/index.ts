import { AxiosRequestConfig } from 'axios';

import { getQueryParams } from '../getQueryParams';
import ApiClient from '../network/ApiClient';

export default class BitcoinService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async postTxHash(txid: string, config: AxiosRequestConfig) {
    const queryParams = getQueryParams({ txid });
    const result = await this.apiClient.post(`/bitcoin/add-deposit-bitcoin-transaction?${queryParams}`, '', config);
    return result;
  }
}
