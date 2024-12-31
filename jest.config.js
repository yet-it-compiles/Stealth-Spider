/**
 * @file jest.config.js
 *
 * @summary Jest Configuration File For Unit Testing
 *
 * @description Defines the unit and integration configuration for the project
 * ensuring consistent mock handling, coverage collection and mappings.
 *
 * @version 0.1.0
 *
 * @exports jest.config
 */

export default {
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!src/**/*.d.ts',
        '!src/index.{js}',
        '!src/reportWebVitals.{js,jsx}',
        '!src/**/*.config.{js,jsx}',
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
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    resetMocks: true,
    restoreMocks: true,
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(some-esm-package|another-esm-package)/)',
    ],
    watchman: true,
    verbose: true,
};
