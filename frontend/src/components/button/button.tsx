import Link from 'next/link';
import type { FC, ReactNode } from 'react';

import { Icon } from '~/components/icon/icon';
import { ButtonType, ButtonVariant, ComponentSize, type IconName } from '~/libs/enums/enums';
import { getValidClasses } from '~/libs/helpers/helpers';
import { componentSizeToIconClasses } from '~/libs/maps/maps';

import { buttonSizeToClasses, buttonVariantToClasses } from './libs/maps';

type Properties = {
  children: ReactNode;
  className?: string | undefined;
  href?: string | undefined;
  iconName?: IconName | undefined;
  isDisabled?: boolean | undefined;
  size?: ComponentSize | undefined;
  type?: ButtonType | undefined;
  variant?: ButtonVariant | undefined;
  onClick?: (() => void) | undefined;
};

const BASE_CLASSES =
  'inline-flex items-center justify-center gap-2 border-2 font-bold whitespace-nowrap transition-[transform,box-shadow,background-color,border-color,color,filter] duration-100 select-none focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-45 disabled:shadow-none';

const Button: FC<Properties> = ({
  children,
  className,
  href,
  iconName,
  isDisabled = false,
  size = ComponentSize.MD,
  type = ButtonType.BUTTON,
  variant = ButtonVariant.PRIMARY,
  onClick,
}) => {
  const classes = getValidClasses(
    BASE_CLASSES,
    buttonSizeToClasses[size],
    buttonVariantToClasses[variant],
    className,
  );
  const content = (
    <>
      {iconName && <Icon className={componentSizeToIconClasses[size]} iconName={iconName} />}
      {children}
    </>
  );

  if (href) {
    return (
      <Link className={classes} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={isDisabled} type={type} onClick={onClick}>
      {content}
    </button>
  );
};

export { Button };
