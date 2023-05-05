// routes/api/oauth/github/+server.ts
import { auth, githubAuth } from '$lib/server/lucia';
import { redirect } from '@sveltejs/kit';

import type { RequestHandler } from './$types';
import { githubOauthCallBackParams } from '$lib/schemas/auth/github-oauth.schema';

export const GET: RequestHandler = async ({ cookies, url, locals }) => {
	// get code and state params from url
	const { code, state } = githubOauthCallBackParams.parse({
		code: url.searchParams.get('code'),
		state: url.searchParams.get('state')
	});
	// get stored state from cookies
	const storedState = cookies.get('github_oauth_state');

	// validate state
	if (state !== storedState) throw new Response(null, { status: 401 });

	try {
		const { existingUser, providerUser, createUser } = await githubAuth.validateCallback(code);

		const getUser = async () => {
			if (existingUser) return existingUser;
			// create a new user if the user does not exist
			return await createUser({
				// attributes
				username: providerUser.login
			});
		};
		const user = await getUser();
		const session = await auth.createSession(user.userId);
		locals.auth.setSession(session);
	} catch (e) {
		// invalid code
		return new Response(null, {
			status: 500
		});
	}
	throw redirect(302, '/');
};
