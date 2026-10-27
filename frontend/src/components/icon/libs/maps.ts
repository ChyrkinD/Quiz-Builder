import type { FunctionComponent, SVGProps } from 'react';

import AlertIcon from '~/assets/img/alert.svg?react';
import ArrowLeftIcon from '~/assets/img/arrow-left.svg?react';
import BooleanIcon from '~/assets/img/boolean.svg?react';
import CalendarIcon from '~/assets/img/calendar.svg?react';
import CheckIcon from '~/assets/img/check.svg?react';
import CheckboxIcon from '~/assets/img/checkbox.svg?react';
import CircleCheckIcon from '~/assets/img/circle-check.svg?react';
import ClipboardIcon from '~/assets/img/clipboard.svg?react';
import InputIcon from '~/assets/img/input.svg?react';
import PlusIcon from '~/assets/img/plus.svg?react';
import TrashIcon from '~/assets/img/trash.svg?react';
import XIcon from '~/assets/img/x.svg?react';
import { IconName } from '~/libs/enums/enums';

export const iconNameToIcon = {
  [IconName.ALERT]: AlertIcon,
  [IconName.ARROW_LEFT]: ArrowLeftIcon,
  [IconName.BOOLEAN]: BooleanIcon,
  [IconName.CALENDAR]: CalendarIcon,
  [IconName.CHECK]: CheckIcon,
  [IconName.CHECKBOX]: CheckboxIcon,
  [IconName.CIRCLE_CHECK]: CircleCheckIcon,
  [IconName.CLIPBOARD]: ClipboardIcon,
  [IconName.INPUT]: InputIcon,
  [IconName.PLUS]: PlusIcon,
  [IconName.TRASH]: TrashIcon,
  [IconName.X]: XIcon,
} satisfies Record<IconName, FunctionComponent<SVGProps<SVGSVGElement>>>;
