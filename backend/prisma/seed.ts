import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';

import { QuestionType } from '~/modules/quizzes/libs/enums/enums.js';
import { createQuizSchema } from '~/modules/quizzes/libs/validation-schemas/validation-schemas.js';
import type { CreateQuizPayload } from '~/modules/quizzes/libs/types/types.js';
import { PrismaClient } from '~/generated/prisma/client.js';
import { toQuestionCreateInput } from '~/modules/quizzes/libs/mappers/mappers.js';

const SAMPLE_QUIZZES: CreateQuizPayload[] = [
  {
    title: 'JavaScript Basics',
    questions: [
      {
        type: QuestionType.BOOLEAN,
        text: 'JavaScript runs on a single main thread.',
        correctAnswer: true,
      },
      {
        type: QuestionType.INPUT,
        text: 'Which keyword declares a block-scoped constant?',
        correctAnswer: 'const',
      },
      {
        type: QuestionType.CHECKBOX,
        text: 'Which of these are primitive types?',
        options: [
          { text: 'string', isCorrect: true },
          { text: 'number', isCorrect: true },
          { text: 'object', isCorrect: false },
          { text: 'boolean', isCorrect: true },
        ],
      },
    ],
  },
  {
    title: 'HTTP Fundamentals',
    questions: [
      {
        type: QuestionType.CHECKBOX,
        text: 'Which HTTP methods are idempotent?',
        options: [
          { text: 'GET', isCorrect: true },
          { text: 'POST', isCorrect: false },
          { text: 'PUT', isCorrect: true },
          { text: 'DELETE', isCorrect: true },
        ],
      },
      {
        type: QuestionType.INPUT,
        text: 'Which status code means "Not Found"?',
        correctAnswer: '404',
      },
      {
        type: QuestionType.BOOLEAN,
        text: 'A 201 response is returned when a resource is deleted.',
        correctAnswer: false,
      },
    ],
  },
];

const connectionString = process.env['DATABASE_URL'];

if (!connectionString) {
  throw new Error('DATABASE_URL is not set. Copy backend/.env.example to backend/.env.');
}

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

const seed = async (): Promise<void> => {
  for (const sample of SAMPLE_QUIZZES) {
    const quiz = createQuizSchema.parse(sample);

    const existing = await prisma.quiz.findFirst({ where: { title: quiz.title } });

    if (existing) {
      console.log(`Skipped "${quiz.title}" (already exists)`);
      continue;
    }

    await prisma.quiz.create({
      data: {
        title: quiz.title,
        questions: {
          create: quiz.questions.map((question, position) =>
            toQuestionCreateInput(question, position),
          ),
        },
      },
    });

    console.log(`Created "${quiz.title}" (${quiz.questions.length} questions)`);
  }
};

try {
  await seed();
} finally {
  await prisma.$disconnect();
}
