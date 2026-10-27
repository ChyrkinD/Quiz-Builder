import type { ValueOf } from '~/libs/types/types';

export const APIPath = {
  QUIZZES: '/quizzes',
} as const;

export type APIPath = ValueOf<typeof APIPath>;
