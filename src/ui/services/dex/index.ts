import { SERVICE_BASE_URL } from '@/ui/constants';
import ApiClient from '@/ui/services/network/ApiClient';

import { getQueryParams } from '../getQueryParams';
import {
  IGetChartDataRequest,
  IGetChartDataResponse,
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

  async getMyPoolList(address: string): Promise<IPoolOne[]> {
    return this.apiClient.get<IPoolOne[]>(`/pool/my?address=${address}`, {
      baseURL: SERVICE_BASE_URL
    });
  }
  async getAllPoolList(): Promise<IPoolOne[]> {
    return this.apiClient.get<IPoolOne[]>(`/pool/list`, {
      baseURL: SERVICE_BASE_URL
    });
  }

  async getValidRoutes(offerDenom: string, offerAmount: string, askDenom: string): Promise<SwapRouteResult[]> {
    return this.apiClient.get<SwapRouteResult[]>(
      `/pool/getValidRoutes?offerDenom=${offerDenom}&offerAmount=${offerAmount}&askDenom=${askDenom}`,
      {
        baseURL: SERVICE_BASE_URL
      }
    );
  }

  async refreshPoolData(): Promise<any> {
    return this.apiClient.post(`${SERVICE_BASE_URL}/pool/refreshPoolData`, {});
  }

  async getPoolDetail(data: IGetPoolDetailRequest): Promise<IGetPoolDetailResponse> {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<IGetPoolDetailResponse>(`/pool/detail?${queryParams}`, {
      baseURL: SERVICE_BASE_URL
    });
  }
  async getPoolWithdraws(data: IPoolTranscationRequest): Promise<IPoolTranscationWithdrawsResponse> {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<IPoolTranscationWithdrawsResponse>(`/pool/detail/withdraws?${queryParams}`, {
      baseURL: SERVICE_BASE_URL
    });
  }
  async getPoolAdds(data: IPoolTranscationRequest): Promise<IPoolTranscationAddsResponse> {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<IPoolTranscationAddsResponse>(`/pool/detail/adds?${queryParams}`, {
      baseURL: SERVICE_BASE_URL
    });
  }
  async getPoolSwaps(data: IPoolTranscationRequest): Promise<IPoolTranscationSwapsResponse> {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<IPoolTranscationSwapsResponse>(`/pool/detail/swaps?${queryParams}`, {
      baseURL: SERVICE_BASE_URL
    });
  }
  async getPoolIncentivesActive(data: IPoolTranscationRequest): Promise<IGetPoolIncentivesActiveResponse> {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<IGetPoolIncentivesActiveResponse>(`/pool/detail/incentives/active?${queryParams}`, {
      baseURL: SERVICE_BASE_URL
    });
  }
  async getPoolIncentivesCompleted(data: IPoolTranscationRequest): Promise<IGetPoolIncentivesActiveResponse> {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<IGetPoolIncentivesActiveResponse>(`/pool/detail/incentives/completed?${queryParams}`, {
      baseURL: SERVICE_BASE_URL
    });
  }
  async getChartData(data: IGetChartDataRequest): Promise<IGetChartDataResponse> {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<IGetChartDataResponse>(`/pool/detail/statistics?${queryParams}`, {
      baseURL: SERVICE_BASE_URL
    });
  }
  async getOverviewData(): Promise<IGetOverviewDataResponse> {
    return this.apiClient.get<IGetOverviewDataResponse>(`/pool/getStatisticsData?`, {
      baseURL: SERVICE_BASE_URL
    });
  }

  async getAssetPrice(denom: string): Promise<string> {
    return this.apiClient.get<string>(`/asset/getAssetPrice?denom=${denom}`, {
      baseURL: SERVICE_BASE_URL
    });
  }
}
