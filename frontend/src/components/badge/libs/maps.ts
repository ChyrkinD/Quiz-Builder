import { ComponentSize } from '~/libs/enums/enums';

export const badgeSizeToClasses = {
  [ComponentSize.MD]: 'px-2.5 py-1 text-sm',
  [ComponentSize.SM]: 'py-1 pr-2.5 pl-2 text-xs tracking-wide uppercase',
} satisfies Record<ComponentSize, string>;
