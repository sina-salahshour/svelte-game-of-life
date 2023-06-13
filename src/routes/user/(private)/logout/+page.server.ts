import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { StatusCodes } from 'http-status-codes';
import routes from '$lib/configs/routes';

export const actions = {
	default: async (event) => {
		event.locals.pb.authStore.clear();
		throw redirect(StatusCodes.TEMPORARY_REDIRECT, routes.user.login);
	}
} satisfies Actions;
