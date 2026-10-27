import { z } from 'zod';

import { requiredText } from '~/libs/helpers/helpers.js';
import { QUIZ_LIMITS } from '~/modules/quizzes/libs/constants/constants.js';
import { QuestionType } from '~/modules/quizzes/libs/enums/enums.js';

const questionTextSchema = requiredText('Question text', QUIZ_LIMITS.questionTextMaxLength);

export const questionTypeSchema = z.enum(QuestionType);

export const booleanQuestionSchema = z.object({
  type: z.literal(QuestionType.BOOLEAN),
  text: questionTextSchema,
  correctAnswer: z.boolean({ error: 'Select the correct answer' }),
});

export const inputQuestionSchema = z.object({
  type: z.literal(QuestionType.INPUT),
  text: questionTextSchema,
  correctAnswer: requiredText('Correct answer', QUIZ_LIMITS.answerMaxLength),
});

export const checkboxOptionSchema = z.object({
  text: requiredText('Option text', QUIZ_LIMITS.answerMaxLength),
  isCorrect: z.boolean(),
});

export const checkboxQuestionSchema = z.object({
  type: z.literal(QuestionType.CHECKBOX),
  text: questionTextSchema,
  options: z
    .array(checkboxOptionSchema)
    .min(QUIZ_LIMITS.minOptions, `Add at least ${QUIZ_LIMITS.minOptions} options`)
    .max(QUIZ_LIMITS.maxOptions, `Add at most ${QUIZ_LIMITS.maxOptions} options`)
    .refine((options) => options.some((option) => option.isCorrect), {
      error: 'Mark at least one option as correct',
    })
    .refine(
      (options) => {
        const texts = options.map((option) => option.text.toLowerCase()).filter(Boolean);
        return new Set(texts).size === texts.length;
      },
      { error: 'Options must be unique' },
    ),
});

export const questionSchema = z.discriminatedUnion('type', [
  booleanQuestionSchema,
  inputQuestionSchema,
  checkboxQuestionSchema,
]);
