import type { HttpMethod } from '~/libs/enums/enums';

export type RequestOptions = {
  method?: HttpMethod;
  body?: unknown;
  signal?: AbortSignal | undefined;
};
