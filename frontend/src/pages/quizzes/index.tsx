import Head from 'next/head';
import { useEffect, useState } from 'react';

import type { QuizSummary } from '~/modules/quizzes/libs/types/types';
import { Button, ConfirmDialog, EmptyState, useToast } from '~/components/components';
import {
  AppRoute,
  ButtonVariant,
  ColorTone,
  DataStatus,
  IconName,
  ToastType,
} from '~/libs/enums/enums';
import { pluralize } from '~/libs/helpers/helpers';
import { QuizCard, QuizCardSkeleton } from '~/modules/quizzes/components/components';
import { quizzesService } from '~/services/quizzes/quizzes';

const SKELETON_COUNT = 3;

const QuizzesPage = () => {
  const { showToast } = useToast();
  const [quizzes, setQuizzes] = useState<QuizSummary[]>([]);
  const [status, setStatus] = useState<DataStatus>(DataStatus.LOADING);
  const [reloadKey, setReloadKey] = useState(0);
  const [quizToDelete, setQuizToDelete] = useState<QuizSummary | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    quizzesService
      .getAll(controller.signal)
      .then((data) => {
        setQuizzes(data);
        setStatus(DataStatus.SUCCESS);
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setStatus(DataStatus.ERROR);
        }
      });

    return () => controller.abort();
  }, [reloadKey]);

  const handleRetry = () => {
    setStatus(DataStatus.LOADING);
    setReloadKey((key) => key + 1);
  };

  const handleConfirmDelete = async () => {
    if (!quizToDelete) {
      return;
    }

    setIsDeleting(true);

    try {
      await quizzesService.remove(quizToDelete.id);
      setQuizzes((current) => current.filter((quiz) => quiz.id !== quizToDelete.id));
      showToast({ type: ToastType.SUCCESS, message: `"${quizToDelete.title}" deleted` });
      setQuizToDelete(null);
    } catch {
      showToast({ type: ToastType.ERROR, message: 'Could not delete the quiz. Try again.' });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Head>
        <title>My quizzes | Quiz Builder</title>
      </Head>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold sm:text-[32px] sm:leading-10">My quizzes</h1>
        {status === DataStatus.SUCCESS && (
          <p className="text-base text-text-muted">
            {quizzes.length === 0
              ? 'No quizzes yet'
              : `${pluralize(quizzes.length, 'quiz', 'quizzes')} · click a quiz to see its questions`}
          </p>
        )}
      </div>

      {status === DataStatus.LOADING && (
        <div aria-busy="true" aria-label="Loading quizzes" className="flex flex-col gap-4">
          {Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <QuizCardSkeleton key={index} />
          ))}
        </div>
      )}

      {status === DataStatus.ERROR && (
        <EmptyState
          action={
            <Button variant={ButtonVariant.SECONDARY} onClick={handleRetry}>
              Try again
            </Button>
          }
          description="Check that the API is running and try again."
          iconName={IconName.ALERT}
          title="Could not load quizzes"
          tone={ColorTone.DANGER}
        />
      )}

      {status === DataStatus.SUCCESS && quizzes.length === 0 && (
        <EmptyState
          action={
            <Button href={AppRoute.CREATE_QUIZ} iconName={IconName.PLUS}>
              Create quiz
            </Button>
          }
          description="Create your first quiz with True/False, short answer and multiple choice questions."
          iconName={IconName.CLIPBOARD}
          title="No quizzes yet"
        />
      )}

      {status === DataStatus.SUCCESS && quizzes.length > 0 && (
        <ul className="flex flex-col gap-4">
          {quizzes.map((quiz) => (
            <li key={quiz.id}>
              <QuizCard quiz={quiz} onDelete={setQuizToDelete} />
            </li>
          ))}
        </ul>
      )}

      <ConfirmDialog
        confirmLabel="Delete"
        description={
          quizToDelete
            ? `"${quizToDelete.title}" and its ${pluralize(quizToDelete.questionCount, 'question')} will be deleted. This cannot be undone.`
            : ''
        }
        isOpen={quizToDelete !== null}
        isPending={isDeleting}
        title="Delete quiz?"
        onCancel={() => setQuizToDelete(null)}
        onConfirm={() => void handleConfirmDelete()}
      />
    </>
  );
};

export default QuizzesPage;
