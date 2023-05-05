import { z } from 'zod';

export const usernameAuthSchema = z.object({
	username: z.string().nonempty(),
	password: z.string().nonempty()
});
