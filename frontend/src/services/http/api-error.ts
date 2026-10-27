import type { ApiErrorIssue, ApiErrorResponse } from '~/libs/types/types';

export class ApiError extends Error {
  readonly status: number;
  readonly issues: ApiErrorIssue[];

  constructor(status: number, body: Partial<ApiErrorResponse> | null) {
    const message = Array.isArray(body?.message) ? body.message.join(', ') : body?.message;

    super(message ?? `Request failed with status ${status}`);
    this.name = 'ApiError';
    this.status = status;
    this.issues = body?.issues ?? [];
  }
}
