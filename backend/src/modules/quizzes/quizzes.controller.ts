import { Controller, Delete, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';

import type { CreateQuizPayload, QuizDetail, QuizSummary } from './libs/types/types.js';
import { CreateQuizBody, QuizIdParam } from './libs/decorators/decorators.js';

import { QuizzesService } from './quizzes.service.js';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  create(@CreateQuizBody() payload: CreateQuizPayload): Promise<QuizDetail> {
    return this.quizzesService.create(payload);
  }

  @Get()
  findAll(): Promise<QuizSummary[]> {
    return this.quizzesService.findAll();
  }

  @Get(':id')
  findOne(@QuizIdParam() id: string): Promise<QuizDetail> {
    return this.quizzesService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@QuizIdParam() id: string): Promise<void> {
    return this.quizzesService.remove(id);
  }
}
