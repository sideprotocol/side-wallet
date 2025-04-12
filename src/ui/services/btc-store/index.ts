import { SERVICE_BASE_URL } from '@/shared/constant';
import ApiClient from '@/ui/services/network/ApiClient';

import { getQueryParams } from '../getQueryParams';

export default class BTCStoreService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getSidePriceInSats() {
    const response = await this.apiClient.get<string>(`${SERVICE_BASE_URL}/btcstore/side_price_in_sats`);
    return response;
  }

  async getMinPurchaseAmount() {
    const response = await this.apiClient.get<string>(`${SERVICE_BASE_URL}/btcstore/min_purchase_amount_of_sides`);
    return response;
  }

  async getMaxPurchaseAmount() {
    const response = await this.apiClient.get<string>(`${SERVICE_BASE_URL}/btcstore/max_purchase_amount_of_sides`);
    return response;
  }

  async getTradesByAddress(address: string) {
    const queryParams = getQueryParams({
      address: address
    });
    const response = await this.apiClient.get<string>(
      `${SERVICE_BASE_URL}/btcstore/get_trades_by_address?${queryParams}`
    );
    return response;
  }

  async getTradeByTxId(txId: string) {
    const queryParams = getQueryParams({
      txid: txId
    });
    const response = await this.apiClient.get<string>(
      `${SERVICE_BASE_URL}/btcstore/get_trade_byBtctxhash?${queryParams}`
    );
    return response;
  }

  async getBtcVaultAddress() {
    const response = await this.apiClient.get<string>(`${SERVICE_BASE_URL}/btcstore/btc_vault_address`);
    return response;
  }

  async submit_btctxhash(btctxhash: string) {
    const queryParams = getQueryParams({
      btcTxhash: btctxhash
    });
    const response = await this.apiClient.post(`${SERVICE_BASE_URL}/btcstore/submit_btctxhash?${queryParams}`, '');
    return response;
  }
}
