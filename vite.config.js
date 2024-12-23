/**
 * @module vite.config
 *
 * @summary Defines a Vite configuration to use hot module loading
 *
 * @description Configuration that uses `defineConfig` function from Vite to
 * ensure better typing support and IntelliSense in IDEs.
 *
 * @requires vite
 * @requires @vitejs/plugin-react
 *
 * @see https://vitejs.dev/config/
 *
 * @requires vite -
 * @requires vite-plugin-svgr -
 * @requires vite-plugin-eslint -
 * @requires @vitejs/plugin-react -
 *
 * @exports defineConfig
 */

import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import eslint from "vite-plugin-eslint";
import react from "@vitejs/plugin-react";

export default defineConfig({
	root: "./",
	base: "/",
	server: {
		host: true,
		port: 4000,
		strictPort: true,
		open: true,
		proxy: {
			"/api": {
				target: "http://localhost:5000",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
	build: {
		outDir: "../dist",
		assetsDir: "assets",
		minify: "esbuild",
		sourcemap: true,
		cssCodeSplit: true,
		rollupOptions: {
			output: {
				entryFileNames: "assets/[name].[hash].js",
				chunkFileNames: "assets/[name].[hash].js",
				assetFileNames: "assets/[name].[hash].[ext]",
			},
		},
	},
	resolve: {
		alias: {
			"@": "/src",
			components: "/src/components",
			utils: "/src/utils",
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import './src/styles/variables.scss';`,
			},
		},
	},
	plugins: [react(), eslint(), svgr()],
});
