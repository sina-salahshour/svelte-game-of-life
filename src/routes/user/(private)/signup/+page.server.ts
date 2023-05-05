import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import type { PageServerLoad, Actions } from './$types';
import { formDataToObject } from '$lib/utils/form-data-to-object';
import { usernameAuthSchema } from '$lib/schemas/auth/username.schema';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const { username, password } = formDataToObject(await request.formData(), usernameAuthSchema);

		// check for empty values
		if (typeof username !== 'string' || typeof password !== 'string') {
			return fail(400);
		}

		try {
			const user = await auth.createUser({
				primaryKey: {
					providerId: 'username',
					providerUserId: username,
					password
				},
				attributes: {
					username
				}
			});
			const session = await auth.createSession(user.userId);
			locals.auth.setSession(session);
		} catch {
			// username already in use
			return fail(400);
		}
	}
};

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) throw redirect(302, '/');
	return {};
};
