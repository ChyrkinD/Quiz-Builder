import { quizIdSchema } from '~/modules/quizzes/libs/validation-schemas/validation-schemas.js';
import { ValidatedParam } from '~/libs/decorators/decorators.js';

export const QuizIdParam = (): ParameterDecorator => ValidatedParam('id', quizIdSchema);
