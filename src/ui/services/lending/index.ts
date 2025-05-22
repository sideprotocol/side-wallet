import { AxiosRequestConfig } from 'axios';

import { getQueryParams } from '../getQueryParams';
import ApiClient from '../network/ApiClient';
import { BaseRequestOffChainApi, BaseRequestPage } from '../types';
import {
  GetCetInfoRequest,
  GetCetInfoResponse,
  GetCollateralAddressRequest,
  GetCollateralAddressResponse,
  GetDlcAttestationsResponse,
  GetDlcDcmsRequest,
  GetDlcDcmsResponse,
  GetDlcEventByIdResponse,
  GetDlcEventsRequest,
  GetDlcEventsResponse,
  GetDlcNoncesByOracleIdIndexRequest,
  GetDlcNoncesByOracleIdIndexResponse,
  GetDlcNoncesByOracleIdRequest,
  GetDlcNoncesByOracleIdResponse,
  GetDlcNoncesCountResponse,
  GetDlcOraclesRequest,
  GetDlcOraclesResponse,
  GetDlcParamsResponse,
  GetDlcPriceResponse,
  GetLeadingParamsResponse,
  GetLeadingPoolByIdResponse,
  GetLeadingPoolsResponse,
  GetLendingLiquidityProvidersRequest,
  GetLendingLiquidityProvidersResponse,
  GetLendingPoolsResponse,
  GetLendingUserActivityRequest,
  GetLendingUserActivityResponse,
  GetLiquidationByIdResponse,
  GetLiquidationCetRequest,
  GetLiquidationCetResponse,
  GetLiquidationDlcMetaResponse,
  GetLiquidationEventRequest,
  GetLiquidationParamsResponse,
  GetLiquidationRecordsRequest,
  GetLiquidationRecordsResponse,
  GetLiquidationsRequest,
  GetLiquidationsResponse,
  GetLoanBaseDataRequest,
  GetLoanBaseDataResponse,
  GetLoanByIdCexResponse,
  GetLoanByIdResponse,
  GetLoanInterestResponse,
  GetLoanRepaymentResponse,
  GetLoansRequest,
  GetLoansResponse,
  GetOverviewDataResponse,
  LiquidationEvent,
  PostLoanExpectedCollateralAmountData
} from './types';

