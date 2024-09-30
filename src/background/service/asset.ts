import { createPersistStore } from '@/background/utils';
import { BalanceItem } from '@/shared/types';

export type AssetPriceType = {
  [key: string]: string;
};

export type AssetStore = {
  sideBalanceList: BalanceItem[];
  btcBalanceList: BalanceItem[];
};

class AssetService {
  store!: AssetStore;

  init = async () => {
    this.store = await createPersistStore<AssetStore>({
      name: 'asset',
      template: {
        sideBalanceList: [],
        btcBalanceList: []
      }
    });
  };

  setSideBalanceList = (data: BalanceItem[]) => {
    this.store.sideBalanceList = data;
  };

  getSideBalanceList = () => {
    return this.store.sideBalanceList;
  };

  setBtcBalanceList = (data: BalanceItem[]) => {
    this.store.btcBalanceList = data;
  };

  getBtcBalanceList = () => {
    return this.store.btcBalanceList;
  };
}

export default new AssetService();
