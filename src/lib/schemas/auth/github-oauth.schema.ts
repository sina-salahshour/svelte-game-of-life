import { z } from 'zod';

export const githubOauthCallBackParams = z.object({
	code: z.string(),
	state: z.string()
});
