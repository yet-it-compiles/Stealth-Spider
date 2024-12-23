/**
 * @file jest.setup.js
 *
 * @summary Jest Testing Setup
 *
 * @description
 *
 * @requires @testing-library/jest-dom - Provides custom match DOM nodes
 *
 * @see {@link https://testing-library.com/docs/dom-testing-library/api-queries/
 * DOM Testing Library Documentation}
 * @see {@link https://jestjs.io/docs/mock-function-api Jest Mock Function API}
 */

import "@testing-library/jest-dom";
import { jest, afterEach } from "@jest/globals";

if (!globalThis.fetch) {
	globalThis.fetch = jest.fn(() =>
		Promise.resolve({
			json: () => Promise.resolve({}),
		}),
	);
}

afterEach(() => {
	jest.clearAllMocks();
});
