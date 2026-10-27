export const pluralize = (count: number, word: string, plural = `${word}s`): string =>
  `${count} ${count === 1 ? word : plural}`;
