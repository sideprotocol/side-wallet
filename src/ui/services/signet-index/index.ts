import BigNumber from 'bignumber.js';

import ApiClient from '@/ui/services/network/ApiClient';

import { FeeEstimateResponse, FeeListResult } from './types';

function humanizeInterval(interval) {
  const seconds = Math.floor(interval / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return years === 1 ? 'About 1 year' : `About ${years} years`;
  } else if (months > 0) {
    return months === 1 ? 'About 1 month' : `About ${months} months`;
  } else if (days > 0) {
    return days === 1 ? 'About 1 day' : `About ${days} days`;
  } else if (hours > 0) {
    return hours === 1 ? 'About 1 hour' : `About ${hours} hours`;
  } else if (minutes > 0) {
    return minutes === 1 ? 'About 1 minute' : `About ${minutes} minutes`;
  } else {
    return 'About a few seconds';
  }
}

export default class SignetService {
  private apiClient: ApiClient;

  private baseUrl: string;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;

    this.baseUrl = 'https://index.side.one';
  }

  async feeEstimates() {
    const res = await this.apiClient.get<FeeEstimateResponse>(`${this.baseUrl}/fee-estimates`);

    const rawList = Object.entries(res).sort((a, b) => a[1] - b[1]);

    const item1 = rawList?.[0] || ['2', 20];

    const item2 = (rawList?.[1] || item1)[1] === item1[1] ? item1 : rawList?.[1] || item1;

    const item3 = (rawList?.[2] || item2)[1] === item2[1] ? item2 : rawList?.[2] || item2;

    const list: FeeListResult[] = [
      {
        title: 'Slow',
        desc: humanizeInterval(
          BigNumber(item1[0])
            .times(10 * 60 * 1000)
            .toNumber()
        ),

        feeRate: item1[1]
      },
      {
        title: 'Avg',
        desc: humanizeInterval(
          BigNumber(item2[0])
            .times(10 * 60 * 1000)
            .toNumber()
        ),
        feeRate: item2[1]
      },
      {
        title: 'Fast',
        desc: humanizeInterval(
          BigNumber(item3[0])
            .times(10 * 60 * 1000)
            .toNumber()
        ),
        feeRate: item3[1]
      }
    ];

    return { list };
  }
}
