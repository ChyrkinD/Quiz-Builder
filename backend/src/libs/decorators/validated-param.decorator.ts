import { Param } from '@nestjs/common';
import type { z } from 'zod';

import { ZodValidationPipe } from '~/libs/pipes/pipes.js';

export const ValidatedParam = (name: string, schema: z.ZodType): ParameterDecorator =>
  Param(name, new ZodValidationPipe(schema));
