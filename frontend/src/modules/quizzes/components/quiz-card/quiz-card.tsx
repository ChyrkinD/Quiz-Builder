import Link from 'next/link';
import type { FC } from 'react';

import type { QuizSummary } from '~/modules/quizzes/libs/types/types';
import { Badge, Icon, IconButton } from '~/components/components';
import { ButtonVariant, getQuizRoute, IconName } from '~/libs/enums/enums';
import { formatDate, getValidClasses, pluralize } from '~/libs/helpers/helpers';
import { getTileClasses } from '~/modules/quizzes/libs/helpers/helpers';

type Properties = {
  quiz: QuizSummary;
  onDelete: (quiz: QuizSummary) => void;
};

const QuizCard: FC<Properties> = ({ quiz, onDelete }) => (
  <article className="group relative flex items-center gap-3 rounded-xl border-2 border-border bg-surface p-4 shadow-card transition-colors focus-within:border-primary hover:border-primary sm:gap-4 sm:p-5 sm:pr-4">
    <span
      aria-hidden="true"
      className={getValidClasses(
        'flex size-11 shrink-0 items-center justify-center rounded-lg text-2xl font-extrabold sm:size-14',
        getTileClasses(quiz.id),
      )}
    >
      {quiz.title.charAt(0).toUpperCase()}
    </span>
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <h2 className="text-lg font-bold break-words text-text group-hover:text-primary-strong">
        <Link
          className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none"
          href={getQuizRoute(quiz.id)}
        >
          {quiz.title}
        </Link>
      </h2>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <Badge>{pluralize(quiz.questionCount, 'question')}</Badge>
        <span className="flex items-center gap-1.5 text-sm text-text-muted">
          <Icon className="size-3.5" iconName={IconName.CALENDAR} />
          <time dateTime={quiz.createdAt}>{formatDate(quiz.createdAt)}</time>
        </span>
      </div>
    </div>
    <IconButton
      className="relative z-10"
      iconName={IconName.TRASH}
      label={`Delete quiz "${quiz.title}"`}
      variant={ButtonVariant.DANGER}
      onClick={() => onDelete(quiz)}
    />
  </article>
);

export { QuizCard };
