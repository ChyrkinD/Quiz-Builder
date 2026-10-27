import type { FC, ReactNode } from 'react';

import type { QuestionType } from '~/modules/quizzes/libs/enums/enums';
import { getValidClasses } from '~/libs/helpers/helpers';
import { colorToneToFillClasses, colorToneToSoftClasses } from '~/libs/maps/maps';
import { questionTypeToStyle } from '~/modules/quizzes/libs/maps/maps';

type Properties = {
  children: ReactNode;
  hasError?: boolean | undefined;
  type: QuestionType;
};

const QuestionCard: FC<Properties> = ({ children, hasError = false, type }) => (
  <article
    className={getValidClasses(
      'relative flex flex-col gap-4 overflow-hidden rounded-xl border-2 bg-surface py-5 pr-4 pl-5 shadow-card sm:gap-5 sm:py-6 sm:pr-6 sm:pl-7',
      hasError ? 'border-danger' : 'border-border',
    )}
  >
    <span
      aria-hidden="true"
      className={getValidClasses(
        'absolute inset-y-0 left-0 w-1.5',
        colorToneToFillClasses[questionTypeToStyle[type].tone],
      )}
    />
    {children}
  </article>
);

type NumberProperties = {
  number: number;
  type: QuestionType;
};

const QuestionNumber: FC<NumberProperties> = ({ number, type }) => (
  <span
    aria-hidden="true"
    className={getValidClasses(
      'flex size-8 shrink-0 items-center justify-center rounded-full text-base font-bold',
      colorToneToSoftClasses[questionTypeToStyle[type].tone],
    )}
  >
    {number}
  </span>
);

export { QuestionCard, QuestionNumber };
