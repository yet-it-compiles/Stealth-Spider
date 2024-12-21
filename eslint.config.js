/**
 * @module eslint.config
 *
 * @summary ESLint configuration.
 *
 * @description Defines the projects linting standards using ESlint rules
 *
 * @requires eslint-plugin-security
 * @requires eslint-plugin-prettier
 *
 * @see https://eslint.org/docs/rules/ link to ESLint documentation
 *
 * @exports {object} ESLint configuration object.
 */
import security from "eslint-plugin-security";
import prettier from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";

export default [
	{
		files: ["**/*.js"],
		ignores: ["node_modules/**", "dist/**", "*.test.js"],

		languageOptions: {
			sourceType: "module",
			globals: {
				process: "readonly",
				__dirname: "readonly",
				module: "readonly",
			},
		},

		plugins: {
			security,
			prettier,
			import: importPlugin,
		},

		rules: {
			"no-console": ["warn", { allow: ["warn", "error"] }],
			"prefer-const": "error",
			"no-unused-vars": ["warn", { args: "after-used" }],

			"import/order": [
				"error",
				{
					groups: [
						"builtin",
						"external",
						"internal",
						"parent",
						"sibling",
						"index",
					],
					"newlines-between": "always",
					alphabetize: { order: "asc", caseInsensitive: true },
				},
			],
		},
	},
];
