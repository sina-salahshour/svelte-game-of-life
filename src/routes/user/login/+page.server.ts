import { redirect, type Actions } from '@sveltejs/kit';
import type { Record, RecordAuthResponse } from 'pocketbase';
import type { PageServerLoad } from './$types';
import { StatusCodes } from 'http-status-codes';
import { DependKeys } from '$lib/configs/depend-keys';
import routes from '$lib/configs/routes';

import { superValidate } from 'sveltekit-superforms/server';
import passwordLoginSchema from '$lib/schemas/login/password-login.schema';

export const actions = {
	default: async (event) => {
		const authRsp = (await event.request.json()) as RecordAuthResponse<Record>;
		event.locals.pb.authStore.save(authRsp.token, authRsp.record);
	}
} satisfies Actions;

export const load = (async ({ locals, depends }) => {
	depends(DependKeys.AUTH);
	const form = await superValidate(passwordLoginSchema);
	if (locals.pb.authStore.isValid)
		throw redirect(StatusCodes.TEMPORARY_REDIRECT, routes.user.index);
	return { form };
}) satisfies PageServerLoad;
