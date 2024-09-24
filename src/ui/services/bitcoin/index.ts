import { getQueryParams } from '../getQueryParams';
import ApiClient from '../network/ApiClient';

import { SERVICE_BASE_URL } from '@/ui/constants';
import { GetBridgeHistoryRequest, GetBridgeHistoryResponse } from './types';

export default class BitcoinService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async postTxHash(txid: string) {
    const queryParams = getQueryParams({ txid });
    const result = await this.apiClient.post(`/bitcoin/add-deposit-bitcoin-transaction?${queryParams}`, '', {
      baseURL: SERVICE_BASE_URL,
    });
    return result;
  }

  async getBridgeHistory(data: GetBridgeHistoryRequest): Promise<GetBridgeHistoryResponse> {
    const queryParams = getQueryParams(data as any);
    const result = await this.apiClient.get<GetBridgeHistoryResponse>(`/bitcoin/bridge/history?${queryParams}`, {
      baseURL: SERVICE_BASE_URL,
    });

    return result;
  }
}
