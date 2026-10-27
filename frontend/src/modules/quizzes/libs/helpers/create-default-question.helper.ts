import { QuestionType } from '~/modules/quizzes/libs/enums/enums';
import type { QuestionPayload } from '~/modules/quizzes/libs/types/types';

export const createDefaultQuestion = (type: QuestionType, text = ''): QuestionPayload => {
  switch (type) {
    case QuestionType.BOOLEAN:
      return { type, text, correctAnswer: true };
    case QuestionType.INPUT:
      return { type, text, correctAnswer: '' };
    case QuestionType.CHECKBOX:
      return {
        type,
        text,
        options: [
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
        ],
      };
  }
};
