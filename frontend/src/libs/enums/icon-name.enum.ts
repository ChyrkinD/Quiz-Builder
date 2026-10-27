import type { ValueOf } from '~/libs/types/types';

export const IconName = {
  ALERT: 'alert',
  ARROW_LEFT: 'arrow-left',
  BOOLEAN: 'boolean',
  CALENDAR: 'calendar',
  CHECK: 'check',
  CHECKBOX: 'checkbox',
  CIRCLE_CHECK: 'circle-check',
  CLIPBOARD: 'clipboard',
  INPUT: 'input',
  PLUS: 'plus',
  TRASH: 'trash',
  X: 'x',
} as const;

export type IconName = ValueOf<typeof IconName>;
