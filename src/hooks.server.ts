import { env } from '$env/dynamic/public';
import routes, { isRoutePrivate } from '$lib/configs/routes';
import { redirect, type Handle } from '@sveltejs/kit';
import { StatusCodes } from 'http-status-codes';
import PocketBase from 'pocketbase';

export const handle = (async ({ event, resolve }) => {
	const pb = new PocketBase(env.PUBLIC_POCKETBASE_URL);
	pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
	event.locals.pb = pb;
	const response = await resolve(event);

	if (!pb.authStore.isValid && isRoutePrivate(event.url.pathname)) {
		throw redirect(StatusCodes.TEMPORARY_REDIRECT, routes.user.login);
	}
	response.headers.set('set-cookie', pb.authStore.exportToCookie({ secure: false }));
	return response;
}) satisfies Handle;
