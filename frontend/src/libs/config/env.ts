import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url(),
});

const result = envSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

if (!result.success) {
  throw new Error(
    `Invalid frontend environment variables (see frontend/.env.example):\n${z.prettifyError(result.error)}`,
  );
}

export const env = result.data;
