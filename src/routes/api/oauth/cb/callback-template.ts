import { oauthCallBackParams } from '$lib/schemas/auth/oauth.schema';
import { auth } from '$lib/server/lucia';
import type { OAuthProvider } from '@lucia-auth/oauth';
import { redirect, type RequestHandler } from '@sveltejs/kit';
import type { Auth } from 'lucia-auth';

export function authCallbackTemplate<T extends OAuthProvider<any>>(provider: T) {
	const GET: RequestHandler = async ({ cookies, url, locals }) => {
		// get code and state params from url
		const { code, state } = oauthCallBackParams.parse({
			code: url.searchParams.get('code'),
			state: url.searchParams.get('state')
		});
		// get stored state from cookies
		const storedState = cookies.get('oauth_state');

		// validate state
		if (state !== storedState) throw new Response(null, { status: 401 });

		const { existingUser, providerUser, createUser } = await provider.validateCallback(code);

		const getUser = async () => {
			if (existingUser) return existingUser;
			// create a new user if the user does not exist
			return await createUser({
				// attributes
				username: providerUser.login || providerUser.email
			});
		};
		const user = await getUser();
		const session = await auth.createSession(user.userId);
		locals.auth.setSession(session);
		throw redirect(302, '/');
	};
	return GET;
}
