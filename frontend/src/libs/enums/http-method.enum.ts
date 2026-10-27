import type { ValueOf } from '~/libs/types/types';

export const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
} as const;

export type HttpMethod = ValueOf<typeof HttpMethod>;
