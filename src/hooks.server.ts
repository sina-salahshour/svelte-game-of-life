import { auth } from '$lib/server/lucia';
import type { Handle, HandleServerError } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);
	return await resolve(event);
};

import * as Sentry from '@sentry/svelte';
import { Prisma } from '@prisma/client';
import { getEnvs } from '$lib/server/env-loader';

const { SENTRY_DSN } = getEnvs();

Sentry.init({
	dsn: SENTRY_DSN,
	integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
	// Performance Monitoring
	tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
	// Session Replay
	replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
	replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

export const handleError = (({ error, event }) => {
	Sentry.captureException(error, { extra: { event } });
	if (error instanceof Prisma.PrismaClientKnownRequestError) {
		// The .code property can be accessed in a type-safe manner
	}
	return { message: 'Internal Error' };
}) satisfies HandleServerError;
