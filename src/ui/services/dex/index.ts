import { AxiosRequestConfig } from 'axios';

import { IAsset, IAssetItem } from '@/shared/types';
import ApiClient from '@/ui/services/network/ApiClient';

import { getQueryParams } from '../getQueryParams';
import {
  IGetBridgeActivitiesRequest,
  IGetBridgeActivitiesResponse,
  IGetBridgeActivity,
  IGetChartDataRequest,
  IGetChartDataResponse,
  IGetMarketListItem,
  IGetOverviewDataResponse,
  IGetPoolDetailRequest,
  IGetPoolDetailResponse,
  IGetPoolIncentivesActiveResponse,
  IPoolOne,
  IPoolTranscationAddsResponse,
  IPoolTranscationRequest,
  IPoolTranscationSwapsResponse,
  IPoolTranscationWithdrawsResponse,
  SwapRouteResult
} from './type';

export default class DexService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getMyPoolList(address: string, config: AxiosRequestConfig): Promise<IPoolOne[]> {
    return this.apiClient.get<IPoolOne[]>(`/pool/my?address=${address}`, config);
  }
  async getAllPoolList(config: AxiosRequestConfig): Promise<IPoolOne[]> {
    return this.apiClient.get<IPoolOne[]>('/pool/list', config);
  }

  async getValidRoutes(
    offerDenom: string,
    offerAmount: string,
    askDenom: string,
    config: AxiosRequestConfig
  ): Promise<SwapRouteResult[]> {
    return this.apiClient.get<SwapRouteResult[]>(
      `/pool/getValidRoutes?offerDenom=${offerDenom}&offerAmount=${offerAmount}&askDenom=${askDenom}`,
      config
    );
  }

  async refreshPoolData(config: AxiosRequestConfig): Promise<any> {
    return this.apiClient.post('/pool/refreshPoolData', {}, config);
  }

  async getPoolDetail(data: IGetPoolDetailRequest, config: AxiosRequestConfig): Promise<IGetPoolDetailResponse> {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<IGetPoolDetailResponse>(`/pool/detail?${queryParams}`, config);
  }
  async getPoolWithdraws(
    data: IPoolTranscationRequest,
    config: AxiosRequestConfig
  ): Promise<IPoolTranscationWithdrawsResponse> {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<IPoolTranscationWithdrawsResponse>(`/pool/detail/withdraws?${queryParams}`, config);
  }
  async getPoolAdds(data: IPoolTranscationRequest, config: AxiosRequestConfig): Promise<IPoolTranscationAddsResponse> {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<IPoolTranscationAddsResponse>(`/pool/detail/adds?${queryParams}`, config);
  }
  async getPoolSwaps(
    data: IPoolTranscationRequest,
    config: AxiosRequestConfig
  ): Promise<IPoolTranscationSwapsResponse> {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<IPoolTranscationSwapsResponse>(`/pool/detail/swaps?${queryParams}`, config);
  }
  async getPoolIncentivesActive(
    data: IPoolTranscationRequest,
    config: AxiosRequestConfig
  ): Promise<IGetPoolIncentivesActiveResponse> {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<IGetPoolIncentivesActiveResponse>(
      `/pool/detail/incentives/active?${queryParams}`,
      config
    );
  }
  async getPoolIncentivesCompleted(
    data: IPoolTranscationRequest,
    config: AxiosRequestConfig
  ): Promise<IGetPoolIncentivesActiveResponse> {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<IGetPoolIncentivesActiveResponse>(
      `/pool/detail/incentives/completed?${queryParams}`,
      config
    );
  }
  async getChartData(data: IGetChartDataRequest, config: AxiosRequestConfig): Promise<IGetChartDataResponse> {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<IGetChartDataResponse>(`/pool/detail/statistics?${queryParams}`, config);
  }
  async getOverviewData(config: AxiosRequestConfig): Promise<IGetOverviewDataResponse> {
    return this.apiClient.get<IGetOverviewDataResponse>('/pool/getStatisticsData?', config);
  }

  async getAssetPrice(denom: string, config: AxiosRequestConfig): Promise<string> {
    return this.apiClient.get<string>(`/asset/getAssetPrice?denom=${denom}`, config);
  }

  async getAssetsPrice(
    {
      chain,
      denomList
    }: {
      chain: 'bitcoin' | 'side';
      denomList: string[];
    },
    config: AxiosRequestConfig
  ): Promise<{ [key: string]: string }> {
    return this.apiClient.get<{ [key: string]: string }>(
      `/asset/getAssetsPrice?chain=${chain}&denoms=${denomList.join(',')}`,
      config
    );
  }

  async getMarketList(config: AxiosRequestConfig): Promise<IGetMarketListItem[]> {
    return this.apiClient.get<IGetMarketListItem[]>('/market/list', config);
  }

  async getSideAssets(config: AxiosRequestConfig): Promise<IAsset[]> {
    return this.apiClient.get<IAssetItem[]>('/asset/assets', config);
  }

  async getBridgeActivities(
    data: IGetBridgeActivitiesRequest,
    config: AxiosRequestConfig
  ): Promise<IGetBridgeActivitiesResponse> {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<IGetBridgeActivitiesResponse>(`/explorer/bridge/activities?${queryParams}`, config);
  }

  async getBridgeDetail(hash: string, config: AxiosRequestConfig): Promise<IGetBridgeActivity> {
    return this.apiClient.get<IGetBridgeActivity>(`/explorer/bridge/activity/detailByHash?hash=${hash}`, config);
  }
}
