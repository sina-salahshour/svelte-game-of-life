import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { Record, RecordAuthResponse } from 'pocketbase';
import type { PageServerLoad } from './$types';
import { StatusCodes } from 'http-status-codes';
import { DependKeys } from '$lib/configs/depend-keys';
import routes from '$lib/configs/routes';

import { setError, superValidate } from 'sveltekit-superforms/server';
import passwordLoginSchema from '$lib/schemas/login/password-login.schema';

export const actions = {
	oauth_login: async (event) => {
		const authRsp = (await event.request.json()) as RecordAuthResponse<Record>;
		event.locals.pb.authStore.save(authRsp.token, authRsp.record);
	},
	password_login: async ({ request, locals }) => {
		const form = await superValidate(request, passwordLoginSchema);
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			await locals.pb.collection('users').authWithPassword(form.data.email, form.data.password);
		} catch (err) {
			console.error(err);
			return setError(form, 'password', 'invalid email or password');
		}
		throw redirect(StatusCodes.TEMPORARY_REDIRECT, routes.user.index);
	}
} satisfies Actions;

export const load = (async ({ locals, depends }) => {
	depends(DependKeys.AUTH);
	const form = await superValidate(passwordLoginSchema);
	if (locals.pb.authStore.isValid)
		throw redirect(StatusCodes.TEMPORARY_REDIRECT, routes.user.index);
	return { form };
}) satisfies PageServerLoad;
