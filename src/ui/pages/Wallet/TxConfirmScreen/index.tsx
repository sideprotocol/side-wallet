import { RawTxInfo, TxType } from '@/shared/types';
import { LiquidationEvent } from '@/ui/services/lending/types';
import { useLocationState } from '@/ui/utils';

import BitcoinTxConfirmScreen from './BitcoinTxConfirmScreen';
import SideTxConfirmScreen from './SideTxConfirmScreen';

export interface TxConfirmLocationState {
  rawTxInfo: RawTxInfo;
  type?: TxType;
  lendingState?: {
    loanId: string;
    borrowAmount: string;
    collateralAmount: string;
    feeRate: number;
    liquidationEvent: LiquidationEvent;
  };
}

export default function TxConfirmScreen() {
  const state = useLocationState<TxConfirmLocationState>();

  if (state.type === TxType.SEND_SIDE) {
    return <SideTxConfirmScreen />;
  }
  return <BitcoinTxConfirmScreen />;
}
