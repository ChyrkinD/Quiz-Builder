import { BadRequestException, HttpStatus, type PipeTransform } from '@nestjs/common';
import type { z } from 'zod';

import type { ApiErrorResponse } from '~/libs/types/types.js';

export class ZodValidationPipe<TSchema extends z.ZodType> implements PipeTransform<
  unknown,
  z.output<TSchema>
> {
  constructor(private readonly schema: TSchema) {}

  transform(value: unknown): z.output<TSchema> {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Bad Request',
        message: 'Validation failed',
        issues: result.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      } satisfies ApiErrorResponse);
    }

    return result.data;
  }
}
