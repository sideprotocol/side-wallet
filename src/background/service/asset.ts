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
};

class AssetService {
  store!: AssetStore;

  init = async () => {
    this.store = await createPersistStore<AssetStore>({
      name: 'asset',
      template: {
        bitcoinTokens: [],
        sideTokens: [],
        coingeckoPriceMap: {}
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
}

export default new AssetService();
