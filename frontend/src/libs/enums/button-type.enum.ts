import type { ValueOf } from '~/libs/types/types';

export const ButtonType = {
  BUTTON: 'button',
  SUBMIT: 'submit',
} as const;

export type ButtonType = ValueOf<typeof ButtonType>;
