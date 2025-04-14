import {
  SIDE_BTC_EXPLORER,
  SIDE_BTC_INDEXER,
  SIDE_RUNE_INDEXER,
  UNISAT_IO_API,
  UNISAT_SERVICE_ENDPOINT
} from '@/shared/constant';
import ApiClient from '@/ui/services/network/ApiClient';

import { getQueryParams } from '../getQueryParams';
import {
  AddressInfo,
  GetBridgeWithdrawFeeReponse,
  RuneOutput,
  Runes,
  UTXO,
  UTXOAddress,
  UTXOBridge,
  WithdrawRequest
} from './types';

interface Params {
  confirmations: number;
  max_acceptable_block_depth: string;
  btc_voucher_denom: string;
  deposit_enabled: boolean;
  withdraw_enabled: boolean;
  non_btc_relayers: string[];
  vaults: Vault[];
  protocol_limits: Protocollimits;
  protocol_fees: Protocolfees;
  tss_params: Tssparams;
}

interface Tssparams {
  dkg_timeout_period: string;
  participant_update_transition_period: string;
}

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

interface Vault {
  address: string;
  pub_key: string;
  asset_type: 'ASSET_TYPE_RUNES' | 'ASSET_TYPE_BTC';
  version: string;
}

// import { IChain } from '@/ui/components/WalletConnect/Wallet';
export interface SideBridgeParams {
  params: Params;
}

export default class BridgeService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getBridgeParams(): Promise<SideBridgeParams> {
    return this.apiClient.get(`${UNISAT_IO_API}/params`, {
      baseURL: SIDE_BTC_INDEXER
    });
  }

  async getAddressInfo(address: string): Promise<AddressInfo> {
    return this.apiClient.get<AddressInfo>(`${UNISAT_SERVICE_ENDPOINT}/address/${address}`, {
      baseURL: SIDE_BTC_INDEXER
    });
  }

  async getRawUtxos(address: string): Promise<UTXOAddress[]> {
    return this.apiClient.get<UTXOAddress[]>(`${UNISAT_SERVICE_ENDPOINT}/address/${address}/utxo`, {
      baseURL: SIDE_BTC_INDEXER
    });
  }

  // txid: string;
  // version: number;
  // locktime: number;
  // vin: Vin[];
  // vout: Prevout[];
  // size: number;
  // weight: number;
  // fee: number;
  // status: Status;
  async getUtxo(txid: string): Promise<UTXO> {
    return this.apiClient
      .get<UTXO>(`/tx/${txid}`, {
        baseURL: SIDE_BTC_INDEXER
      })
      .catch(() => {
        const empty: UTXO = {
          txid: '',
          version: -1,
          locktime: 0,
          vin: [],
          vout: [],
          size: 0,
          weight: 0,
          fee: 0,
          status: {
            confirmed: false,
            block_hash: '',
            block_height: 0,
            block_time: 0
          }
        };

        return empty;
      });
  }

  async getUtxoHex(txid: string): Promise<string> {
    return this.apiClient.get<string>(`/tx/${txid}/hex`, {
      baseURL: SIDE_BTC_INDEXER
    });
  }

  async getAddressTxs(address: string): Promise<UTXO[]> {
    return this.apiClient.get<UTXO[]>(`/address/${address}/txs`, {
      baseURL: SIDE_BTC_INDEXER
    });
  }

  async getLateBlockHeight(): Promise<number> {
    return this.apiClient.get<number>('/blocks/tip/height', {
      baseURL: SIDE_BTC_INDEXER
    });
  }

  async getSideRequestStatusByAddress(address: string, client): Promise<WithdrawRequest> {
    return this.apiClient.get<WithdrawRequest>(`/side/btcbridge/signing/request/address/${address}`, {
      baseURL: client.restUrl
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

  async getTxHex(txid: string): Promise<string> {
    return this.apiClient
      .get<string>(`/api/tx/${txid}/hex`, {
        baseURL: SIDE_BTC_EXPLORER
      })
      .catch(() => {
        return '';
      });
  }
  async getAllRunes(): Promise<Runes> {
    return this.apiClient.get<Runes>('/runes', {
      baseURL: SIDE_RUNE_INDEXER,
      headers: {
        Accept: 'application/json'
      }
    });
  }

  async getRuneDetail(rune: string): Promise<Runes> {
    return this.apiClient.get<Runes>(`/rune/${rune}`, {
      baseURL: SIDE_RUNE_INDEXER,
      headers: {
        Accept: 'application/json'
      }
    });
  }

  async fetchRuneOutputs(keys: string[]): Promise<RuneOutput[]> {
    return this.apiClient.post(`${SIDE_RUNE_INDEXER}/outputs`, keys, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
  }

  async getMemPoolTxs(address: string): Promise<UTXOBridge[]> {
    return this.apiClient.get<UTXOBridge[]>(`/api/address/${address}/txs`, {
      baseURL: SIDE_BTC_EXPLORER
    });
  }
  async getMemPoolAddress(address: string): Promise<AddressInfo> {
    return this.apiClient.get<AddressInfo>(`/api/address/${address}`, {
      baseURL: SIDE_BTC_EXPLORER
    });
  }

  async fetchRuneOutput(key: string): Promise<RuneOutput> {
    return this.apiClient.get(`/output/${key}`, {
      baseURL: SIDE_RUNE_INDEXER,
      headers: {
        Accept: 'application/json'
      }
    });
  }
}
