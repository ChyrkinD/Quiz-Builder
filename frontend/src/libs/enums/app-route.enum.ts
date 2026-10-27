import type { ValueOf } from '~/libs/types/types';

export const AppRoute = {
  QUIZZES: '/quizzes',
  CREATE_QUIZ: '/create',
} as const;

export type AppRoute = ValueOf<typeof AppRoute>;

export const getQuizRoute = (id: string): string => `${AppRoute.QUIZZES}/${id}`;
