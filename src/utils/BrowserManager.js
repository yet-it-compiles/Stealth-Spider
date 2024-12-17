/**
 * @file BrowserManager.js
 *
 * @version 0.0.1
 *
 * @summary Manages browser operations for the application.
 *
 * @description This file defines and exports the `BrowserManager` class,
 * which provides functionality for launching a Chromium browser instance
 * with custom configurations using Playwright.
 *
 * @requires playwright-extra
 * @requires ./ConfigurationManager
 *
 * @exports BrowserManager
 */

import { chromium } from "playwright-extra";
/* @TODO const PageManager = require("./ConfigurationManager"); */

/**
 * @class BrowserManager
 *
 * @summary Provides utilities for managing browser instances.
 *
 * @description The `BrowserManager` class contains methods to launch and
 * manage Chromium browser instances with custom configurations such as
 * profiles and executable paths.
 */
export class BrowserManager {
	/**
	 * @function launchBrowser
	 *
	 * @summary Launches a Chromium browser instance.
	 *
	 * @description This method initializes a persistent Chromium browser
	 * context with the specified executable and profile path. It applies
	 * additional arguments for enhanced control over the browser environment.
	 *
	 * @param {Object} options - Configuration options for the browser launch.
	 * @param {string} options.chromeExecutable - The path to the Chromium
	 * executable to use.
	 * @param {string} options.chromeProfilePath - The path to the profile
	 * directory to use for the persistent context.
	 *
	 * @returns {Promise<import('playwright').BrowserContext>} A promise that
	 * resolves to the launched Chromium browser context.
	 */
	async launchBrowser({ chromeExecutable, chromeProfilePath }) {
		console.log("Launching ${chromeExecutable} Browser...");
		return await chromium.launchPersistentContext(chromeProfilePath, {
			headless: false,
			executablePath: chromeExecutable,
			viewport: { width: 1232, height: 1040 },
			args: [
				"--no-sandbox",
				"--disable-webrtc",
				"--disable-infobars",
				"--disable-setuid-sandbox",
				"--disable-blink-features=AutomationControlled",
			],
		});
	}
}
