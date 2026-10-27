import type {
  CreateQuizPayload,
  QuizDetail,
  QuizSummary,
} from '~/modules/quizzes/libs/types/types';
import { APIPath, HttpMethod } from '~/libs/enums/enums';
import { request } from '~/services/http/http';

export const quizzesService = {
  getAll: (signal?: AbortSignal): Promise<QuizSummary[]> =>
    request<QuizSummary[]>(APIPath.QUIZZES, { signal }),

  getById: (id: string, signal?: AbortSignal): Promise<QuizDetail> =>
    request<QuizDetail>(`${APIPath.QUIZZES}/${id}`, { signal }),

  create: (payload: CreateQuizPayload): Promise<QuizDetail> =>
    request<QuizDetail>(APIPath.QUIZZES, { method: HttpMethod.POST, body: payload }),

  remove: (id: string): Promise<void> =>
    request<void>(`${APIPath.QUIZZES}/${id}`, { method: HttpMethod.DELETE }),
};
