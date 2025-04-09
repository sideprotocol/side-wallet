import { useAppSelector } from '@/ui/state/hooks';

import { AppState } from '..';

export function useLendingState(): AppState['lending'] {
  return useAppSelector((state) => state.lending);
}
