/**
 * @file ConfigurationManager.js
 *
 * @version 0.0.1
 *
 * @summary Manages all the applications required JSON operations.
 *
 * @description This file is responsible for handling all the projects JSON
 * operations including functionality like loading data, verifying data,
 * overriding keys, and saving new configuration settings files.
 *
 * @requires fs - File system module for file I/O.
 * @requires path - Path module for handling and transforming file paths.
 * @requires prompt-sync - Synchronous prompt library for user input.
 * @requires lodash - Utility library for object and data manipulation.
 * @requires VisualLogManager - Custom logging module for enhanced visual logs.
 *
 * @exports ConfigurationManager
 */
import _ from "lodash";
/* import path from "path"; */
import fs from "fs/promises";
import prompt from "prompt-sync";
import VisualLogManager from "../lib/VisualLogManager.js";

export default class ConfigurationManager {
	/**
	 * @constructor
	 *
	 * @summary Parameterized constructor responsible for initializing the
	 * ConfigurationManager.
	 *
	 * @param {string} configFileName - The name of the configuration file.
	 */
	constructor(configFileName) {
		this.logger = VisualLogManager;
		this.configFileName = configFileName;
		/* this.configFilePath = path.resolve(); */
		this.configData = {};
		this.bufferedChanges = {};
	}

	/**
	 * @function getConfigData
	 *
	 * @summary Reads configuration data from the file.
	 *
	 * @description Provides functionality for reading, and capturing the
	 * contents of a file.
	 *
	 * @returns {Object} A parsed configuration data or an empty object if
	 * the file doesn't exist or errors occur.
	 */
	async getConfigData() {
		try {
			await this.logger.info(
				`Resolved config file path: ${this.configFilePath}`,
			);

			if (fs.existsSync(this.configFilePath)) {
				const configData = JSON.parse(
					await fs.promises.readFile(this.configFilePath, "utf8"),
				);
				await this.logger.success("Configuration loaded successfully.");
				this.configData = configData;
				return configData;
			} else {
				await this.logger.warning(
					`Configuration file does not exist at: ${this.configFilePath}`,
				);
				this.configData = {};
				return {};
			}
		} catch (error) {
			await this.logger.error(
				`Error reading configuration file at ${this.configFilePath}: ${error.message}`,
			);
			this.configData = {};
			return {};
		}
	}

	/**
	 * @function setConfigData
	 *
	 * @summary Provides the functionality for saving updates that are stored
	 * in `bufferedChanges` to the specified configuration file.
	 *
	 * @description Saves and merges the in `bufferedChanges` to the file
	 */
	async setConfigData() {
		try {
			this.configData = { ...this.configData, ...this.bufferedChanges };

			await this.logger.success(
				`Buffered changes: ${JSON.stringify(this.bufferedChanges)}`,
			);

			await this.logger.info(
				`Attempting to save configuration to: ${this.configFilePath}`,
			);
			await fs.promises.writeFile(
				this.configFilePath,
				JSON.stringify(this.configData, null, 2),
				"utf8",
			);
			await this.logger.success("Configuration file saved successfully.");
			this.bufferedChanges = {};
		} catch (error) {
			await this.logger.error(
				`Error saving configuration file at ${this.configFilePath}: ${error.message}`,
			);
		}
	}

	/**
	 * @function isPathValid
	 *
	 * @summary Initializes the configuration setup process when the app is
	 * first ran on the first setup.
	 *
	 * @description It checks and ensures that at least one configuration for a
	 * supported browser is setup.
	 */
	async initializeConfiguration() {
		const browsers = ["chrome", "firefox", "opera"];

		const isAnyConfigured = browsers.some((browser) => {
			const browserConfig = this.configData.browsers?.[browser];
			return browserConfig?.executable && browserConfig?.profilePath;
		});

		if (isAnyConfigured) {
			await this.logger.info(
				"One or more browsers are already configured.",
			);
			return;
		}

		const browserChoice = await this.getUserBrowserChoice();
		await this.getRequestedBrowserSetup(browserChoice, browsers);
		await this.setConfigData();
	}

