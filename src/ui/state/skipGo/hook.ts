import { AppState } from '..';
import { useAppSelector } from '../hooks';

export function useSkipGoState(): AppState['skipGo'] {
  return useAppSelector((state) => state.skipGo);
}
