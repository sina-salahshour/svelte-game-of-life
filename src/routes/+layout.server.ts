import { DependKeys } from '$lib/configs/depend-keys';
import type { LayoutServerLoad } from './$types';

export const load = (({ locals, depends }) => {
	depends(DependKeys.AUTH);
	const user = locals.pb.authStore.model;
	return { user: structuredClone(user) as typeof user };
}) satisfies LayoutServerLoad;
