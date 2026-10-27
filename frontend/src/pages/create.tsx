import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { type FieldPath, FormProvider, useFieldArray, useForm } from 'react-hook-form';

import { QuestionType } from '~/modules/quizzes/libs/enums/enums';
import { QUIZ_LIMITS } from '~/modules/quizzes/libs/constants/constants';
import { createQuizSchema } from '~/modules/quizzes/libs/validation-schemas/validation-schemas';
import type { CreateQuizPayload } from '~/modules/quizzes/libs/types/types';
import { Badge, Button, Icon, TextField, useToast } from '~/components/components';
import {
  AppRoute,
  ButtonType,
  ButtonVariant,
  getQuizRoute,
  IconName,
  ToastType,
} from '~/libs/enums/enums';
import { pluralize } from '~/libs/helpers/helpers';
import { QuestionEditorCard } from '~/modules/quizzes/components/components';
import {
  countFormErrors,
  createDefaultQuestion,
  getFieldError,
} from '~/modules/quizzes/libs/helpers/helpers';
import { ApiError } from '~/services/http/http';
import { quizzesService } from '~/services/quizzes/quizzes';

const DEFAULT_VALUES: CreateQuizPayload = {
  title: '',
  questions: [createDefaultQuestion(QuestionType.BOOLEAN)],
};

const CreateQuizPage = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const form = useForm<CreateQuizPayload>({
    resolver: zodResolver(createQuizSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const {
    control,
    formState: { errors, isSubmitting, submitCount },
    getValues,
    handleSubmit,
    register,
    setError,
  } = form;
  const { fields, append, remove, update } = useFieldArray({ control, name: 'questions' });
  const errorCount = submitCount > 0 ? countFormErrors(errors) : 0;
  const questionsError = getFieldError(errors, 'questions');

  const handleTypeChange = (index: number, type: QuestionType) => {
    update(index, createDefaultQuestion(type, getValues(`questions.${index}.text`)));
  };

  const onSubmit = async (payload: CreateQuizPayload) => {
    try {
      const quiz = await quizzesService.create(payload);
      showToast({ type: ToastType.SUCCESS, message: 'Quiz created' });
      await router.push(getQuizRoute(quiz.id));
    } catch (error) {
      const issues = error instanceof ApiError ? error.issues : [];

      for (const issue of issues.filter((item) => item.path)) {
        setError(issue.path as FieldPath<CreateQuizPayload>, {
          type: 'server',
          message: issue.message,
        });
      }

      const rootIssues = issues.filter((item) => !item.path);

      if (issues.length > 0 && rootIssues.length === 0) {
        return;
      }

      showToast({
        type: ToastType.ERROR,
        message:
          rootIssues.map((issue) => issue.message).join(' ') ||
          'Could not save the quiz. Try again.',
      });
    }
  };

  return (
    <>
      <Head>
        <title>Create quiz | Quiz Builder</title>
      </Head>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold sm:text-[32px] sm:leading-10">Create quiz</h1>
        <p className="text-base text-text-muted">Give it a title and add at least one question.</p>
      </div>

      <FormProvider {...form}>
        <form
          noValidate
          className="flex flex-col gap-4 sm:gap-6"
          onSubmit={(event) => void handleSubmit(onSubmit)(event)}
        >
          {errorCount > 0 && (
            <p
              className="flex items-center gap-2.5 rounded-md border border-danger bg-danger-soft px-4 py-3 text-sm font-bold text-danger-strong"
              role="alert"
            >
              <Icon className="text-danger" iconName={IconName.ALERT} />
              Fix {pluralize(errorCount, 'error')} before saving the quiz.
            </p>
          )}

          <section className="rounded-xl border-2 border-border bg-surface p-5 shadow-card sm:p-6">
            <TextField
              autoComplete="off"
              error={errors.title?.message}
              helper={`Up to ${QUIZ_LIMITS.titleMaxLength} characters`}
              label="Quiz title"
              placeholder="e.g. JavaScript Basics"
              {...register('title')}
            />
          </section>

          <section aria-labelledby="questions-heading" className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <h2
                className="text-lg font-bold sm:text-2xl sm:font-extrabold"
                id="questions-heading"
              >
                Questions
              </h2>
              <Badge>{pluralize(fields.length, 'question')}</Badge>
            </div>
            {questionsError && (
              <p className="text-sm text-danger" role="alert">
                {questionsError}
              </p>
            )}
            <ol className="flex flex-col gap-4">
              {fields.map((field, index) => (
                <li key={field.id}>
                  <QuestionEditorCard
                    index={index}
                    isRemoveDisabled={fields.length <= 1}
                    onRemove={() => remove(index)}
                    onTypeChange={(type) => handleTypeChange(index, type)}
                  />
                </li>
              ))}
            </ol>
            <Button
              className="w-full border-dashed"
              iconName={IconName.PLUS}
              isDisabled={fields.length >= QUIZ_LIMITS.maxQuestions}
              variant={ButtonVariant.SECONDARY}
              onClick={() => append(createDefaultQuestion(QuestionType.BOOLEAN))}
            >
              Add question
            </Button>
          </section>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row-reverse sm:justify-start">
            <Button iconName={IconName.CHECK} isDisabled={isSubmitting} type={ButtonType.SUBMIT}>
              {isSubmitting ? 'Saving…' : 'Save quiz'}
            </Button>
            <Button href={AppRoute.QUIZZES} variant={ButtonVariant.GHOST}>
              Cancel
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default CreateQuizPage;
