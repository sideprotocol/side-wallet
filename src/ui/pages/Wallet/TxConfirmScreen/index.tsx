import { RawTxInfo, TxType } from '@/shared/types';
import { useLocationState } from '@/ui/utils';

import BitcoinTxConfirmScreen from './BitcoinTxConfirmScreen';
import SideTxConfirmScreen from './SideTxConfirmScreen';
import SwapSideTxConfirmScreen from './SwapSideTxConfirmScreen';

export interface TxConfirmLocationState {
  rawTxInfo: RawTxInfo;
  type?: TxType;
  lendingState?: {
    loanId: string;
    borrowAmount: string;
    collateralAmount: string;
    feeRate: number;
    from?: string;
  };
}

export default function TxConfirmScreen() {
  const state = useLocationState<TxConfirmLocationState>();

  if (state.type === TxType.SEND_SIDE) {
    return <SideTxConfirmScreen />;
  }

  if (state.type === TxType.SWAP_SIDE) {
    return <SwapSideTxConfirmScreen />;
  }

  return <BitcoinTxConfirmScreen />;
}