	/**
	 * @function getRequestedBrowserSetup
	 *
	 * @summary Configures requested browsers.
	 *
	 * @description This method configures one or more browsers based on user
	 * input. If the user selects "all," all available browsers are configured
	 * concurrently. Otherwise, the method configures the specified browser
	 * individually.
	 *
	 * @param {string} browserChoice - The user's choice of browser(s) to
	 * configure.
	 * Accepted values are:
	 *   - `"all"`: Configures all browsers in the provided list.
	 *   - A specific browser name (e.g., `"chrome"`, `"firefox"`): Configures
	 * only that browser.
	 *
	 * @param {Array<string>} browsers - An array of browser names available
	 * for configuration.
	 *
	 * @returns {Promise<void>} Resolves once all requested browser configs.
	 * completed are complete.
	 *
	 * @example
	 * // Configure all browsers
	 * await getRequestedBrowserSetup("all", ["chrome", "firefox"]);
	 *
	 * @example
	 * // Configure a specific browser
	 * await getRequestedBrowserSetup("chrome", ["chrome", "firefox"]);
	 */
	async getRequestedBrowserSetup(browserChoice, browsers) {
		if (browserChoice === "all") {
			await Promise.all(
				browsers.map((browser) => this.configureBrowser(browser)),
			);
		} else {
			await this.configureBrowser(browserChoice);
		}
	}

	/**
	 * @function configureBrowser
	 *
	 * @summary Configures a specific browser.
	 *
	 * @description This method collects user input to retrieve and validate
	 * the paths for the browser executable and profile. If the provided paths
	 * are valid, they are buffered for later updates in the configuration.
	 *
	 * @param {string} browser - The name of the browser to configure (e.g.,
	 * `"chrome"`, `"firefox"`).
	 *
	 * @returns {Promise<void>} Resolves once the browser configuration is
	 * complete.
	 *
	 * @throws {Error} Throws an error if browser-specific user input cannot be
	 * collected.
	 *
	 * @example
	 * Configure Chrome browser;
	 * await configureBrowser("chrome");
	 */
	async configureBrowser(browser) {
		const { executablePath, profilePath } =
			this.getBrowserUserInputResults(browser);

		if (await this.isPathValid(executablePath, true)) {
			this.setBufferedConfigKey(
				`browsers.${browser}.executable`,
				executablePath,
			);
		}

		if (await this.isPathValid(profilePath, false)) {
			this.setBufferedConfigKey(
				`browsers.${browser}.profilePath`,
				profilePath,
			);
		}
	}

	/**
	 * @function getBrowserUserInputs
	 *
	 * @summary Collects user input for a browser's executable and profile
	 * paths.
	 *
	 * @description This method prompts the user to input the executable path
	 * and profile path for a given browser. It returns an object containing
	 * the collected values.
	 *
	 * @param {string} browser - The name of the browser for which user input
	 * is requested.
	 *
	 * @returns {Object} An object containing:
	 *   - `executablePath` {string}: The path to the browser executable.
	 *   - `profilePath` {string}: The path to the browser profile directory.
	 */
	getBrowserUserInputResults(browser) {
		const executablePath = this.promptUserInput(`${browser}Executable`, "");
		const profilePath = this.promptUserInput(`${browser}ProfilePath`, "");
		return { executablePath, profilePath };
	}

	/**
	 * @function setBufferedConfigKey
	 *
	 * @summary Buffers configuration changes for a given key.
	 *
	 * @description This method updates a buffered configuration key with a new
	 * value. If the key already exists and its value differs, it prompts the
	 * user to confirm whether to override the existing value. If the user
	 * confirms, the key is updated in the buffered changes.
	 *
	 * @param {string} configKey - The configuration key to update (e.g.,
	 * `"browsers.chrome.executable"`).
	 * @param {any} configValue - The new value to set for the configuration
	 * key.
	 *
	 * @returns {Promise<void>} Resolves once the key has been updated in the
	 * buffer
	 * or the operation is skipped.
	 *
	 * @throws {Error} Throws if confirmation fails unexpectedly.
	 */
	async setBufferedConfigKey(configKey, configValue) {
		if (
			_.has(this.configData, configKey) &&
			_.get(this.configData, configKey) !== configValue
		) {
			const shouldOverride = await this.confirmKeyOverride(
				configKey,
				_.get(this.configData, configKey),
				configValue,
			);
			if (!shouldOverride) return;
		}
		_.set(this.bufferedChanges, configKey, configValue);
	}

