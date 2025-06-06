import { AxiosRequestConfig } from 'axios';

import ApiClient from '@/ui/services/network/ApiClient';

import { GetConstantsResponse } from './types';

export default class EnvironmentService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  // async getWalletParams(config: AxiosRequestConfig): Promise<GetConstantsResponse> {
  //   //
  //   return this.apiClient.get<GetConstantsResponse>('/wallet/config', config);
  // }

  async getWalletParams(config: AxiosRequestConfig): Promise<GetConstantsResponse> {
    const response = await fetch(`${config.baseURL}/wallet/config`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}
