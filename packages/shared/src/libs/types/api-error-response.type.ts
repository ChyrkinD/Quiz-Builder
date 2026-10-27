export interface ApiErrorIssue {
  path: string;
  message: string;
}

export interface ApiErrorResponse {
  statusCode: number;
  error: string;
  message: string | string[];
  issues?: ApiErrorIssue[];
}
