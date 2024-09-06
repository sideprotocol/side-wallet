import { AxiosRequestConfig } from 'axios';

import ApiClient from '@/ui/services/network/ApiClient';

import { GetBlocksLatestResponse, GetValidatorsetsResponse } from './types';

export default class BaseService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getBlocksLatest(config: AxiosRequestConfig): Promise<GetBlocksLatestResponse> {
    return await this.apiClient.get<GetBlocksLatestResponse>('/cosmos/base/tendermint/v1beta1/blocks/latest', config);
  }

  async getValidatorsets(height: string, config: AxiosRequestConfig): Promise<GetValidatorsetsResponse> {
    return await this.apiClient.get<GetValidatorsetsResponse>(
      `/cosmos/base/tendermint/v1beta1/validatorsets/${height}`,
      config
    );
  }
}
