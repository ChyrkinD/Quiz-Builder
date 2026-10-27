import { env } from '~/libs/config/config';
import { HttpMethod } from '~/libs/enums/enums';
import type { ApiErrorResponse } from '~/libs/types/types';

import { ApiError } from './api-error';
import type { RequestOptions } from './libs/types';

const INVALID_JSON = Symbol('invalid-json');

const parseJson = async (response: Response): Promise<unknown> => {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return INVALID_JSON;
  }
};

export const request = async <T>(
  path: string,
  { method = HttpMethod.GET, body, signal }: RequestOptions = {},
): Promise<T> => {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}${path}`, {
    method,
    signal: signal ?? null,
    headers: body === undefined ? {} : { 'Content-Type': 'application/json' },
    body: body === undefined ? null : JSON.stringify(body),
  });

  const data = await parseJson(response);

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data === INVALID_JSON ? null : (data as Partial<ApiErrorResponse> | null),
    );
  }

  if (data === INVALID_JSON) {
    throw new ApiError(response.status, { message: 'Invalid response from the server' });
  }

  return data as T;
};
