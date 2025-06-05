import '@/shared/constant';
import ApiClient from '@/ui/services/network/ApiClient';

import { getQueryParams } from '../getQueryParams';
import {
  AddressInfo,
  GetBridgeWithdrawFeeReponse,
  IGetBtcBridgeDepositIbcScriptRequest,
  IGetBtcBridgeDepositIbcScriptResponse,
  Params,
  UTXOAddress,
  UTXOBridge,
  WithdrawRequest
} from './types';

export interface Protocolfees {
  deposit_fee: string;
  withdraw_fee: string;
  collector: string;
}

export interface Protocollimits {
  btc_min_deposit: string;
  btc_min_withdraw: string;
  btc_max_withdraw: string;
}
export interface SideBridgeParams {
  params: Params;
}

export default class BridgeService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getBridgeParams(UNISAT_IO_API: string): Promise<SideBridgeParams> {
    return this.apiClient.get('/params', {
      baseURL: UNISAT_IO_API
    });
  }

  async getAddressInfo(address: string, UNISAT_SERVICE_ENDPOINT: string): Promise<AddressInfo> {
    return this.apiClient.get<AddressInfo>(`/address/${address}`, {
      baseURL: UNISAT_SERVICE_ENDPOINT
    });
  }

  async getRawUtxos(address: string, UNISAT_SERVICE_ENDPOINT: string): Promise<UTXOAddress[]> {
    return this.apiClient.get<UTXOAddress[]>(`/address/${address}/utxo`, {
      baseURL: UNISAT_SERVICE_ENDPOINT
    });
  }

  d;

  async getSideRequestStatusByAddress(address: string, restUrl: string): Promise<WithdrawRequest> {
    return this.apiClient.get<WithdrawRequest>(`/side/btcbridge/signing/request/address/${address}`, {
      baseURL: restUrl
    });
  }

  async getBridgeWithdrawFee(address: string, amount: string, restUrl: string): Promise<string> {
    const queryParams = getQueryParams({ address, amount: amount, fee_rate: 0 });
    const result = await this.apiClient.get<GetBridgeWithdrawFeeReponse>(
      `/side/btcbridge/withdrawal/fee/estimation?${queryParams}`,
      {
        baseURL: restUrl
      }
    );

    if (typeof result.code === 'number' && result.code !== 0) {
      return '-';
    }
    return parseFloat(result.fee).toFixed(0);
  }

  async getTxHex(txid: string, SIDE_BTC_EXPLORER: string): Promise<string> {
    return this.apiClient
      .get<string>(`/api/tx/${txid}/hex`, {
        baseURL: SIDE_BTC_EXPLORER
      })
      .catch(() => {
        return '';
      });
  }

  async getMemPoolTxs(address: string, SIDE_BTC_EXPLORER: string): Promise<UTXOBridge[]> {
    return this.apiClient.get<UTXOBridge[]>(`/api/address/${address}/txs`, {
      baseURL: SIDE_BTC_EXPLORER
    });
  }
  async getMemPoolAddress(address: string, SIDE_BTC_EXPLORER: string): Promise<AddressInfo> {
    return this.apiClient.get<AddressInfo>(`/api/address/${address}`, {
      baseURL: SIDE_BTC_EXPLORER
    });
  }

  async getBtcBridgeDepositIbcScript(
    data: IGetBtcBridgeDepositIbcScriptRequest,
    restUrl: string
  ): Promise<IGetBtcBridgeDepositIbcScriptResponse> {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<IGetBtcBridgeDepositIbcScriptResponse>(
      `/side/btcbridge/deposit/ibc_script?${queryParams}`,
      {
        baseURL: restUrl
      }
    );
  }
}
