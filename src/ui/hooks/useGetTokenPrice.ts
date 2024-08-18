import { useEffect } from 'react';

import { ASSETS, SIDE_ID } from '../constants';
import services from '../services';
import { useWallet } from '../utils';

export default function useGetTokenPrice() {
  const wallet = useWallet();

  useEffect(() => {
    getAssetPrice();
    const unitInterval = setInterval(() => {
      getAssetPrice();
    }, 360000);
    return () => {
      clearInterval(unitInterval);
    };
  }, []);

  const getAssetPrice = async () => {
    const sideAssets = ASSETS.find((item) => item.chainID === SIDE_ID);
    const priceMap: { [key: string]: string } = {};
    for (let i = 0; i < sideAssets?.assets?.length; i++) {
      const asset = sideAssets?.assets[i];
      try {
        const result = await services.dex.getAssetPrice(asset?.base);
        priceMap[asset?.base] = result;
      } catch (err) {
        console.log(err);
      }
    }
    localStorage.setItem('priceMap', JSON.stringify(priceMap));
    wallet.setAssetPriceMap(priceMap);
  };
}
