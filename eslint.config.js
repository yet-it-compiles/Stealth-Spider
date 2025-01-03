/**
 * @file eslint.config.js
 *
 * @version 1.0.0
 *
 * @summary ESLint linting configuration file.
 *
 * @description Defines the code styling and file formatting configuration
 * across the projects stack using ESLint and integrated Prettier.
 *
 * @requires js - ESLint's default configuration for JavaScript.
 * @requires react - ESLint plugin for React-specific linting rules.
 * @requires globals - Provides global variables for browser environments.
 * @requires react-hooks - ESLint plugin for enforcing React Hooks rules.
 * @requires react-refresh - ESLint plugin for React Refresh during development
 *
 * @see https://vitejs.dev/ link to official vite documentation
 * @see https://eslint.org/docs/latest/ link to official eslint documentation
 *
 * @exports Object - ESLint configuration object
 */
import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';

export default {
    files: ['src/**/*.{js,jsx}'],
    ignores: ['dist/**', 'node_modules/**'],
    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.es2021,
            ...globals.browser,

        },
        parserOptions: {
            ecmaVersion: latest,
            ecmaFeatures: { jsx: true },
            sourceType: 'module',
        },
    },
    settings: {
        react: { version: 'detect' },
    },
    plugins: {
        'react': reactPlugin,
        'prettier': prettierPlugin,
        'react-hooks': reactHooksPlugin,
        'react-refresh': reactRefreshPlugin,
    },
    rules: {
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      indent: ['error', 4],
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      ...js.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooksPlugin.configs.recommended.rules,
    },
    files: ['**/*.{js,jsx,json,css,scss,md}'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  };