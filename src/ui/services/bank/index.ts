import ApiClient from '../network/ApiClient';
import { AxiosRequestConfig } from 'axios';

import {
  GetAllBalancesData,
  GetAllBalancesRequest,
  GetDenomOwnersRequest,
  GetDenomOwnersResponse,
} from './types';

export default class BankService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getAllBalances(
    data: GetAllBalancesRequest,
    config: AxiosRequestConfig
  ): Promise<GetAllBalancesData> {
    const { address, ...params } = data;
    return (
      (await this.apiClient.get<GetAllBalancesData>(
        `/cosmos/bank/v1beta1/balances/${address}`,
        {
          ...config,
          params,
        }
      )) || {}
    );
  }

  async getPriceList(ids: string): Promise<GetAllBalancesData> {
    return await this.apiClient.get<GetAllBalancesData>(
      '/api/v3/simple/price',
      {
        baseURL: 'https://api.coingecko.com',
        params: {
          ids,
          vs_currencies: 'usd',
        },
      }
    );
  }

  async getDenomOwners(
    data: GetDenomOwnersRequest,
    config: AxiosRequestConfig
  ): Promise<GetDenomOwnersResponse> {
    const { denom, ...params } = data;
    return (
      (await this.apiClient.get<GetDenomOwnersResponse>(
        `/cosmos/bank/v1beta1/denom_owners/${denom}`,
        {
          ...config,
          params,
        }
      )) || {}
    );
  }
}
