import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    base: './',
    build: {
        rollupOptions: {
            input: resolve(__dirname, 'index.html'),
            input: resolve(__dirname, 'landing.html'),
            input: resolve(__dirname, 'dashboard.html'),
            input: resolve(__dirname, 'login.html'),
            input: resolve(__dirname, 'register.html'),
        },
    },
});