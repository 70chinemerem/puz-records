import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    base: './',
    build: {
        rollupOptions: {
            // Multiple entry points for different HTML pages
            input: {
                main: resolve(__dirname, 'index.html'), // Landing page (default entry point)
                home: resolve(__dirname, 'home.html'), // Home page (secondary)
                dashboard: resolve(__dirname, 'dashboard.html'),
                login: resolve(__dirname, 'login.html'),
                register: resolve(__dirname, 'register.html'),
            },
        },
    },
});
