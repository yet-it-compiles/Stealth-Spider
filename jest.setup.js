/**
 * @file jest.setup.js
 *
 * @version 1.0.0
 *
 * @summary Jest Testing Setup for a React + Playwright Project
 *
 * @description Centralized setup for Jest testing, including environment
 * initialization, mocking of Node.js core modules (`fs`, `path`), and
 * integration with React testing utilities.
 *
 * @requires fs - Node.js file system module.
 * @requires path - Node.js path module for path-related operations.
 * @requires jest/globals - Jest globals for test lifecycle management.
 *
 * @see https://jestjs.io/docs/mock-function-api Jest Mock Function API}
 *
 * @exports
 */
import '@testing-library/jest-dom';
import { jest, afterEach, beforeAll } from '@jest/globals';

if (!globalThis.fetch) {
    globalThis.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({}),
            text: () => Promise.resolve(''),
        }),
    );
}

globalThis.console = {
    ...console,
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
};

beforeAll(() => {
    console.info('[jest.setup.js] Jest environment initialized.');
});

afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
});

console.info('[jest.setup.js] Test setup completed.');
