import { z } from 'zod';

import { requiredText } from '~/libs/helpers/helpers.js';
import { QUIZ_LIMITS } from '~/modules/quizzes/libs/constants/constants.js';
import { questionSchema } from './question.validation-schema.js';

export const createQuizSchema = z.object({
  title: requiredText('Title', QUIZ_LIMITS.titleMaxLength),
  questions: z
    .array(questionSchema)
    .min(1, 'Add at least one question')
    .max(QUIZ_LIMITS.maxQuestions, `Add at most ${QUIZ_LIMITS.maxQuestions} questions`),
});
