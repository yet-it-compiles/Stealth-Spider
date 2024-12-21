/**
 * @module prettierrc.config
 *
 * @summary Prettier Configuration
 *
 * @description This file  the projects formatting style and standards using
 * prettier.
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
