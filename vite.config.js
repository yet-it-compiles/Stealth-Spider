/**
 * @file vite.config.js
 *
 * @version 1.0.0
 *
 * @summary Configuration for Vite to enable modern front-end development with
 * hot module reloading, efficient builds, and plugin integration.
 *
 * @description This configuration file defines the setup for Vite, ensuring
 * compatibility with React, ESLinting standards, and type safety.
 *
 * @requires vite - Core Vite module for defining the configuration.
 * @requires vite-plugin-svgr - Vite plugin to import SVGs as React components.
 * @requires vite-plugin-eslint - Vite plugin for linting JavaScript and React.
 * @requires vitejs/plugin-react - Vite plugin enabling React optimizations .
 * React-specific optimizations.
 *
 * @see https://vitejs.dev/config/
 *
 * @exports defineConfig - The Vite configuration object exported using
 * defineConfig`.
 */

import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';
import react from '@vitejs/plugin-react';

export default defineConfig({
    root: './',
    base: '/',
    test: {
        globals: true,
        environment: 'node',
    },
    server: {
        host: true,
        port: 4000,
        strictPort: true,
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
    build: {
        outDir: '../dist',
        assetsDir: 'assets',
        minify: 'esbuild',
        sourcemap: true,
        cssCodeSplit: true,
        rollupOptions: {
            output: {
                entryFileNames: 'assets/[name].[hash].js',
                chunkFileNames: 'assets/[name].[hash].js',
                assetFileNames: 'assets/[name].[hash].[ext]',
            },
        },
    },
    resolve: {
        alias: {
            '@': '/frontend',
            'components': '/frontend/components',
            'utils': '/frontend/utils',
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @import './frontend/styles/styles.scss';
                    @import './frontend/styles/_mixins.scss';
                    @import './frontend/styles/_variables.scss';
            `,
        },
    },
},
    plugins: [
        react(),
        eslint({
            failOnError: false,
            include: ['frontend/**/*.js', 'src/**/*.jsx'],
            overrideConfigFile: './.configs/eslint.config.js',
        }),
        svgr(),
    ],
});
