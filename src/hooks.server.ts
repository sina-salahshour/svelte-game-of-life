import { env } from '$env/dynamic/public';
import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

export const handle = (async ({ event, resolve }) => {
	const pb = new PocketBase(env.PUBLIC_POCKETBASE_URL);
	pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
	event.locals.pb = pb;

	const response = await resolve(event);

	response.headers.set('set-cookie', pb.authStore.exportToCookie({ secure: false }));
	return response;
}) satisfies Handle;
