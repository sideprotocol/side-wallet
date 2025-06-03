import { AxiosRequestConfig } from 'axios';

import { SERVICE_BASE_URL_TESTNET } from '@/shared/constant';
import ApiClient from '@/ui/services/network/ApiClient';

import mainnetData from './mainnet.json';
import testnetData from './testnet.json';
import { GetConstantsResponse } from './types';

export default class EnvironmentService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getWalletConfig(config: AxiosRequestConfig): Promise<GetConstantsResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (config.baseURL === SERVICE_BASE_URL_TESTNET) {
          resolve(testnetData);
        } else {
          resolve(mainnetData);
        }
      }, 1000);
    });
  }
}
