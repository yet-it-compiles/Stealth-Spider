/**
 * @file VisualLogManager.js
 *
 * @version 0.0.1
 *
 * @summary Provides a centralized logging utility with colorized output.
 *
 * @description This file is responsible for managing log messages with
 * different severity levels and displaying them in the console with colors
 * using Chalk.
 *
 * @requires fs
 * @requires chalk
 *
 * @exports Logger (singleton instance)
 */

const fs = require("fs");
const chalk = require("chalk");

class VisualLogManager {
	/**
	 * @constructor
	 *
	 * @summary Constructs a Logger instance.
	 *
	 * @description Initializes the Logger with Chalk for colorization.
	 */
	constructor(logLevel = "info") {
		this.chalk = chalk;
		this.logBuffer = [];
		this.bufferFlushInterval = 5000; // 5 seconds
		this.logFilePath = "logs.txt";
		this.logLevel = logLevel;
		this.setupBufferFlush();
	}

	/**
	 * @function _writeLogMessage
	 * @private
	 *
	 * @description Formats and processes log messages, displaying them in the
	 * console and adding them to the buffer.
	 *
	 * @param {string} level - The severity level of the log.
	 * @param {function} colorFunction - The Chalk color function to format the
	 * log level.
	 * @param {string} message - The log message.
	 */
	_writeLogMessage = (level, colorFunction, message) => {
		const logMessage = `${colorFunction(
			`[${level.toUpperCase()}]:`
		)} ${message}`;
		console.log(logMessage);
		this.addToLogBuffer(logMessage);
	};

	/**
	 * @function info
	 *
	 * @summary Logs an informational message in blue.
	 *
	 * @description Displays an informational message with an "[INFO]" prefix
	 * in blue color.
	 *
	 * @param {string} message - The message to log.
	 */
	info = (message) => {
		this._writeLogMessage("[INFO]", this.chalk.blue, message);
	};

	/**
	 * @function logUserAction
	 *
	 * @summary Logs informational messages about the users actions
	 *
	 * @description Displays an informational message with an "[USER ACTION]:"
	 * prefix in blue color.
	 *
	 * @param {string} action -
	 * @param {string} details -
	 */
	logUserAction = (action, details) => {
		const message = `\n[USER ACTION]: ${action} - ${JSON.stringify(
			details
		)}`;
		this._writeLogMessage("\n[INFO]", this.chalk.blue, message);
	};

	/**
	 * @function success
	 *
	 * @summary Logs a success message in green.
	 *
	 * @description Displays a success message with a "[SUCCESS]" prefix in
	 * green color.
	 *
	 * @param {string} message - The message to log message.
	 */
	success = (message) => {
		this._writeLogMessage("\n[SUCCESS] ", this.chalk.green, message);
	};

	/**
	 * @function warning
	 *
	 * @summary Logs a warning message in yellow.
	 *
	 * @description Displays a warning message with a "[WARNING]" prefix in
	 * yellow color.
	 *
	 * @param {string} message - The message to log.
	 *
	 * @example logger.warning('No browser configuration is set', 'browser');
	 */
	warning = (message) => {
		this._writeLogMessage("\n[WARNING]", this.chalk.yellow, message);
	};

	/**
	 * @function error
	 *
	 * @summary Logs an error message in red.
	 *
	 * @description Displays an error message with a "[ERROR]" prefix in red
	 * color.
	 *
	 * @param {string} message - The message to log.
	 *
	 * @example logger.error('Failed to connect to database');
	 */
	error = (message) => {
		this._writeLogMessage("[ERROR]", this.chalk.red, message);
	};

	/**
	 * @function critical
	 *
	 * @summary Logs a critical failure message in white text on a red
	 * background.
	 *
	 * @description Displays a critical failure message with a "[CRITICAL]"
	 * prefix in white text on a red background.
	 *
	 * @param {string} message - The message to log.
	 *
	 * @example logger.critical('System crash', 'System');
	 */
	critical = (message) => {
		this._writeLogMessage(
			"critical failure",
			this.chalk.bgRed.white,
			message
		);
	};

	addToLogBuffer = (logMessage) => {
		this.logBuffer.push(logMessage);
	};

	setupBufferFlush = () => {
		setInterval(() => {
			if (this.logBuffer.length > 0) {
				this.logToFile();
			}
		}, this.bufferFlushInterval);
	};

	logToFile = () => {
		try {
			const logContent = this.logBuffer.join("");
			fs.appendFileSync(this.logFilePath, logContent, "utf8");
			this.logBuffer = [];
		} catch (error) {
			this.error(
				`[ERROR] There was a problem attempting to write the log files to the ${error.message}`
			);
		}
	};

	static getInstance(logLevel = "info") {
		if (!VisualLogManager.instance) {
			VisualLogManager.instance = new VisualLogManager(logLevel);
		}
		return VisualLogManager.instance;
	}
}

module.exports = VisualLogManager.getInstance();
