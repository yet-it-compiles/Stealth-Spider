/**
 * @module prettierrc.config
 *
 * @summary Prettier Formatting Configuration
 *
 * @description Provides the projects formatting style and Node.js development
 * standards using Prettier.
 *
 * @requires prettier
 *
 * @see https://prettier.io/docs/en/options link to prettier documentation
 *
 * @exports {object} Prettier configuration object.
 */
export default {
	printWidth: 80,
	tabWidth: 4,
	useTabs: false,
	semi: true,
	singleQuote: false,
	quoteProps: "consistent",
	bracketSpacing: true,
	trailingComma: "es5",
	arrowParens: "always",
	requirePragma: false,
	insertPragma: false,
	proseWrap: "preserve",
	endOfLine: "lf",
	htmlWhitespaceSensitivity: "css",
};
