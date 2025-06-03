import browser from '@/background/webapi/browser';
import { AddressFlagType, BITCOIN_CHAINS_MAP, ChainType, NETWORK_TYPES } from '@/shared/constant';

import BroadcastChannelMessage from './message/broadcastChannelMessage';
import PortMessage from './message/portMessage';

const Message = {
  BroadcastChannelMessage,
  PortMessage
};

declare global {
  const langLocales: Record<string, Record<'message', string>>;
}

const t = (name) => browser.i18n.getMessage(name);

const format = (str, ...args) => {
  return args.reduce((m, n) => m.replace('_s_', n), str);
};

export { format, Message, t };

// Check if address flag is enabled
export const checkAddressFlag = (currentFlag: number, flag: AddressFlagType): boolean => {
  return Boolean(currentFlag & flag);
};

export function getChainInfo(chainType: ChainType) {
  const chain = BITCOIN_CHAINS_MAP[chainType];
  return {
    enum: chainType,
    name: chain.label,
    network: NETWORK_TYPES[chain.networkType].name
  };
}
