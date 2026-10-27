import type { ValueOf } from '~/libs/types/types';

export const ButtonVariant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  GHOST: 'ghost',
  DANGER: 'danger',
} as const;

export type ButtonVariant = ValueOf<typeof ButtonVariant>;
