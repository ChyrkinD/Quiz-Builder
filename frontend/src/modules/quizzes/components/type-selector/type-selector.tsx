import type { FC } from 'react';

import { QuestionType } from '~/modules/quizzes/libs/enums/enums';
import { Icon } from '~/components/components';
import { getValidClasses } from '~/libs/helpers/helpers';
import { questionTypeToStyle } from '~/modules/quizzes/libs/maps/maps';

type Properties = {
  name: string;
  value: QuestionType;
  onChange: (type: QuestionType) => void;
};

const TypeSelector: FC<Properties> = ({ name, value, onChange }) => (
  <fieldset className="flex flex-wrap gap-2">
    <legend className="sr-only">Question type</legend>
    {Object.values(QuestionType).map((type) => {
      const style = questionTypeToStyle[type];

      return (
        <label
          key={type}
          className={getValidClasses(
            'inline-flex cursor-pointer items-center gap-2 rounded-md border-2 border-border bg-surface px-3.5 py-2 text-sm font-bold text-text-muted transition-colors select-none hover:border-border-strong has-focus-visible:ring-4 has-focus-visible:ring-primary/30',
            style.selected,
          )}
        >
          <input
            checked={value === type}
            className="sr-only"
            name={name}
            type="radio"
            value={type}
            onChange={() => onChange(type)}
          />
          <Icon className="size-[18px]" iconName={style.iconName} />
          {style.label}
        </label>
      );
    })}
  </fieldset>
);

export { TypeSelector };