export default class LendingService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getDlcDcms(data: GetDlcDcmsRequest, config: AxiosRequestConfig): Promise<GetDlcDcmsResponse> {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetDlcDcmsResponse>(`/side/dlc/dcms?${queryParams}`, config);
  }

  async getDlcAttestations(data: BaseRequestPage, config: AxiosRequestConfig): Promise<GetDlcAttestationsResponse> {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetDlcAttestationsResponse>(`/side/dlc/attestations?${queryParams}`, config);
  }

  async getDlcAttestationById(id: string, config: AxiosRequestConfig): Promise<GetDlcAttestationsResponse> {
    return this.apiClient.get<GetDlcAttestationsResponse>(`/side/dlc/attestations/${id}`, config);
  }

  async getDlcEvents(data: GetDlcEventsRequest, config: AxiosRequestConfig): Promise<GetDlcEventsResponse> {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetDlcEventsResponse>(`/side/dlc/events?${queryParams}`, config);
  }

  async getDlcNoncesCount(config: AxiosRequestConfig): Promise<GetDlcNoncesCountResponse> {
    return this.apiClient.get<GetDlcNoncesCountResponse>('/side/dlc/nonces/count', config);
  }

  async getDlcNoncesByOracleId(
    oracle_id: string,
    data: GetDlcNoncesByOracleIdRequest,
    config: AxiosRequestConfig
  ): Promise<GetDlcNoncesByOracleIdResponse> {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetDlcNoncesByOracleIdResponse>(`/side/dlc/nonces/${oracle_id}?${queryParams}`, config);
  }

  async getDlcNoncesByOracleIdIndex(
    oracle_id: string,
    index: string,
    data: GetDlcNoncesByOracleIdIndexRequest,
    config: AxiosRequestConfig
  ): Promise<GetDlcNoncesByOracleIdIndexResponse> {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetDlcNoncesByOracleIdIndexResponse>(
      `/side/dlc/nonces/${oracle_id}/${index}?${queryParams}`,
      config
    );
  }

  async getDlcOracles(data: GetDlcOraclesRequest, config: AxiosRequestConfig): Promise<GetDlcOraclesResponse> {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetDlcOraclesResponse>(`/side/dlc/oracles?${queryParams}`, config);
  }

  async getDlcEventById(id: string, config: AxiosRequestConfig): Promise<GetDlcEventByIdResponse> {
    return this.apiClient.get<GetDlcEventByIdResponse>(`/side/dlc/events/${id}`, config);
  }

  async getDlcParams(config: AxiosRequestConfig): Promise<GetDlcParamsResponse> {
    return this.apiClient.get<GetDlcParamsResponse>('/side/dlc/params', config);
  }

  async getDlcPrice(symbol: string, config: AxiosRequestConfig): Promise<GetDlcPriceResponse> {
    return this.apiClient.get<GetDlcPriceResponse>(`/side/oracle/prices/${symbol}`, config);
  }

  async getCollateralAddress(data: GetCollateralAddressRequest, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetCollateralAddressResponse>(`/side/lending/collateral/address?${queryParams}`, config);
  }

  async getLiquidationCet(data: GetLiquidationCetRequest, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetLiquidationCetResponse>(`/side/lending/liquidation/cet?${queryParams}`, config);
  }

  async getLiquidationEvent(data: GetLiquidationEventRequest, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<LiquidationEvent>(`/side/lending/liquidation/event?${queryParams}`, config);
  }

  async getCetInfo(data: GetCetInfoRequest, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetCetInfoResponse>(`/side/lending/loan/cet/infos?${queryParams}`, config);
  }

  async getLiquidationDlcMeta(data: { loan_id: string }, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetLiquidationDlcMetaResponse>(`/side/lending/loan/dlc/meta?${queryParams}`, config);
  }

  async getLoanRepayment(data: { loan_id: string }, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetLoanRepaymentResponse>(`/side/lending/loan/repayment?${queryParams}`, config);
  }

  async getLoans(data: GetLoansRequest, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetLoansResponse>(`/side/lending/loans?${queryParams}`, config);
  }

  async getLoansByAddress(address: string, data: GetLoansRequest, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetLoansResponse>(`/side/lending/loans/address/${address}?${queryParams}`, config);
  }

  async getLoanById(id: string, config: AxiosRequestConfig) {
    return this.apiClient.get<GetLoanByIdResponse>(`/side/lending/loans/${id}`, config);
  }

  async getLoanByIdCex(data: { vaultAddress: string }, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetLoanByIdCexResponse>(`/lending/loan/detail?${queryParams}`, config);
  }

  async getLoanBaseData(data: GetLoanBaseDataRequest, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetLoanBaseDataResponse>(`/lending/loans?${queryParams}`, config);
  }

  async getLoanCurrentInterest(id: string, config: AxiosRequestConfig) {
    const queryParams = getQueryParams({
      loan_id: id
    });
    return this.apiClient.get<GetLoanInterestResponse>(`/side/lending/loan/current_interest?${queryParams}`, config);
  }

  async saveLoanExpectedCollateralAmount(data: PostLoanExpectedCollateralAmountData, config: AxiosRequestConfig) {
    return this.apiClient.post('/lending/loan/save', data, config);
  }

  async getLeadingParams(config: AxiosRequestConfig) {
    return this.apiClient.get<GetLeadingParamsResponse>('/side/lending/params', config);
  }

  async getLeadingPoolById(id: string, config: AxiosRequestConfig) {
    return this.apiClient.get<GetLeadingPoolByIdResponse>(`/side/lending/pools/${id}`, config);
  }

  async getLendingPools(data: BaseRequestPage, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetLeadingPoolsResponse>(`/side/lending/pools?${queryParams}`, config);
  }

  async getLendingPoolsBase(data: BaseRequestOffChainApi, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetLendingPoolsResponse>(`/lending/pools?${queryParams}`, config);
  }

  async getLendingPoolsExchangeRate(data: { pool_id: string }, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<{
      exchange_rate: string;
    }>(`/side/lending/pool/exchange_rate?${queryParams}`, config);
  }

  async getOverviewData(config: AxiosRequestConfig) {
    return this.apiClient.get<GetOverviewDataResponse>('/lending/overall-statistic', config);
  }

  async getLendingLiquidityProviders(data: GetLendingLiquidityProvidersRequest, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetLendingLiquidityProvidersResponse>(`lending/pool/providers?${queryParams}`, config);
  }

  async getLendingUserActivity(data: GetLendingUserActivityRequest, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetLendingUserActivityResponse>(`lending/pool/activities?${queryParams}`, config);
  }

  async getLiquidations(data: GetLiquidationsRequest, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetLiquidationsResponse>(`/side/liquidation/liquidations?${queryParams}`, config);
  }

  async getLiquidationById(id: string, config: AxiosRequestConfig) {
    return this.apiClient.get<GetLiquidationByIdResponse>(`/side/liquidation/liquidations/${id}`, config);
  }

  async getLiquidationParams(config: AxiosRequestConfig) {
    return this.apiClient.get<GetLiquidationParamsResponse>('/side/liquidation/params', config);
  }

  async getLiquidationRecords(data: GetLiquidationRecordsRequest, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetLiquidationRecordsResponse>(`/lending/liquidation/records?${queryParams}`, config);
  }
}
