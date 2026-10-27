import type { ValueOf } from '~/libs/types/types';

export const ComponentSize = {
  MD: 'md',
  SM: 'sm',
} as const;

export type ComponentSize = ValueOf<typeof ComponentSize>;
