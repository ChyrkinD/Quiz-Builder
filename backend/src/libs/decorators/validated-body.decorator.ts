import { Body } from '@nestjs/common';
import type { z } from 'zod';

import { ZodValidationPipe } from '~/libs/pipes/pipes.js';

export const ValidatedBody = (schema: z.ZodType): ParameterDecorator =>
  Body(new ZodValidationPipe(schema));
