import lucia from 'lucia-auth';
import { sveltekit } from 'lucia-auth/middleware';
import prisma from '@lucia-auth/adapter-prisma';
import { PrismaClient } from '@prisma/client';
import { dev } from '$app/environment';
import { github } from '@lucia-auth/oauth/providers';
import { getEnvs } from './env-loader';

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = getEnvs();

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
export type Auth = typeof auth;
