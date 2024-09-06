import { SIDE_BTC_INDEXER, SIDE_RUNE_INDEXER } from '@/ui/constants';
import ApiClient from '@/ui/services/network/ApiClient';

import { AddressInfo, RuneOutput, Runes, UTXO, UTXOAddress, WithdrawRequest } from './types';

// import { IChain } from '@/ui/components/WalletConnect/Wallet';

export default class BridgeService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getAddressInfo(address: string): Promise<AddressInfo> {
    return this.apiClient.get<AddressInfo>(`/address/${address}`, {
      baseURL: SIDE_BTC_INDEXER
    });
  }

  async getRawUtxos(address: string): Promise<UTXOAddress[]> {
    return this.apiClient.get<UTXOAddress[]>(`/address/${address}/utxo`, {
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

  async fetchRuneOutput(key: string): Promise<RuneOutput> {
    return this.apiClient.get(`/output/${key}`, {
      baseURL: SIDE_RUNE_INDEXER,
      headers: {
        Accept: 'application/json'
      }
    });
  }
}
