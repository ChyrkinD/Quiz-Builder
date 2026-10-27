import Link from 'next/link';
import type { FC } from 'react';

import { Button } from '~/components/button/button';
import { AppRoute, ButtonVariant, IconName } from '~/libs/enums/enums';

const Header: FC = () => (
  <header className="sticky top-0 z-30 border-b-2 border-border bg-surface">
    <div className="mx-auto flex h-18 max-w-248 items-center justify-between gap-4 px-4">
      <Link
        className="flex items-center gap-2.5 rounded-md focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none"
        href={AppRoute.QUIZZES}
      >
        <span
          aria-hidden="true"
          className="flex size-9 items-center justify-center rounded-md bg-primary text-2xl font-extrabold text-text-inverse shadow-[0_3px_0_var(--color-primary-strong)]"
        >
          ?
        </span>
        <span className="text-lg font-bold text-text">Quiz Builder</span>
      </Link>
      <nav aria-label="Main" className="flex items-center gap-2">
        <Button
          className="hidden sm:inline-flex"
          href={AppRoute.QUIZZES}
          variant={ButtonVariant.GHOST}
        >
          My quizzes
        </Button>
        <Button
          className="px-3.5 py-1.5 text-sm sm:px-5 sm:py-2.5 sm:text-base"
          href={AppRoute.CREATE_QUIZ}
          iconName={IconName.PLUS}
        >
          <span className="sm:hidden">Create</span>
          <span className="hidden sm:inline">Create quiz</span>
        </Button>
      </nav>
    </div>
  </header>
);

export { Header };
