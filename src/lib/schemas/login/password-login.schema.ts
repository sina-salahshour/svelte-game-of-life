import { z } from 'zod';

const passwordLoginSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters long')
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
			'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
		),
	remember_me: z.boolean()
});
export default passwordLoginSchema;
