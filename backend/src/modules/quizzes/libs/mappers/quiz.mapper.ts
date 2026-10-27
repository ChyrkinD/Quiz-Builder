import { QuestionType } from '~/modules/quizzes/libs/enums/enums.js';
import type { Prisma } from '~/generated/prisma/client.js';
import type {
  Question,
  QuestionPayload,
  QuestionRecord,
  QuizDetail,
  QuizDetailRecord,
  QuizSummary,
  QuizSummaryRecord,
} from '~/modules/quizzes/libs/types/types.js';

export const toQuestionCreateInput = (
  question: QuestionPayload,
  position: number,
): Prisma.QuestionCreateWithoutQuizInput => {
  switch (question.type) {
    case QuestionType.BOOLEAN:
      return {
        position,
        type: question.type,
        text: question.text,
        booleanAnswer: question.correctAnswer,
      };
    case QuestionType.INPUT:
      return {
        position,
        type: question.type,
        text: question.text,
        textAnswer: question.correctAnswer,
      };
    case QuestionType.CHECKBOX:
      return {
        position,
        type: question.type,
        text: question.text,
        options: {
          create: question.options.map((option, optionPosition) => ({
            position: optionPosition,
            text: option.text,
            isCorrect: option.isCorrect,
          })),
        },
      };
  }
};

const missingAnswer = (record: QuestionRecord): Error =>
  new Error(`Question ${record.id} of type ${record.type} has no stored answer`);

export const toQuestion = (record: QuestionRecord): Question => {
  switch (record.type) {
    case QuestionType.BOOLEAN:
      if (record.booleanAnswer === null) {
        throw missingAnswer(record);
      }
      return {
        id: record.id,
        type: record.type,
        text: record.text,
        correctAnswer: record.booleanAnswer,
      };
    case QuestionType.INPUT:
      if (record.textAnswer === null) {
        throw missingAnswer(record);
      }
      return {
        id: record.id,
        type: record.type,
        text: record.text,
        correctAnswer: record.textAnswer,
      };
    case QuestionType.CHECKBOX:
      return {
        id: record.id,
        type: record.type,
        text: record.text,
        options: record.options.map((option) => ({
          id: option.id,
          text: option.text,
          isCorrect: option.isCorrect,
        })),
      };
  }
};

export const toQuizDetail = (record: QuizDetailRecord): QuizDetail => ({
  id: record.id,
  title: record.title,
  createdAt: record.createdAt.toISOString(),
  questions: record.questions.map(toQuestion),
});

export const toQuizSummary = (record: QuizSummaryRecord): QuizSummary => ({
  id: record.id,
  title: record.title,
  createdAt: record.createdAt.toISOString(),
  questionCount: record._count.questions,
});
