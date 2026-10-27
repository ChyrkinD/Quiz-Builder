import { ButtonVariant, ComponentSize } from '~/libs/enums/enums';

import type { IconButtonVariant } from './types';

export const iconButtonVariantToClasses = {
  [ButtonVariant.GHOST]: 'text-text-muted hover:bg-primary-soft hover:text-primary',
  [ButtonVariant.DANGER]: 'bg-danger-soft text-danger hover:bg-danger hover:text-text-inverse',
} satisfies Record<IconButtonVariant, string>;

export const iconButtonSizeToClasses = {
  [ComponentSize.MD]: 'size-10 rounded-md',
  [ComponentSize.SM]: 'size-8 rounded-sm',
} satisfies Record<ComponentSize, string>;
