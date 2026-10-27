import type { FC } from 'react';

import { Icon } from '~/components/components';
import { IconName } from '~/libs/enums/enums';
import { getValidClasses } from '~/libs/helpers/helpers';

type Properties = {
  name: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

const BooleanChoice: FC<Properties> = ({ name, value, onChange }) => (
  <fieldset className="flex flex-col gap-2.5">
    <legend className="mb-2.5 text-sm font-bold text-text">Correct answer</legend>
    <div className="flex gap-3">
      {[true, false].map((option) => {
        const isSelected = option === value;

        return (
          <label
            key={String(option)}
            className={getValidClasses(
              'inline-flex cursor-pointer items-center gap-2 rounded-full border-2 px-5 py-2 text-base font-bold transition-[background-color,border-color,box-shadow] select-none has-focus-visible:ring-4 has-focus-visible:ring-boolean/30',
              isSelected
                ? 'border-boolean bg-boolean text-text-inverse shadow-[0_3px_0_var(--color-boolean-strong)]'
                : 'border-border-strong bg-surface text-text-muted hover:border-boolean',
            )}
          >
            <input
              checked={isSelected}
              className="sr-only"
              name={name}
              type="radio"
              onChange={() => onChange(option)}
            />
            {isSelected && <Icon className="size-4" iconName={IconName.CHECK} />}
            {option ? 'True' : 'False'}
          </label>
        );
      })}
    </div>
  </fieldset>
);

export { BooleanChoice };
