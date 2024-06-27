import { useEffect, useState } from 'react';

import { SIDE_TOKENS } from '@/shared/constant';
import { SideToken } from '@/shared/types';
import { useWallet } from '@/ui/utils';

export default function useGetSideTokenList() {
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
    }, 2000);
  };

  return {
    data
  };
}