	/**
	 * @function isPathValid
	 *
	 * @summary Checks to see if the configuration key is a valid path
	 *
	 * @description Provides the functionality to validate if the configuration
	 * path passed is a valid path.
	 *
	 * @param {string} pathToCheck - The path to validate.
	 * @param {boolean} isExecutable - Flag to determine if the path should be
	 * an executable file.
	 *
	 * @returns {Boolean} True if the path is valid, otherwise false.
	 */
	async isPathValid(pathToCheck, isExecutable) {
		try {
			const stat = await fs.promises.stat(pathToCheck).catch(() => null);
			if (!stat) {
				await this.logger.warning(
					`Validation failed - Path does not exist: ${pathToCheck}`,
				);
				return false;
			}
			if (isExecutable && !stat.isFile()) {
				await this.logger.error(
					`Expected an executable file, but found: ${pathToCheck}`,
				);
				return false;
			}
			await this.logger.info(
				`Path validation successful: ${pathToCheck}`,
			);
			return true;
		} catch (error) {
			await this.logger.error(`Error validating path: ${error.message}`);
			return false;
		}
	}

	/**
	 * @function promptUserInput
	 *
	 * @summary Prompts the user for input with an optional default value.
	 *
	 * @description This method requests user input for a specified key. If no
	 * input is provided it applies the default value. Logs are generated to
	 * document the interaction and the value used.
	 *
	 * @param {string} key - The key or prompt label for which input is
	 * requested (e.g., `"chromeExecutable"`).
	 * @param {string} defaultPath - The default value to use if the user
	 * provides no input.
	 *
	 * @returns {string} The value provided by the user or the default value.
	 *
	 * @example
	 * const userInput = promptUserInput("chromeExecutable",
	 * "/path/to/chrome");
	 */
	promptUserInput(key, defaultPath) {
		this.logger.info(`Provide a value for "${key}":`);
		const value = prompt(`Value for ${key}: `) || defaultPath;
		if (value === defaultPath) {
			this.logger.warning(
				`\nUser input was not provided for "${key}". \n\tDefault value applied: ${defaultPath}`,
			);
		} else {
			this.logger.info(`\tUser provided value for "${key}": ${value}`);
		}
		return value;
	}

	/**
	 * @function confirmKeyOverride
	 *
	 * @summary Prompts the user to confirm they want to override a given key.
	 *
	 * @description Responsible for logging a message when a specific key is
	 * deemed to be unreadable or no longer exists.
	 *
	 * @returns {Boolean} True if the user confirms the override, otherwise
	 * false.
	 */
	async confirmKeyOverride(key, currentValue, newValue) {
		let response;
		do {
			await this.logger.info(
				`"${key}" already exists, and is currently assigned to the value "${currentValue}". \n\t Are you sure you would like to override this key, and replace it with Replace with "${newValue}"? (yes/no):`,
			);
			response = prompt("Enter your choice: ").toLowerCase();
			if (response !== "yes" && response !== "no") {
				await this.logger.warning(
					`\nInvalid input received for key override confirmation: ${response}`,
				);
			}
		} while (response !== "yes" && response !== "no");
		return response === "yes";
	}

	/**
	 * @function convertConfigToString
	 *
	 * @summary Converts the config object to a formatted JSON string.
	 *
	 * @description Converts the current configuration data to a string for
	 * display or logging.
	 *
	 * @returns {String} The configData object as a JSON string.
	 */
	convertConfigToString() {
		return JSON.stringify(this.configData, null, 2);
	}
}
