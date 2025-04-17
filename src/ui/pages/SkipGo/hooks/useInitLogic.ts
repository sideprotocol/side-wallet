import { useEffect } from 'react';

import { useAppDispatch } from '@/ui/state/hooks';
import { useSkipGoState } from '@/ui/state/skipGo/hook';
import { SkipGoActions } from '@/ui/state/skipGo/reducer';

import useGetSkipAssets from './useGetSkipAssets';
import useGetSkipChains from './useGetSkipChains';

const initSourceAssetChainId = 'sidechain-1',
  initDestAssetChainId = 'noble-1';

export default function useInitLogic() {
  const { skipChains } = useGetSkipChains();
  const { skipAssets } = useGetSkipAssets();

  const dispatch = useAppDispatch();

  const { sourceAsset, sourceAssetChain, destAsset, destAssetChain } = useSkipGoState();

  useEffect(() => {
    if (skipAssets && skipChains) {
      if (!sourceAssetChain && !sourceAsset) {
        const _sourceAssetChain = skipChains.find((chain) => chain.chainID === initSourceAssetChainId);
        dispatch(
          SkipGoActions.update({
            sourceAssetChain: _sourceAssetChain,
            sourceAsset: skipAssets[initSourceAssetChainId][0]
          })
        );
      }
      if (!destAssetChain && !destAsset) {
        const _destAssetChain = skipChains.find((chain) => chain.chainID === initDestAssetChainId);
        dispatch(
          SkipGoActions.update({ destAssetChain: _destAssetChain, destAsset: skipAssets[initDestAssetChainId][0] })
        );
      }
    }
  }, [skipAssets, skipChains]);
}
