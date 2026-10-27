import { Injectable, NotFoundException } from '@nestjs/common';

import type { CreateQuizPayload, QuizDetail, QuizSummary } from './libs/types/types.js';
import { PrismaService } from '~/libs/prisma/prisma.js';
import { QUIZ_DETAIL_INCLUDE, QUIZ_SUMMARY_SELECT } from './libs/constants/constants.js';
import { toQuestionCreateInput, toQuizDetail, toQuizSummary } from './libs/mappers/mappers.js';

@Injectable()
export class QuizzesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateQuizPayload): Promise<QuizDetail> {
    const quiz = await this.prisma.quiz.create({
      data: {
        title: payload.title,
        questions: {
          create: payload.questions.map((question, position) =>
            toQuestionCreateInput(question, position),
          ),
        },
      },
      include: QUIZ_DETAIL_INCLUDE,
    });

    return toQuizDetail(quiz);
  }

  async findAll(): Promise<QuizSummary[]> {
    const quizzes = await this.prisma.quiz.findMany({
      select: QUIZ_SUMMARY_SELECT,
      orderBy: { createdAt: 'desc' },
    });

    return quizzes.map(toQuizSummary);
  }

  async findOne(id: string): Promise<QuizDetail> {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: QUIZ_DETAIL_INCLUDE,
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz ${id} not found`);
    }

    return toQuizDetail(quiz);
  }

  async remove(id: string): Promise<void> {
    const { count } = await this.prisma.quiz.deleteMany({ where: { id } });

    if (count === 0) {
      throw new NotFoundException(`Quiz ${id} not found`);
    }
  }
}
