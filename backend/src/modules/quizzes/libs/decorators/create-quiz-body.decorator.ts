import { createQuizSchema } from '~/modules/quizzes/libs/validation-schemas/validation-schemas.js';
import { ValidatedBody } from '~/libs/decorators/decorators.js';

export const CreateQuizBody = (): ParameterDecorator => ValidatedBody(createQuizSchema);
