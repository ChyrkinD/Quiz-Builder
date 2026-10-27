import { ComponentSize } from '~/libs/enums/enums';

export const componentSizeToIconClasses = {
  [ComponentSize.MD]: 'size-5',
  [ComponentSize.SM]: 'size-4',
} satisfies Record<ComponentSize, string>;
