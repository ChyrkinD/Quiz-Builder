import type { FC } from 'react';

import { Skeleton } from '~/components/components';

const QuizCardSkeleton: FC = () => (
  <div className="flex items-center gap-3 rounded-xl border-2 border-border bg-surface p-4 sm:gap-4 sm:p-5 sm:pr-4">
    <Skeleton className="size-11 rounded-lg sm:size-14" />
    <div className="flex flex-1 flex-col gap-2.5">
      <Skeleton className="h-[18px] w-3/5 max-w-60" />
      <Skeleton className="h-3.5 w-2/5 max-w-40" />
    </div>
    <Skeleton className="size-10 rounded-md" />
  </div>
);

export { QuizCardSkeleton };
