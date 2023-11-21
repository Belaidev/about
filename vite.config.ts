import solid from 'solid-start/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	// @note Temporarily disabled SSR due to bugs
	plugins: [solid({ ssr: false })]
});
