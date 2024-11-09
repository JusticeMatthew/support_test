import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import { vitePreprocess } from '@astrojs/svelte';
export default defineConfig({
    integrations: [svelte({
        site: 'http://127.0.0.1:5500',
        include: ['**/svelte/*'],
        // preprocess: [vitePreprocess()]
    })]
});
