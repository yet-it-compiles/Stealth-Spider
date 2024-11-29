/**
 * @file BasePage.js
 *
 * @version 0.0.1
 *
 * @summary Serves as the base page object to provide common methods for its
 * subpages.
 *
 * @description This file defines the BasePage class, encapsulating its methods
 * so its child classes may inherit them.
 *
 * @requires playwright Page object to perform actions on the page.
 *
 * @exports BasePage
 */

const logger = require("./VisualLogManager");

/**
 * @class BasePage
 *
 * @summary Base class for page objects.
 *
 * @description The BasePage class provides common methods for the child
 * classes that extend from it.
 *
 * @example
 *
 */
class BasePage {
	constructor(page) {
		this.page = page;
		this.selectors = {
			navigateToPage: "",
			clickOnLink: "",
			searchForText: "",
			results,
		};
	}

	/**
	 * @function navigateTo
	 *
	 * @summary Navigates to the provided URL.
	 *
	 * @description Navigates to a specified URL, logging any errors that may
	 * occur.
	 *
	 * @param {string} url - The URL to navigate to.
	 *
	 * @throws {Error} Throws an error if navigation fails.
	 *
	 * @example
	 * const basePage = new BasePage(page);
	 * await basePage.navigateTo('https://browserleaks.com');
	 */
	async navigateTo(url) {
		try {
			await this.page.goto(url);
		} catch (navigationError) {
			logger.error(
				`BasePage: Error navigating to ${url}:`,
				navigationError
			);
		}
	}

	/**
	 * @function click
	 *
	 * @summary Clicks on an element specified by the selector.
	 *
	 * @description Waits for an element to be visible and then clicks it. Logs
	 * an error if the action fails.
	 *
	 * @param {string} selector - The CSS selector of the element to click.
	 *
	 * @throws {Error} Throws an error if the click action fails.
	 *
	 * @example
	 * const basePage = new BasePage(page);
	 * await basePage.click('#submit-button');
	 */
	async click(selector) {
		try {
			await this.page.waitForSelector(selector, { timeout: 5000 });
			await this.page.click(selector);
		} catch (error) {
			logger.error(
				`BasePage: Error clicking on selector ${selector}:`,
				error
			);
		}
	}

	/**
	 * @function getText
	 *
	 * @summary Retrieves the text content of an element.
	 *
	 * @description Waits for an element to be visible and then retrieves its
	 * text content. Logs an error if the action fails.
	 *
	 * @param {string} selector - The CSS selector of the element to retrieve
	 * text from.
	 *
	 * @returns {Promise<string|null>} The text content of the element, or null
	 * if an error occurs.
	 *
	 * @throws {Error} Throws an error if retrieving text fails.
	 *
	 * @example
	 * const basePage = new BasePage(page);
	 * const text = await basePage.getText('.title');
	 */
	async scrapeText(selector) {
		try {
			await this.page.waitForSelector(selector, { timeout: 5000 });
			return await this.page.textContent(selector);
		} catch (error) {
			logger.error(
				`BasePage: Error getting text from selector ${selector}:`,
				error
			);
			return null;
		}
	}

	/**
	 * @function isVisible
	 *
	 * @summary Checks if an element is visible on the page.
	 *
	 * @description Waits for an element to be visible and checks its
	 * visibility state. Logs an error if the check fails.
	 *
	 * @param {string} selector - The CSS selector of the element to check.
	 *
	 * @returns {Promise<boolean>} True if the element is visible, false
	 * otherwise.
	 *
	 * @throws {Error} Throws an error if checking visibility fails.
	 *
	 * @example
	 * const basePage = new BasePage(page);
	 * const isVisible = await basePage.isVisible('#login-form');
	 */
	async isVisible(selector) {
		try {
			await this.page.waitForSelector(selector, { timeout: 5000 });
			return await this.page.isVisible(selector);
		} catch (error) {
			console.error(
				`BasePage: Error checking visibility of selector ${selector}:`,
				error
			);
			return false;
		}
	}

	/**
	 * @function waitForPageLoad
	 *
	 * @summary Waits for the page to fully load.
	 *
	 * @description Waits for the page's load state to reach "networkidle",
	 * indicating that the page has loaded completely.
	 *
	 * @throws {Error} Throws an error if waiting for the page load fails.
	 *
	 * @example
	 * const basePage = new BasePage(page);
	 * await basePage.waitForPageLoad();
	 */
	async waitForPageLoad() {
		try {
			await this.page.waitForLoadState("networkidle");
		} catch (error) {
			console.error(`BasePage: Error waiting for page load:`, error);
		}
	}
}

module.exports = BasePage;
