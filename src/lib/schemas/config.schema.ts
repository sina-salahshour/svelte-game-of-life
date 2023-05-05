import { z } from 'zod';

export const configSchema = z.object({
	DATABASE_URL: z.string(),
	SENTRY_DSN: z.string(),
	GITHUB_CLIENT_ID: z.string(),
	GITHUB_CLIENT_SECRET: z.string()
});
