import ApiClient from '@/ui/services/network/ApiClient';
import { AxiosRequestConfig } from 'axios';

import { GetTxRequest, GetTxsResponse } from './types';

import { getQueryParams } from '../getQueryParams';

export default class TxService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getTx(
    data: GetTxRequest,
    config: AxiosRequestConfig
  ): Promise<GetTxsResponse> {
    const queryParams = getQueryParams(data as any);
    return await this.apiClient.get<GetTxsResponse>(
      `/cosmos/tx/v1beta1/txs?${queryParams}`,
      config
    );
  }

  async getTxByHash(
    txHash: string,
    config: AxiosRequestConfig
  ): Promise<GetTxsResponse> {
    return await this.apiClient.get<GetTxsResponse>(
      `/cosmos/tx/v1beta1/txs/${txHash}`,
      config
    );
  }
}
