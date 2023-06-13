import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { StatusCodes } from 'http-status-codes';
import { DependKeys } from '$lib/configs/depend-keys';
import routes from '$lib/configs/routes';

export const load = (async ({ locals, depends }) => {
	depends(DependKeys.AUTH);
	if (!locals.pb.authStore.isValid)
		throw redirect(StatusCodes.TEMPORARY_REDIRECT, routes.user.login);
}) satisfies LayoutServerLoad;
