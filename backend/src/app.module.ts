import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validateEnv } from '~/libs/config/config.js';
import { PrismaModule } from '~/libs/prisma/prisma.js';
import { QuizzesModule } from '~/modules/quizzes/quizzes.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
    PrismaModule,
    QuizzesModule,
  ],
})
export class AppModule {}
