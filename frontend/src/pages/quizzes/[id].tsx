import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import type { QuizDetail } from '~/modules/quizzes/libs/types/types';
import { Badge, Button, EmptyState, Icon, Skeleton } from '~/components/components';
import {
  AppRoute,
  ButtonVariant,
  ColorTone,
  ComponentSize,
  DataStatus,
  IconName,
} from '~/libs/enums/enums';
import { formatDate, pluralize } from '~/libs/helpers/helpers';
import { QuestionViewCard } from '~/modules/quizzes/components/components';
import { ApiError } from '~/services/http/http';
import { quizzesService } from '~/services/quizzes/quizzes';

type State = { id: string | null } & (
  | { status: typeof DataStatus.LOADING }
  | { status: typeof DataStatus.NOT_FOUND }
  | { status: typeof DataStatus.ERROR }
  | { status: typeof DataStatus.SUCCESS; quiz: QuizDetail }
);

const HTTP_NOT_FOUND = [400, 404];

const QuizDetailPage = () => {
  const router = useRouter();
  const id = typeof router.query['id'] === 'string' ? router.query['id'] : null;
  const [fetched, setFetched] = useState<State>({ id: null, status: DataStatus.LOADING });
  const [reloadKey, setReloadKey] = useState(0);
  const state: State = fetched.id === id ? fetched : { id, status: DataStatus.LOADING };

  useEffect(() => {
    if (!id) {
      return;
    }

    const controller = new AbortController();

    quizzesService
      .getById(id, controller.signal)
      .then((quiz) => setFetched({ id, status: DataStatus.SUCCESS, quiz }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) {
          return;
        }

        const isNotFound = error instanceof ApiError && HTTP_NOT_FOUND.includes(error.status);
        setFetched({ id, status: isNotFound ? DataStatus.NOT_FOUND : DataStatus.ERROR });
      });

    return () => controller.abort();
  }, [id, reloadKey]);

  const backLink = (
    <Button
      className="self-start pl-0 hover:bg-transparent hover:underline"
      href={AppRoute.QUIZZES}
      iconName={IconName.ARROW_LEFT}
      size={ComponentSize.SM}
      variant={ButtonVariant.GHOST}
    >
      Back to quizzes
    </Button>
  );

  if (state.status === DataStatus.NOT_FOUND) {
    return (
      <>
        <Head>
          <title>Quiz not found | Quiz Builder</title>
        </Head>
        <EmptyState
          action={
            <Button href={AppRoute.QUIZZES} iconName={IconName.ARROW_LEFT}>
              Back to quizzes
            </Button>
          }
          description="This quiz may have been deleted, or the link is wrong."
          iconName={IconName.ALERT}
          title="Quiz not found"
          tone={ColorTone.DANGER}
        />
      </>
    );
  }

  if (state.status === DataStatus.ERROR) {
    return (
      <>
        {backLink}
        <EmptyState
          action={
            <Button
              variant={ButtonVariant.SECONDARY}
              onClick={() => {
                setFetched({ id, status: DataStatus.LOADING });
                setReloadKey((key) => key + 1);
              }}
            >
              Try again
            </Button>
          }
          description="Check that the API is running and try again."
          iconName={IconName.ALERT}
          title="Could not load the quiz"
          tone={ColorTone.DANGER}
        />
      </>
    );
  }

  if (state.status === DataStatus.LOADING) {
    return (
      <div aria-busy="true" aria-label="Loading quiz" className="flex flex-col gap-4 sm:gap-6">
        {backLink}
        <Skeleton className="h-8 w-2/3 max-w-80" />
        <Skeleton className="h-5 w-48" />
        {[0, 1].map((index) => (
          <Skeleton key={index} className="h-44 rounded-xl" />
        ))}
      </div>
    );
  }

  const { quiz } = state;

  return (
    <>
      <Head>
        <title>{`${quiz.title} | Quiz Builder`}</title>
      </Head>
      {backLink}
      <div className="flex flex-col gap-2.5">
        <h1 className="text-2xl font-extrabold wrap-break-word sm:text-[32px] sm:leading-10">
          {quiz.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <Badge>{pluralize(quiz.questions.length, 'question')}</Badge>
          <span className="flex items-center gap-1.5 text-sm text-text-muted">
            <Icon className="size-3.5" iconName={IconName.CALENDAR} />
            Created <time dateTime={quiz.createdAt}>{formatDate(quiz.createdAt)}</time>
          </span>
        </div>
      </div>
      <ol className="flex flex-col gap-4">
        {quiz.questions.map((question, index) => (
          <li key={question.id}>
            <QuestionViewCard number={index + 1} question={question} />
          </li>
        ))}
      </ol>
    </>
  );
};

export default QuizDetailPage;
