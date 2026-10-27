import type { ButtonVariant } from '~/libs/enums/enums';

export type IconButtonVariant = Extract<
  ButtonVariant,
  typeof ButtonVariant.GHOST | typeof ButtonVariant.DANGER
>;
