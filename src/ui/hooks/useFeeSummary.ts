import { useQuery } from 'react-query';

import services from '../services';

export const useFeeSummary = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['fee-summary'],
    queryFn: () => services.unisat.getFeeSummary(),
    // 缓存时间设置为1分钟
    staleTime: 60 * 1000,
    refetchOnWindowFocus: true
  });

  const maxFee = data?.list.find((v) => v.title === 'Fast')?.feeRate;

  const fastTimeDesc = data?.list.find((v) => v.title === 'Fast')?.desc;

  return { feeSummary: data, isLoading, maxFee, fastTimeDesc };
};
