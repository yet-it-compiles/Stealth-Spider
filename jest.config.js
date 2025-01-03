/**
 * @file jest.config.js
 *
 * @version 0.1.0
 *
 * @summary Jest Configuration File For Unit Testing
 *
 * @description Defines the unit and integration configuration for the project
 * ensuring consistent mock handling, coverage collection and mappings.
 *
 * @exports jest.config
 */
export default {
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: [
        'frontend/**/*.{js,jsx}',
        '!frontend/index.js',
        '!frontend/reportWebVitals.js',
        '!frontend/**/*.config.js',
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'json', 'html'],
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    testMatch: [
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/frontend/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    resetMocks: true,
    restoreMocks: true,
    roots: ['<rootDir>/frontend', '<rootDir>/backend'],
    transform: {
        '^.+\\.jsx?$': 'esbuild-jest',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(some-esm-package|another-esm-package)/)',
    ],
    watchman: true,
    verbose: true,
};
