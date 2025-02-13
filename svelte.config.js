import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { cssModules, linearPreprocess } from 'svelte-preprocess-cssmodules';
const { postcss, typescript, globalStyle } = preprocess;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: linearPreprocess([typescript(), postcss(), globalStyle(), cssModules()]),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
