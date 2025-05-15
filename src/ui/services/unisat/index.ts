import services from '@/ui/services';

import { getQueryParams } from '../getQueryParams';
import ApiClient from '../network/ApiClient';
import {
  AddressSummary,
  FeeSummary,
  getAvailableBtcBalanceData,
  getRunesListData,
  RuneBalance,
  TickPriceItem,
  UTXO
} from './types';

export default class UnisatService {
  private apiClient: ApiClient;

  private currentRequestRune: { [key: string]: boolean };

  private runesPriceCache: { [key: string]: { cacheTime: number; data: TickPriceItem } } = {};

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
    this.currentRequestRune = {};
  }

  async getBTCUtxos(data: { address: string }, UNISAT_SERVICE_ENDPOINT: string) {
    const queryParams = getQueryParams(data as any);
    const utxos: {
      code: number;
      data: UTXO[];
      msg: string;
    } = await this.apiClient.get(`/v5/address/btc-utxo?${queryParams}`, {
      baseURL: UNISAT_SERVICE_ENDPOINT
    });

    const btcUtxos = utxos.data.map((v) => {
      return {
        txid: v.txid,
        vout: v.vout,
        satoshis: v.satoshis,
        scriptPk: v.scriptPk,
        addressType: v.addressType,
        // pubkey: account.pubkey,
        inscriptions: v.inscriptions,
        atomicals: v.atomicals
      };
    });

    return btcUtxos;
  }

  async getAddressSummary(address: string, UNISAT_SERVICE_ENDPOINT: string): Promise<AddressSummary> {
    const queryParams = getQueryParams({
      address
    });

    const result: {
      code: number;
      data: AddressSummary;
      msg: string;
    } = await this.apiClient.get(`/v5/address/summary?${queryParams}`, {
      baseURL: UNISAT_SERVICE_ENDPOINT
    });

    return result.data;
  }

  async getAvailableBtcBalance(data: getAvailableBtcBalanceData, UNISAT_SERVICE_ENDPOINT: string) {
    const queryParams = getQueryParams(data as any);
    const _utxos: {
      code: number;
      data: UTXO[];
      msg: string;
    } = await this.apiClient.get(`/v5/address/btc-utxo?${queryParams}`, {
      baseURL: UNISAT_SERVICE_ENDPOINT
    });

    const UNCONFIRMED_HEIGHT = 4194303;

    const addressSummary = await this.getAddressSummary(data.address, UNISAT_SERVICE_ENDPOINT);

    const hasRunesOrArc20 = addressSummary.runesCount > 0 || addressSummary.arc20Count > 0;

    const utxos = hasRunesOrArc20 ? _utxos.data.filter((v) => (v as any).height !== UNCONFIRMED_HEIGHT) : _utxos.data;

    const btcUtxos = utxos.map((v) => {
      return {
        txid: v.txid,
        vout: v.vout,
        satoshis: v.satoshis,
        scriptPk: v.scriptPk,
        addressType: v.addressType,
        // pubkey: account.pubkey,
        inscriptions: v.inscriptions,
        atomicals: v.atomicals
      };
    });

    const satoshis = btcUtxos.filter((v) => v.inscriptions.length === 0).reduce((pre, cur) => pre + cur.satoshis, 0);

    return (satoshis / 100000000).toString();
  }

  async getRunesList(data: getRunesListData, UNISAT_SERVICE_ENDPOINT: string) {
    const { address, currentPage, pageSize } = data;

    const cursor = (currentPage - 1) * pageSize;
    const size = pageSize;
    const queryParams = getQueryParams({
      address,
      cursor,
      size
    });

    const result: { data: { list: RuneBalance[]; total: number } } = await this.apiClient.get(
      `/v5/runes/list?${queryParams}`,
      {
        baseURL: UNISAT_SERVICE_ENDPOINT
      }
    );

    const { total, list } = result.data;

    return {
      currentPage,
      pageSize,
      total,
      list
    };
  }

  async getRunesPrice(ticks: string[], UNISAT_SERVICE_ENDPOINT: string) {
    if (ticks.length < 0) {
      return {};
    }
    const tickLine = ticks.join('');
    if (!tickLine) return {};
    try {
      while (this.currentRequestRune[tickLine]) {
        await new Promise((resolve) => setTimeout(resolve, 100));
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
        '/v5/market/runes/price',
        {
          ticks,
          nftType: 'runes'
        },
        {
          baseURL: UNISAT_SERVICE_ENDPOINT
        }
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

  async pushTx(rawtx: string, UNISAT_SERVICE_ENDPOINT: string, SERVICE_BASE_URL: string): Promise<string> {
    const result: {
      code: number;
      data: string;
      msg: string;
    } = await this.apiClient.post(
      '/v5/tx/broadcast',
      {
        rawtx
      },
      {
        baseURL: UNISAT_SERVICE_ENDPOINT
      }
    );

    const txid = result.data;

    await services.bitcoin.postTxHash(txid, { baseURL: SERVICE_BASE_URL });

    return txid;
  }

  async getFeeSummary(UNISAT_SERVICE_ENDPOINT: string): Promise<FeeSummary> {
    const result: {
      code: number;
      data: FeeSummary;
      msg: string;
    } = await this.apiClient.get('/v5/default/fee-summary', {
      baseURL: UNISAT_SERVICE_ENDPOINT
    });
    return result.data;
  }

  async getRunesUtxos(address: string, runeid: string, UNISAT_SERVICE_ENDPOINT: string): Promise<UTXO[]> {
    const queryParams = getQueryParams({
      address,
      runeid
    });
    const result: {
      code: number;
      data: UTXO[];
      msg: string;
    } = await this.apiClient.get(`/v5/runes/utxos?${queryParams}`, {
      baseURL: UNISAT_SERVICE_ENDPOINT
    });

    return result.data;
  }
}
