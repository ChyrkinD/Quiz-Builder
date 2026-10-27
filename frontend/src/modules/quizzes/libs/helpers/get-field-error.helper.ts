import type { FieldError } from 'react-hook-form';

type FieldErrorWithRoot = FieldError & { root?: FieldError };

export const getErrorAt = (errors: unknown, path: string): unknown =>
  path.split('.').reduce<unknown>((node, key) => {
    if (!node || typeof node !== 'object') {
      return undefined;
    }

    return (node as Record<string, unknown>)[key];
  }, errors);

export const getFieldError = (errors: unknown, path: string): string | undefined => {
  const error = getErrorAt(errors, path) as FieldErrorWithRoot | undefined;

  return error?.message ?? error?.root?.message;
};
