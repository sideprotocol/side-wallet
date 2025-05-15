import { useQuery } from 'react-query';

import services from '../services';
import { useEnvironment } from '../state/environment/hooks';

export const useFeeSummary = () => {
  const { UNISAT_SERVICE_ENDPOINT } = useEnvironment();
  const { data, isLoading } = useQuery({
    queryKey: ['fee-summary', { UNISAT_SERVICE_ENDPOINT }],
    queryFn: () => services.unisat.getFeeSummary(UNISAT_SERVICE_ENDPOINT),
    // 缓存时间设置为1分钟
    staleTime: 60 * 1000,
    refetchOnWindowFocus: true
  });

  const maxFee = data?.list.find((v) => v.title === 'Fast')?.feeRate;

  const fastTimeDesc = data?.list.find((v) => v.title === 'Fast')?.desc;

  return { feeSummary: data, isLoading, maxFee, fastTimeDesc };
};
