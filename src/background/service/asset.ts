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
  bitcoinTokenBalanceList: { [key: string]: Array<{ amount: string } & Pick<BitcoinToken, 'symbol'>> };
  sideTokenBalanceList: { [key: string]: Array<{ amount: string } & Pick<SideToken, 'base'>> };
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
        bitcoinTokenBalanceList: {},
        sideTokenBalanceList: {}
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

  getAccountBitcoinTokenBalanceList = (account: string) => {
    return this.store.bitcoinTokenBalanceList[account] || [];
  };

  setAccountBitcoinTokenBalance = async (account: string, symbol: string, amount: string) => {
    const accountBitcoinTokenBalanceList = await this.getAccountBitcoinTokenBalanceList(account);
    const index = accountBitcoinTokenBalanceList.findIndex((item) => item.symbol === symbol);
    if (index !== -1) {
      accountBitcoinTokenBalanceList.splice(index, 1);
    }
    this.store.bitcoinTokenBalanceList[account] = [...accountBitcoinTokenBalanceList, { symbol, amount }];
  };

  getAccountBitcoinTokenBalance = async (account: string, symbol: string) => {
    const accountBitcoinTokenBalanceList = await this.getAccountBitcoinTokenBalanceList(account);
    const hasBalance = accountBitcoinTokenBalanceList.find((item) => item.symbol === symbol);
    if (hasBalance) {
      return hasBalance.amount;
    }
    return '0';
  };

  getAccountSideTokenBalanceList = (account: string) => {
    return this.store.sideTokenBalanceList[account] || [];
  };

  setAccountSideTokenBalance = async (account: string, base: string, amount: string) => {
    const accountSideTokenBalanceList = await this.getAccountSideTokenBalanceList(account);
    const index = accountSideTokenBalanceList.findIndex((item) => item.base === base);
    if (index !== -1) {
      accountSideTokenBalanceList.splice(index, 1);
    }
    this.store.sideTokenBalanceList[account] = [...accountSideTokenBalanceList, { base, amount }];
  };

  getAccountSideTokenBalance = async (account: string, base: string) => {
    const accountSideTokenBalanceList = await this.getAccountSideTokenBalanceList(account);
    const hasBalance = accountSideTokenBalanceList.find((item) => item.base === base);
    if (hasBalance) {
      return hasBalance.amount;
    }
    return '0';
  };
}

export default new AssetService();
