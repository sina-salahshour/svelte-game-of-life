import type { OAuthProvider } from '@lucia-auth/oauth';
import type { RequestHandler } from '@sveltejs/kit';

import type { Auth } from 'lucia-auth';

export function oauthTemplate<T extends OAuthProvider<any>>(provider: T) {
	const GET: RequestHandler = async ({ cookies }) => {
		// get url to redirect the user to, with the state
		const [url, state] = await provider.getAuthorizationUrl();

		// the state can be stored in cookies or local storage for request validation on callback
		cookies.set('oauth_state', state, {
			path: '/',
			maxAge: 60 * 60
		});

		// redirect to authorization url
		return new Response(null, {
			status: 302,
			headers: {
				location: url.toString()
			}
		});
	};
	return GET;
}
