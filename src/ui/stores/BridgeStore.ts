import { proxy, useSnapshot } from 'valtio';

export interface ChainItem {
  id: string;
  name: string;
  logo: string;
}

export interface DepositBTCBridge {
  amount: number;
  fee: number;
}

const initData = {
  base: 'sat',
  bridgeAmount: '',
  from: null || ({} as ChainItem),
  to: null || ({} as ChainItem),
  balance: '',
  fee: 20,
  loading: false,
  selectTokenModalShow: false
};

export const bridgeStore = proxy(initData);

export const useBridgeStore = () => {
  return useSnapshot(bridgeStore);
};
