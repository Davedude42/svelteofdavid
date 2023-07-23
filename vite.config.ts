import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { socketLights } from './socketLights.ts';

export default defineConfig({
	plugins: [sveltekit(), socketLights],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
