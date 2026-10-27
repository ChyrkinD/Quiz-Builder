import type { Prisma } from '~/generated/prisma/client.js';

export const QUIZ_DETAIL_INCLUDE = {
  questions: {
    orderBy: { position: 'asc' },
    include: {
      options: { orderBy: { position: 'asc' } },
    },
  },
} satisfies Prisma.QuizInclude;

export const QUIZ_SUMMARY_SELECT = {
  id: true,
  title: true,
  createdAt: true,
  _count: { select: { questions: true } },
} satisfies Prisma.QuizSelect;
