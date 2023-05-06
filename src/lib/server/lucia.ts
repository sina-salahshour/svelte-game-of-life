import lucia from 'lucia-auth';
import { sveltekit } from 'lucia-auth/middleware';
import prisma from '@lucia-auth/adapter-prisma';
import { PrismaClient } from '@prisma/client';
import { dev } from '$app/environment';
import { github, google } from '@lucia-auth/oauth/providers';
import { getEnvs } from './env-loader';

const {
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	WEBSITE_URL,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET
} = getEnvs();

export const auth = lucia({
	adapter: prisma(new PrismaClient()),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	transformDatabaseUser: (userData) => {
		return {
			userId: userData.id,
			username: userData.username
		};
	}
});

export const githubAuth = github(auth, {
	clientId: GITHUB_CLIENT_ID,
	clientSecret: GITHUB_CLIENT_SECRET
});
export const googleAuth = google(auth, {
	clientId: GOOGLE_CLIENT_ID,
	clientSecret: GOOGLE_CLIENT_SECRET,
	redirectUri: `${WEBSITE_URL}/api/oauth/google/cb`
});
export type Auth = typeof auth;
