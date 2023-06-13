import type { Actions } from './$types';

export const actions = {
	default: async (event) => {
		event.locals.pb.authStore.clear();
	}
} satisfies Actions;
