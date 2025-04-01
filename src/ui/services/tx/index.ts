import { AxiosRequestConfig } from 'axios';

import ApiClient from '@/ui/services/network/ApiClient';

import { getQueryParams } from '../getQueryParams';
import { GetTxByHashResponse, GetTxRequest, GetTxsResponse } from './types';

export default class TxService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getTx(data: GetTxRequest, config: AxiosRequestConfig): Promise<GetTxsResponse> {
    const queryParams = getQueryParams(data as any);
    return await this.apiClient.get<GetTxsResponse>(`/cosmos/tx/v1beta1/txs?${queryParams}`, config);
  }

  async getTxByHash(txHash: string, config: AxiosRequestConfig): Promise<GetTxByHashResponse> {
    return await this.apiClient.get<GetTxByHashResponse>(`/cosmos/tx/v1beta1/txs/${txHash}`, config);
  }
}
