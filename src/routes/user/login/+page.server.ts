import { error, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import type { PageServerLoad, Actions } from './$types';
import { formDataToObject } from '$lib/utils/form-data-to-object';
import { usernameAuthSchema } from '$lib/schemas/auth/username.schema';

// If the user exists, redirect authenticated users to the profile page.
export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) throw redirect(302, '/');
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const { password, username } = formDataToObject(await request.formData(), usernameAuthSchema);
		// check for empty values
		try {
			const key = await auth.useKey('username', username, password);
			const session = await auth.createSession(key.userId);
			locals.auth.setSession(session);
		} catch (err) {
			// invalid credentials
			throw error(400);
		}
	}
};
