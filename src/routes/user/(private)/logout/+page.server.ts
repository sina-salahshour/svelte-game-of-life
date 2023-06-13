import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { StatusCodes } from 'http-status-codes';
import routes from '$lib/configs/routes';

export const load = (async ({ locals }) => {
	locals.pb.authStore.clear();
	throw redirect(StatusCodes.TEMPORARY_REDIRECT, routes.user.login);
}) satisfies PageServerLoad;
