import ApiClient from '../network/ApiClient';

import {
  AddressSummary,
  FeeSummary,
  getAvailableBtcBalanceData,
  getRunesInfoListResponse,
  getRunesListData,
  RuneBalance,
  TickPriceItem,
  UTXO,
} from './types';
import { getQueryParams } from '../getQueryParams';
import { UNISAT_IO_API, UNISAT_SERVICE_ENDPOINT } from '@/ui/constants';
import services from '@/ui/services';

export default class UnisatService {
  private apiClient: ApiClient;

  private baseURl: string;

  private unisatIoApi: string;

  private currentRequestRune: { [key: string]: boolean };

  private runesPriceCache: { [key: string]: { cacheTime: number; data: TickPriceItem } } = {};

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
    this.baseURl = UNISAT_SERVICE_ENDPOINT;
    this.currentRequestRune = {};

    this.unisatIoApi = UNISAT_IO_API;
  }

  async getBTCUtxos(data: { address: string }) {
    const queryParams = getQueryParams(data as any);
    const utxos: {
      code: number;
      data: UTXO[];
      msg: string;
    } = await this.apiClient.get(`/v5/address/btc-utxo?${queryParams}`, {
      baseURL: this.baseURl,
    });

    const btcUtxos = utxos.data.map(v => {
      return {
        txid: v.txid,
        vout: v.vout,
        satoshis: v.satoshis,
        scriptPk: v.scriptPk,
        addressType: v.addressType,
        // pubkey: account.pubkey,
        inscriptions: v.inscriptions,
        atomicals: v.atomicals,
      };
    });

    return btcUtxos;
  }

  async getAddressSummary(address: string): Promise<AddressSummary> {
    const queryParams = getQueryParams({
      address,
    });

    const result: {
      code: number;
      data: AddressSummary;
      msg: string;
    } = await this.apiClient.get(`/v5/address/summary?${queryParams}`, {
      baseURL: this.baseURl,
    });

    return result.data;
  }

  async getAvailableBtcBalance(data: getAvailableBtcBalanceData) {
    const queryParams = getQueryParams(data as any);
    const _utxos: {
      code: number;
      data: UTXO[];
      msg: string;
    } = await this.apiClient.get(`/v5/address/btc-utxo?${queryParams}`, {
      baseURL: this.baseURl,
    });

    const UNCONFIRMED_HEIGHT = 4194303;

    const addressSummary = await this.getAddressSummary(data.address);

    const hasRunesOrArc20 = addressSummary.runesCount > 0 || addressSummary.arc20Count > 0;

    const utxos = hasRunesOrArc20 ? _utxos.data.filter(v => (v as any).height !== UNCONFIRMED_HEIGHT) : _utxos.data;

    const btcUtxos = utxos.map(v => {
      return {
        txid: v.txid,
        vout: v.vout,
        satoshis: v.satoshis,
        scriptPk: v.scriptPk,
        addressType: v.addressType,
        // pubkey: account.pubkey,
        inscriptions: v.inscriptions,
        atomicals: v.atomicals,
      };
    });

    const satoshis = btcUtxos.filter(v => v.inscriptions.length === 0).reduce((pre, cur) => pre + cur.satoshis, 0);

    return (satoshis / 100000000).toString();
  }

  async getRunesList(data: getRunesListData) {
    const { address, currentPage, pageSize } = data;

    const cursor = (currentPage - 1) * pageSize;
    const size = pageSize;
    const queryParams = getQueryParams({
      address,
      cursor,
      size,
    });

    const result: { data: { list: RuneBalance[]; total: number } } = await this.apiClient.get(
      `/v5/runes/list?${queryParams}`,
      {
        baseURL: this.baseURl,
      },
    );

    const { total, list } = result.data;

    return {
      currentPage,
      pageSize,
      total,
      list,
    };
  }

  async getRunesPrice(ticks: string[]) {
    if (ticks.length < 0) {
      return {};
    }
    const tickLine = ticks.join("");
    if (!tickLine) return {};
    console.log(`this.currentRequestRune: `, this.currentRequestRune);
    try {
      while (this.currentRequestRune[tickLine]) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      this.currentRequestRune[tickLine] = true;

      const result = {} as { [key: string]: TickPriceItem };

      for (let i = 0; i < ticks.length; i += 1) {
        const tick = ticks[i];
        const cache = this.runesPriceCache[tick];
        if (!cache) {
          break;
        }
        if (cache.cacheTime + 5 * 60 * 1000 > Date.now()) {
          result[tick] = cache.data;
        }
      }

      if (Object.keys(result).length === ticks.length) {
        return result;
      }

      const respRaw: {
        data: { [key: string]: TickPriceItem };
        code: number;
        msg: string;
      } = await this.apiClient.post(
        "/v5/market/runes/price",
        {
          ticks,
          nftType: "runes",
        },
        {
          baseURL: this.baseURl,
        },
      );

      const { data: resp } = respRaw;

      for (let i = 0; i < ticks.length; i += 1) {
        const tick = ticks[i];
        this.runesPriceCache[tick] = { cacheTime: Date.now(), data: resp[tick] };
      }
      return resp;
    } finally {
      this.currentRequestRune[tickLine] = false;
    }
  }

  async getRunesInfoList() {
    const result: getRunesInfoListResponse = await this.apiClient.get(`/query-v4/runes/info-list`, {
      baseURL: this.unisatIoApi,
    });
    return result.data.detail;
  }

  async pushTx(rawtx: string): Promise<string> {
    const result: {
      code: number;
      data: string;
      msg: string;
    } = await this.apiClient.post(
      '/v5/tx/broadcast',
      {
        rawtx,
      },
      {
        baseURL: this.baseURl,
      },
    );

    const txid = result.data;

    await services.bitcoin.postTxHash(txid);

    return txid;
  }

  async getFeeSummary(): Promise<FeeSummary> {
    const result: {
      code: number;
      data: FeeSummary;
      msg: string;
    } = await this.apiClient.get(`/v5/default/fee-summary`, {
      baseURL: this.baseURl,
    });
    return result.data;
  }

  async getRunesUtxos(address: string, runeid: string): Promise<UTXO[]> {
    const queryParams = getQueryParams({
      address,
      runeid,
    });
    const result: {
      code: number;
      data: UTXO[];
      msg: string;
    } = await this.apiClient.get(`/v5/runes/utxos?${queryParams}`, {
      baseURL: this.baseURl,
    });

    return result.data;
  }
}
