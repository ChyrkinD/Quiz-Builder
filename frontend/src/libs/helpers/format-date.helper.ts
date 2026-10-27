const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export const formatDate = (isoDate: string): string => dateFormatter.format(new Date(isoDate));
