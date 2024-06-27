import { useEffect, useState } from 'react';

import { BITCOIN_TOKENS } from '@/shared/constant';
import { BitcoinToken } from '@/shared/types';
import { useWallet } from '@/ui/utils';

export default function useGetBitcoinTokenList() {
  const wallet = useWallet();
  const [data, setData] = useState<BitcoinToken[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const tokens = await wallet.getBitcoinTokens();
    setData(tokens);
    setTimeout(async () => {
      await wallet.setBitcoinTokens(BITCOIN_TOKENS);
      setData(BITCOIN_TOKENS);
    }, 2000);
  };

  return {
    data
  };
}
