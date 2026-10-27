import { ColorTone, IconName } from '~/libs/enums/enums';
import { QuestionType } from '~/modules/quizzes/libs/enums/enums';
import type { QuestionTypeStyle } from '~/modules/quizzes/libs/types/types';

export const questionTypeToStyle = {
  [QuestionType.BOOLEAN]: {
    iconName: IconName.BOOLEAN,
    label: 'True / False',
    selected:
      'has-checked:border-boolean has-checked:bg-boolean-soft has-checked:text-boolean-strong',
    tone: ColorTone.BOOLEAN,
  },
  [QuestionType.INPUT]: {
    iconName: IconName.INPUT,
    label: 'Short answer',
    selected: 'has-checked:border-input has-checked:bg-input-soft has-checked:text-input-strong',
    tone: ColorTone.INPUT,
  },
  [QuestionType.CHECKBOX]: {
    iconName: IconName.CHECKBOX,
    label: 'Multiple choice',
    selected:
      'has-checked:border-checkbox has-checked:bg-checkbox-soft has-checked:text-checkbox-strong',
    tone: ColorTone.CHECKBOX,
  },
} satisfies Record<QuestionType, QuestionTypeStyle>;
