import type { FC, InputHTMLAttributes, Ref } from 'react';

import { Icon } from '~/components/icon/icon';
import { IconName } from '~/libs/enums/enums';
import { getValidClasses } from '~/libs/helpers/helpers';

type Properties = Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'type'> & {
  className?: string | undefined;
  label: string;
  ref?: Ref<HTMLInputElement> | undefined;
};

const Checkbox: FC<Properties> = ({ className, label, ref, ...inputProps }) => (
  <span className={getValidClasses('relative inline-flex size-6 shrink-0', className)}>
    <input
      aria-label={label}
      className="peer size-6 cursor-pointer appearance-none rounded-[7px] border-2 border-border-strong bg-surface transition-colors checked:border-checkbox checked:bg-checkbox focus-visible:ring-4 focus-visible:ring-checkbox/30 focus-visible:outline-none disabled:cursor-default"
      ref={ref}
      type="checkbox"
      {...inputProps}
    />
    <Icon
      className="pointer-events-none absolute inset-1 size-4 text-text-inverse opacity-0 peer-checked:opacity-100"
      iconName={IconName.CHECK}
    />
  </span>
);

export { Checkbox };
