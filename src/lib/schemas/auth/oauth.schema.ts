import { z } from 'zod';

export const oauthCallBackParams = z.object({
	code: z.string(),
	state: z.string()
});
