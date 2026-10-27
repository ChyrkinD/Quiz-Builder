import type { Prisma } from '~/generated/prisma/client.js';
import type {
  QUIZ_DETAIL_INCLUDE,
  QUIZ_SUMMARY_SELECT,
} from '~/modules/quizzes/libs/constants/constants.js';

export type QuizDetailRecord = Prisma.QuizGetPayload<{ include: typeof QUIZ_DETAIL_INCLUDE }>;
export type QuestionRecord = QuizDetailRecord['questions'][number];
export type QuizSummaryRecord = Prisma.QuizGetPayload<{ select: typeof QUIZ_SUMMARY_SELECT }>;
