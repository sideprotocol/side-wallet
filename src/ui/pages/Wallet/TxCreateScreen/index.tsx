import { useLocation } from 'react-router-dom';

import { CHAINS_ENUM } from '@/shared/constant';

import CreateSendBtc from './CreateSendBtc';
import CreateSendRune from './CreateSendRune';
import CreateSendSide from './CreateSendSide';

export default function TxCreateScreen() {
  const { state } = useLocation();
  const { chain, token } = state as {
    chain: CHAINS_ENUM;
    token: any;
  };

  console.log('token: ', token);

  const isRune = !!token?.base?.includes('runes');

  if (chain === CHAINS_ENUM.BTC) {
    if (isRune) {
      return <CreateSendRune></CreateSendRune>;
    }

    return <CreateSendBtc />;
  }

  return <CreateSendSide />;
}
