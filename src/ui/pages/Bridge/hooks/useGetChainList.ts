import { useMemo } from 'react';

import { bitcoinChain, sideChain } from '@/shared/constant';

import useSkipClient from './useSkipClient';

export default function useGetChainList() {
  const { skipChains } = useSkipClient();

  const { fromChainList, toChainList } = useMemo(() => {
    return {
      fromChainList: [bitcoinChain, sideChain],
      toChainList: []
    };
  }, []);

  return {
    fromChainList,
    toChainList
  };
}
