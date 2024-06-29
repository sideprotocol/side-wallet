import { RawTxInfo, SideSendTxInfo, TxType } from '@/shared/types';
import { useLocationState } from '@/ui/utils';

import BitcoinTxConfirmScreen from './BitcoinTxConfirmScreen';
import SideTxConfirmScreen from './SideTxConfirmScreen';

export interface TxConfirmLocationState {
  rawTxInfo: RawTxInfo;
  type?: TxType;
  sideSendTxInfo: SideSendTxInfo;
}

export default function TxConfirmScreen() {
  const state = useLocationState<TxConfirmLocationState>();
  if (state.type === TxType.SEND_SIDE) {
    return <SideTxConfirmScreen />;
  }
  return <BitcoinTxConfirmScreen />;
}
