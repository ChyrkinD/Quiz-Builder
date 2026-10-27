import type { FC } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import { QUIZ_LIMITS } from '~/modules/quizzes/libs/constants/constants';
import type { CreateQuizPayload } from '~/modules/quizzes/libs/types/types';
import { Button, Checkbox, Icon, IconButton } from '~/components/components';
import { ButtonVariant, ComponentSize, IconName } from '~/libs/enums/enums';
import { getValidClasses } from '~/libs/helpers/helpers';
import { getFieldError } from '~/modules/quizzes/libs/helpers/helpers';

type Properties = {
  questionIndex: number;
};

const OptionsEditor: FC<Properties> = ({ questionIndex }) => {
  const {
    control,
    formState: { errors },
    register,
  } = useFormContext<CreateQuizPayload>();
  const name = `questions.${questionIndex}.options` as const;
  const { fields, append, remove } = useFieldArray({ control, name });
  const options = useWatch({ control, name });
  const listMessage = getFieldError(errors, name);
  const listDeps = `questions.${questionIndex}` as const;

  return (
    <fieldset className="flex flex-col gap-2.5">
      <legend className="mb-2.5 text-sm font-bold text-text">
        Options <span className="font-normal text-text-muted">· tick the correct ones</span>
      </legend>
      <ul className="flex flex-col gap-2.5">
        {fields.map((field, optionIndex) => {
          const optionName = `${name}.${optionIndex}` as const;
          const textError = getFieldError(errors, `${optionName}.text`);
          const isCorrect = options[optionIndex]?.isCorrect ?? false;

          return (
            <li key={field.id} className="flex flex-col gap-1.5">
              <div className="flex items-center gap-3">
                <Checkbox
                  label={`Option ${optionIndex + 1} is correct`}
                  {...register(`${optionName}.isCorrect`, { deps: listDeps })}
                />
                <input
                  aria-invalid={textError ? true : undefined}
                  aria-label={`Option ${optionIndex + 1}`}
                  className={getValidClasses(
                    'min-w-0 flex-1 rounded-md border-2 px-3.5 py-2 text-base text-text transition-[border-color,box-shadow,background-color] outline-none placeholder:text-text-muted focus:ring-4',
                    textError
                      ? 'border-danger bg-surface focus:ring-danger-soft'
                      : isCorrect
                        ? 'border-checkbox bg-checkbox-soft focus:ring-checkbox/20'
                        : 'border-border-strong bg-surface focus:border-primary focus:ring-primary-soft',
                  )}
                  placeholder={`Option ${optionIndex + 1}`}
                  {...register(`${optionName}.text`, { deps: listDeps })}
                />
                <IconButton
                  iconName={IconName.X}
                  isDisabled={fields.length <= QUIZ_LIMITS.minOptions}
                  label={`Remove option ${optionIndex + 1}`}
                  size={ComponentSize.SM}
                  onClick={() => remove(optionIndex)}
                />
              </div>
              {textError && <p className="ml-9 text-sm text-danger">{textError}</p>}
            </li>
          );
        })}
      </ul>
      {listMessage && (
        <p className="flex items-center gap-1.5 text-sm text-danger" role="alert">
          <Icon className="size-4" iconName={IconName.ALERT} />
          {listMessage}
        </p>
      )}
      <Button
        className="self-start"
        iconName={IconName.PLUS}
        isDisabled={fields.length >= QUIZ_LIMITS.maxOptions}
        size={ComponentSize.SM}
        variant={ButtonVariant.GHOST}
        onClick={() => append({ text: '', isCorrect: false })}
      >
        Add option
      </Button>
    </fieldset>
  );
};

export { OptionsEditor };
