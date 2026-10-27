import type { ValueOf } from '~/libs/types/types';

export const ColorTone = {
  PRIMARY: 'primary',
  BOOLEAN: 'boolean',
  INPUT: 'input',
  CHECKBOX: 'checkbox',
  DANGER: 'danger',
} as const;

export type ColorTone = ValueOf<typeof ColorTone>;
