import { AxiosRequestConfig } from 'axios';

import ApiClient from '@/ui/services/network/ApiClient';

import { NodeInfoResponse } from './types';

export default class NodeService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getGasPrice(config: AxiosRequestConfig): Promise<NodeInfoResponse> {
    return await this.apiClient.get<NodeInfoResponse>('/cosmos/base/node/v1beta1/config', config);
  }
}
