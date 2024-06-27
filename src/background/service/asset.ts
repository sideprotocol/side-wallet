import { createPersistStore } from '@/background/utils';
import { BitcoinToken, SideToken } from '@/shared/types';

export type CoingeckoPriceType = {
  [key: string]: {
    usd: number;
  };
};

export type AssetStore = {
  bitcoinTokens: BitcoinToken[];
  sideTokens: SideToken[];
  coingeckoPriceMap: CoingeckoPriceType;
  bitcoinTokenBalanceList: Array<{ amount: string } & Pick<BitcoinToken, 'symbol'>>;
  sideTokenBalanceList: Array<{ amount: string } & Pick<SideToken, 'base'>>;
};

class AssetService {
  store!: AssetStore;

  init = async () => {
    this.store = await createPersistStore<AssetStore>({
      name: 'asset',
      template: {
        bitcoinTokens: [],
        sideTokens: [],
        coingeckoPriceMap: {},
        bitcoinTokenBalanceList: [],
        sideTokenBalanceList: []
      }
    });
  };

  setBitcoinTokens = (data: BitcoinToken[]) => {
    this.store.bitcoinTokens = data;
  };

  getBitcoinTokens = () => {
    return this.store.bitcoinTokens;
  };
  setSideTokens = (data: SideToken[]) => {
    this.store.sideTokens = data;
  };

  getSideTokens = () => {
    return this.store.sideTokens;
  };

  setCoingeckoPriceMap = (data: CoingeckoPriceType) => {
    this.store.coingeckoPriceMap = data;
  };

  getCoingeckoPriceMap = () => {
    return this.store.coingeckoPriceMap;
  };

  getBitcoinTokenBalanceList = () => {
    return this.store.bitcoinTokenBalanceList;
  };

  setBitcoinTokenBalance = async (symbol: string, amount: string) => {
    const bitcoinTokenBalanceList = await this.getBitcoinTokenBalanceList();
    const index = bitcoinTokenBalanceList.findIndex((item) => item.symbol === symbol);
    if (index !== -1) {
      bitcoinTokenBalanceList.splice(index, 1);
    }
    this.store.bitcoinTokenBalanceList = [...bitcoinTokenBalanceList, { symbol, amount }];
  };

  getBitcoinTokenBalance = async (symbol: string) => {
    const bitcoinTokenBalanceList = await this.getBitcoinTokenBalanceList();
    const hasBalance = bitcoinTokenBalanceList.find((item) => item.symbol === symbol);
    if (hasBalance) {
      return hasBalance.amount;
    }
    return '0';
  };

  getSideTokenBalanceList = () => {
    return this.store.sideTokenBalanceList;
  };

  setSideTokenBalance = async (base: string, amount: string) => {
    const sideTokenBalanceList = await this.getSideTokenBalanceList();
    const index = sideTokenBalanceList.findIndex((item) => item.base === base);
    if (index !== -1) {
      sideTokenBalanceList.splice(index, 1);
    }
    this.store.sideTokenBalanceList = [...sideTokenBalanceList, { base, amount }];
    return this.store;
  };

  getSideTokenBalance = async (base: string) => {
    const sideTokenBalanceList = await this.getSideTokenBalanceList();
    const hasBalance = sideTokenBalanceList.find((item) => item.base === base);
    if (hasBalance) {
      return hasBalance.amount;
    }
    return '0';
  };
}

export default new AssetService();
