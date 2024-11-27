/**
 * @file main.js
 *
 * @version 0.0.1
 *
 * @summary Main entry point for initializing, configuring, and managing the
 * browser automation workflow.
 *
 * @description
 *
 * @requires PageManager
 * @requires ConfigurationManager
 */

const _ = require("lodash");
/* const PageManager = require("./src/pages/PageManager"); */
const ConfigurationManager = require("./src/utils/ConfigurationManager.js");
const logger = require("./src/lib/VisualLogManager");
const prompt = require("prompt-sync")();

/**
 * @async
 * @function loadConfiguration
 *
 * @summary Loads and validates the configuration file.
 *
 * @description Loads and validates the configuration file.
 *
 * @throws Will throw an error if the configuration data is empty or missing
 * required properties.
 *
 * @returns {object} The validated configuration data.
 */
(async () => {
	const CONFIG_FILE = new ConfigurationManager("configs/config.json");
	const CONFIG_DATA = await CONFIG_FILE.getConfigData();

	const DEFAULT_URL = _.get(CONFIG_DATA, "navigationURLs.default", null);
	if (!DEFAULT_URL) {
		await logger.error(
			"Default navigation URL is missing in the configuration file."
		);
		process.exit(1);
	}

	let PAGE_MANAGER;
	try {
		PAGE_MANAGER = new PageManager(CONFIG_DATA.browsers, "chrome");
		if (!PAGE_MANAGER) {
			await logger.error("Failed to initialize PageManager.");
			process.exit(1);
		}

		await PAGE_MANAGER.launchBrowser();
		await PAGE_MANAGER.navigateToPage(DEFAULT_URL);

		const userResponse = prompt(
			"Are you ready to continue?: "
		).toLowerCase();
		if (userResponse !== "yes") {
			await logger.info(
				"User chose not to continue. Terminating process."
			);
			process.exit(0);
		}
	} catch (error) {
		await logger.error(
			`An error occurred during browser operation: ${error.message}`
		);
	} finally {
		if (PAGE_MANAGER) {
			await PAGE_MANAGER.closeBrowser();
		}
		process.exit(0);
	}
})();
