import { configSchema } from '$lib/schemas/config.schema';

export function getEnvs() {
	return configSchema.parse(process.env);
}
