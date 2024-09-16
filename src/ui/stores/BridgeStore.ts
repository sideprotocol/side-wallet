import { proxy, useSnapshot } from 'valtio';

export interface ChainItem {
  id: string;
  name: string;
  logo: string;
}

export interface DepositBTCBridge {
  amount: number;
  fee: number;
  to?: string;
  isSign?: boolean;
}

interface Status {
  confirmed: boolean;
  block_height: number;
  block_hash: string;
  block_time: number;
}

export interface UTXOAddress {
  txid: string;
  vout: number;
  status: Status;
  value: number;
}

const initData = {
  base: 'sat',
  exponent: 8,
  bridgeAmount: '',
  from: ({} as ChainItem),
  to: ({} as ChainItem),
  balance: '',
  fee: 20,
  loading: false,
  selectTokenModalShow: false,
  accountUtxo: null as UTXOAddress | null
};

export const bridgeStore = proxy(initData);

export const useBridgeStore = () => {
  return useSnapshot(bridgeStore);
};
