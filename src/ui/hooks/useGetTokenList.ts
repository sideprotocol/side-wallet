import { useEffect, useState } from 'react';

import { BITCOIN_TOKENS, SIDE_TOKENS } from '@/shared/constant';
import { BitcoinToken, SideToken } from '@/shared/types';
import { useWallet } from '@/ui/utils';

export function useGetSideTokenList() {
  const wallet = useWallet();
  const [data, setData] = useState<SideToken[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const tokens = await wallet.getSideTokens();
    setData(tokens);
    setTimeout(async () => {
      await wallet.setSideTokens(SIDE_TOKENS);
      setData(SIDE_TOKENS);
      // const result = await services.dex.getSideAssets();
      // setSideAssets(result);
    }, 2000);
  };

  return {
    data
  };
}

export function useGetBitcoinTokenList() {
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
