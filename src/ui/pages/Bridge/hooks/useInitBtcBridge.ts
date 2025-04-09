import { useState } from 'react';
import { useQuery } from 'react-query';

import services from '@/ui/services';

export default function useInitBtcBridge() {
  const [fee, setFee] = useState(0);
  const { data, isLoading: initLoading } = useQuery({
    queryKey: ['initBtcBridgeData'],
    queryFn: async () => {
      const params = await services.bridge.getBridgeParams();
      const res = await services.unisat.getFeeSummary();
      const rcFee = res.list[2].feeRate;
      return { params, res, rcFee };
    }
  });

  return {
    bridgeParams: data?.params || null,
    fee: fee || data?.rcFee || 20,
    feeSummary: data?.res || null,
    initLoading,
    setFee
  };
}
