import { type FC, type InputHTMLAttributes, type Ref, useId } from 'react';

import { Icon } from '~/components/icon/icon';
import { IconName } from '~/libs/enums/enums';
import { getValidClasses } from '~/libs/helpers/helpers';

type Properties = Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'id'> & {
  className?: string | undefined;
  error?: string | undefined;
  helper?: string | undefined;
  isLabelHidden?: boolean | undefined;
  label: string;
  ref?: Ref<HTMLInputElement> | undefined;
};

const TextField: FC<Properties> = ({
  className,
  error,
  helper,
  isLabelHidden = false,
  label,
  ref,
  type = 'text',
  ...inputProps
}) => {
  const id = useId();
  const messageId = `${id}-message`;
  const message = error ?? helper;

  return (
    <div className={getValidClasses('flex flex-col gap-1.5', className)}>
      <label
        className={getValidClasses('text-sm font-bold text-text', isLabelHidden && 'sr-only')}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        aria-describedby={message ? messageId : undefined}
        aria-invalid={error ? true : undefined}
        className={getValidClasses(
          'w-full rounded-md border-2 bg-surface px-3.5 py-2.5 text-base text-text transition-[border-color,box-shadow] outline-none placeholder:text-text-muted focus:ring-4',
          error
            ? 'border-danger focus:ring-danger-soft'
            : 'border-border-strong focus:border-primary focus:ring-primary-soft',
        )}
        id={id}
        ref={ref}
        type={type}
        {...inputProps}
      />
      {message && (
        <p
          className={getValidClasses(
            'flex items-center gap-1.5 text-sm',
            error ? 'text-danger' : 'text-text-muted',
          )}
          id={messageId}
        >
          {error && <Icon className="size-4" iconName={IconName.ALERT} />}
          {message}
        </p>
      )}
    </div>
  );
};

export { TextField };
