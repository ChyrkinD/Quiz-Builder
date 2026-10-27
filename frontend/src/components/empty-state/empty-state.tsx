import type { FC, ReactNode } from 'react';

import { Icon } from '~/components/icon/icon';
import { ColorTone, type IconName } from '~/libs/enums/enums';
import { getValidClasses } from '~/libs/helpers/helpers';
import { colorToneToIconTileClasses } from '~/libs/maps/maps';

type Properties = {
  action?: ReactNode;
  description: string;
  iconName: IconName;
  title: string;
  tone?: ColorTone | undefined;
};

const EmptyState: FC<Properties> = ({
  action,
  description,
  iconName,
  title,
  tone = ColorTone.PRIMARY,
}) => (
  <section className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border-strong bg-surface px-5 py-8 text-center sm:px-8 sm:py-12">
    <span
      className={getValidClasses(
        'mb-1 flex size-20 items-center justify-center rounded-xl',
        colorToneToIconTileClasses[tone],
      )}
    >
      <Icon className="size-9" iconName={iconName} />
    </span>
    <h2 className="text-2xl font-extrabold text-text">{title}</h2>
    <p className="max-w-105 text-base text-text-muted">{description}</p>
    {action && <div className="mt-2">{action}</div>}
  </section>
);

export { EmptyState };
