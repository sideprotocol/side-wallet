import { useLocation } from 'react-router-dom';

import { CHAINS_ENUM } from '@/shared/constant';

import CreateSendBtc from './CreateSendBtc';
import CreateSendSide from './CreateSendSide';

export default function TxCreateScreen() {
  const { state } = useLocation();
  const { chain } = state as {
    chain: CHAINS_ENUM;
  };
  if (chain === CHAINS_ENUM.BTC) {
    return <CreateSendBtc />;
  }

  return <CreateSendSide />;
}
