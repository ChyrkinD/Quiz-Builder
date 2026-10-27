import type { ValueOf } from '~/libs/types/types.js';

export const QuestionType = {
  BOOLEAN: 'BOOLEAN',
  INPUT: 'INPUT',
  CHECKBOX: 'CHECKBOX',
} as const;

export type QuestionType = ValueOf<typeof QuestionType>;
