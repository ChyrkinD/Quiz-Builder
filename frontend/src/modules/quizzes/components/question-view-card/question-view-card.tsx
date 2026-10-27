import type { FC } from 'react';

import { QuestionType } from '~/modules/quizzes/libs/enums/enums';
import type { CheckboxOption, Question } from '~/modules/quizzes/libs/types/types';
import { Checkbox, Icon } from '~/components/components';
import { IconName } from '~/libs/enums/enums';
import { getValidClasses } from '~/libs/helpers/helpers';
import {
  QuestionCard,
  QuestionNumber,
} from '~/modules/quizzes/components/question-card/question-card';
import { QuestionTypeBadge } from '~/modules/quizzes/components/question-type-badge/question-type-badge';

type Properties = {
  number: number;
  question: Question;
};

const CorrectMark: FC = () => <span className="sr-only"> (correct answer)</span>;

const BooleanAnswer: FC<{ correctAnswer: boolean }> = ({ correctAnswer }) => (
  <ul className="flex gap-3">
    {[true, false].map((value) => {
      const isCorrect = value === correctAnswer;

      return (
        <li
          key={String(value)}
          className={getValidClasses(
            'flex items-center gap-2 rounded-full border-2 px-4 py-1.5 text-base font-bold',
            isCorrect
              ? 'border-boolean bg-boolean-soft text-boolean-strong'
              : 'border-border text-text-muted',
          )}
        >
          {isCorrect && <Icon className="size-3.5" iconName={IconName.CHECK} />}
          {value ? 'True' : 'False'}
          {isCorrect && <CorrectMark />}
        </li>
      );
    })}
  </ul>
);

const InputAnswer: FC<{ correctAnswer: string }> = ({ correctAnswer }) => (
  <div className="flex flex-col gap-2">
    <p className="text-sm font-bold text-text-muted">Correct answer</p>
    <p className="rounded-md bg-input-soft px-3.5 py-3 text-base font-bold break-words text-input-strong">
      {correctAnswer}
    </p>
  </div>
);

const CheckboxAnswer: FC<{ options: CheckboxOption[] }> = ({ options }) => (
  <ul className="flex flex-col gap-2">
    {options.map((option) => (
      <li
        key={option.id}
        className={getValidClasses(
          'flex items-center gap-3 rounded-md border px-3 py-2.5 text-base',
          option.isCorrect
            ? 'border-transparent bg-checkbox-soft font-bold text-checkbox-strong'
            : 'border-border text-text-muted',
        )}
      >
        <Checkbox
          disabled
          readOnly
          checked={option.isCorrect}
          label={`${option.text} (${option.isCorrect ? 'correct' : 'incorrect'})`}
        />
        <span aria-hidden="true" className="min-w-0 break-words">
          {option.text}
        </span>
      </li>
    ))}
  </ul>
);

const QuestionViewCard: FC<Properties> = ({ number, question }) => (
  <QuestionCard type={question.type}>
    <div className="flex items-center justify-between gap-3">
      <QuestionNumber number={number} type={question.type} />
      <QuestionTypeBadge type={question.type} />
    </div>
    <h2 className="text-lg font-bold break-words text-text">
      <span className="sr-only">Question {number}: </span>
      {question.text}
    </h2>
    {question.type === QuestionType.BOOLEAN && (
      <BooleanAnswer correctAnswer={question.correctAnswer} />
    )}
    {question.type === QuestionType.INPUT && <InputAnswer correctAnswer={question.correctAnswer} />}
    {question.type === QuestionType.CHECKBOX && <CheckboxAnswer options={question.options} />}
  </QuestionCard>
);

export { QuestionViewCard };
