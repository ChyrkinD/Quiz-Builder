import type { ValueOf } from '~/libs/types/types';

export const DataStatus = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  NOT_FOUND: 'not-found',
} as const;

export type DataStatus = ValueOf<typeof DataStatus>;
