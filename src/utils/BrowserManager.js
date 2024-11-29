/**
 * @file BrowserManager.js
 *
 * @version 0.0.1
 *
 * @summary
 *
 * @description This file is responsible for
 *
 * @requires playwright-extra
 *
 * @exports BrowserManager
 */

const { chromium } = require("playwright-extra");
const PageManager = require("./ConfigurationManager");

class BrowserManager {
	/**
	 * @function launchBrowser
	 *
	 * @summary
	 *
	 * @description Function is responsible for
	 *
	 * @returns type - description
	 */
	static async launchBrowser({ chromeExecutable, chromeProfilePath }) {
		console.log("Launching ${chromeExecutable} Browser...");
		return await chromium.launchPersistentContext(chromeProfilePath, {
			headless: false,
			executablePath: chromeExecutable,
			viewport: { width: 1232, height: 1040 },
			args: [
				"--no-sandbox",
				"--disable-webrtc",
				"--disable-infobars",
				"--disable-web-security",
				"--disable-setuid-sandbox",
				"--disable-blink-features=AutomationControlled",
			],
		});
	}
}

module.exports = BrowserManager;
