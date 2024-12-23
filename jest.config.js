/** @type {import('jest').Config} */
export default {
	// Jest configuration remains the same
	clearMocks: true,
	collectCoverage: true,
	collectCoverageFrom: [
		"src/**/*.{js,jsx,ts,tsx}",
		"!src/**/*.d.ts",
		"!src/index.{js,ts}",
		"!src/reportWebVitals.{js,ts}",
		"!src/**/*.config.{js,ts}",
	],
	coverageDirectory: "coverage",
	coverageReporters: ["text", "lcov", "json", "html"],
	coverageProvider: "v8",
	testEnvironment: "jsdom",
	testMatch: [
		"**/__tests__/**/*.[jt]s?(x)",
		"**/?(*.)+(spec|test).[jt]s?(x)",
	],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
		"\\.(css|less|scss|sass)$": "identity-obj-proxy",
		"\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
	},
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	resetMocks: true,
	restoreMocks: true,
	roots: ["<rootDir>/src"],
	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
	},
	transformIgnorePatterns: [
		"/node_modules/(?!(some-esm-package|another-esm-package)/)",
	],
	watchman: true,
	verbose: true,
};
