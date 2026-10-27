export const countFormErrors = (errors: unknown): number => {
  if (!errors || typeof errors !== 'object') {
    return 0;
  }

  if ('message' in errors && typeof errors.message === 'string' && errors.message) {
    return 1;
  }

  return Object.entries(errors).reduce(
    (total, [key, value]) => (key === 'ref' ? total : total + countFormErrors(value)),
    0,
  );
};
