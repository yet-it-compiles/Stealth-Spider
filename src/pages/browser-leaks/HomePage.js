/**
 * @file WhatIsMyIP.js
 *
 * @version 0.0.1
 *
 * @summary Page Object Model of BrowserLeaks "What Is My IP Address" page.
 *
 * @description This file contains the definition of the `WhatIsMyIP` class,
 * which is used to interact with the "What Is My IP Address" page on
 * BrowserLeaks. It provides a set of methods and selectors to extract details
 * about the user's IP address, location, ISP, and other related network and
 * browser information.
 *
 * @requires BasePage - The base class from which this page class extends,
 * providing common methods and utilities.
 *
 * @exports WhatIsMyIP - Represents the page model for the BrowserLeaks "What
 * Is My IP Address" page.
 */

const BasePage = require("../BasePage");

/**
 * @class WhatIsMyIP
 *
 * @version 0.0.1
 *
 * @summary Represents the "What Is My IP Address" page of BrowserLeaks.
 *
 * @description The `WhatIsMyIP` class is a child class of `BasePage` and
 * includes page-specific selectors and methods to interact with elements on
 * the BrowserLeaks "What Is My IP Address" page. It allows extraction of IP-
 * related information such as the IP address, hostname, country, city, ISP,
 * and other network and browser properties.
 *
 * @example
 * const whatIsMyIP = new WhatIsMyIP(page);
 * await whatIsMyIP.getIPAddress();
 *
 * @extends BasePage
 */
class WhatIsMyIP extends BasePage {
	constructor(page) {
		super(page);
		this.selectors = {
			...this.selectors,
			getIPAddress:
				"body > div:nth-child(4) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(2)",
			getHostName:
				"body > div:nth-child(4) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(3)",
			getCountry:
				"body > div:nth-child(4) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(5)",
			getState:
				"body > div:nth-child(4) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(6)",
			getCity:
				"body > div:nth-child(4) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(7)",
			getISP: "body > div:nth-child(4) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(9)",
			getTimezone:
				"body > div:nth-child(4) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(12)",
			getLocalTime:
				"body > div:nth-child(4) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(13)",
			getOS: "body > div:nth-child(4) > table:nth-child(3) > tbody:nth-child(4) > tr:nth-child(2)",
			getUserAgent:
				"body > div:nth-child(4) > table:nth-child(3) > tbody:nth-child(7) > tr:nth-child(9)",
			getLanguage:
				"body > div:nth-child(4) > table:nth-child(3) > tbody:nth-child(7) > tr:nth-child(17)",
			getCookie:
				"body > div:nth-child(4) > table:nth-child(3) > tbody:nth-child(7) > tr:nth-child(19)",
			isTorRelay:
				"body > div:nth-child(4) > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(2)",
		};
	}
}

module.exports = WhatIsMyIP;
