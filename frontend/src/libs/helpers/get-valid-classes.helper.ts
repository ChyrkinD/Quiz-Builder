import { twMerge } from 'tailwind-merge';

type ClassValue = string | false | null | undefined;

export const getValidClasses = (...classes: ClassValue[]): string =>
  twMerge(classes.filter(Boolean).join(' '));
