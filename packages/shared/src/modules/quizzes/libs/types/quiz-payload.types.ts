import type { z } from 'zod';

import type {
  booleanQuestionSchema,
  checkboxOptionSchema,
  checkboxQuestionSchema,
  createQuizSchema,
  inputQuestionSchema,
  questionSchema,
} from '~/modules/quizzes/libs/validation-schemas/validation-schemas.js';

export type BooleanQuestionPayload = z.infer<typeof booleanQuestionSchema>;
export type InputQuestionPayload = z.infer<typeof inputQuestionSchema>;
export type CheckboxOptionPayload = z.infer<typeof checkboxOptionSchema>;
export type CheckboxQuestionPayload = z.infer<typeof checkboxQuestionSchema>;
export type QuestionPayload = z.infer<typeof questionSchema>;
export type CreateQuizPayload = z.infer<typeof createQuizSchema>;
