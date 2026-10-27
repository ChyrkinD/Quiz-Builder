import type { FC } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { QuestionType } from '~/modules/quizzes/libs/enums/enums';
import type { CreateQuizPayload } from '~/modules/quizzes/libs/types/types';
import { IconButton, TextField } from '~/components/components';
import { IconName } from '~/libs/enums/enums';
import { BooleanChoice } from '~/modules/quizzes/components/boolean-choice/boolean-choice';
import { OptionsEditor } from '~/modules/quizzes/components/options-editor/options-editor';
import {
  QuestionCard,
  QuestionNumber,
} from '~/modules/quizzes/components/question-card/question-card';
import { TypeSelector } from '~/modules/quizzes/components/type-selector/type-selector';
import { countFormErrors, getErrorAt, getFieldError } from '~/modules/quizzes/libs/helpers/helpers';

type Properties = {
  index: number;
  isRemoveDisabled: boolean;
  onRemove: () => void;
  onTypeChange: (type: QuestionType) => void;
};

const QuestionEditorCard: FC<Properties> = ({
  index,
  isRemoveDisabled,
  onRemove,
  onTypeChange,
}) => {
  const {
    control,
    formState: { errors, submitCount },
    register,
  } = useFormContext<CreateQuizPayload>();
  const name = `questions.${index}` as const;
  const type = useWatch({ control, name: `${name}.type` });
  const number = index + 1;
  const textError = getFieldError(errors, `${name}.text`);
  const answerError = getFieldError(errors, `${name}.correctAnswer`);
  const hasError = submitCount > 0 && countFormErrors(getErrorAt(errors, name)) > 0;

  return (
    <QuestionCard hasError={hasError} type={type}>
      <div className="flex items-center gap-3">
        <QuestionNumber number={number} type={type} />
        <h3 className="flex-1 text-lg font-bold text-text">Question {number}</h3>
        <IconButton
          iconName={IconName.X}
          isDisabled={isRemoveDisabled}
          label={`Remove question ${number}`}
          onClick={onRemove}
        />
      </div>
      <TypeSelector name={`${name}.type`} value={type} onChange={onTypeChange} />
      <TextField
        error={textError}
        label="Question"
        placeholder="e.g. Which keyword declares a constant?"
        {...register(`${name}.text`)}
      />
      {type === QuestionType.BOOLEAN && (
        <Controller
          control={control}
          name={`${name}.correctAnswer`}
          render={({ field }) => (
            <BooleanChoice
              name={field.name}
              value={field.value === true}
              onChange={field.onChange}
            />
          )}
        />
      )}
      {type === QuestionType.INPUT && (
        <TextField
          error={answerError}
          label="Correct answer"
          placeholder="e.g. const"
          {...register(`${name}.correctAnswer`)}
        />
      )}
      {type === QuestionType.CHECKBOX && <OptionsEditor questionIndex={index} />}
    </QuestionCard>
  );
};

export { QuestionEditorCard };
