/**
 * A lightweight utility class for DOM manipulation.
 */
class RQuery {
	/**
	 * Initializes a new instance of the RQuery class.
	 *
	 * @param {string | HTMLElement} selector - A CSS selector string or an HTMLElement.
	 * If a string is provided, the first matching element in the DOM will be selected.
	 * If an HTMLElement is provided, it will be used directly.
	 * @throws {Error} Throws an error if the selector is invalid or if no element is found for a string selector.
	 */
	constructor(selector) {
		if (typeof selector === 'string') {
			this.element = document.querySelector(selector);

			if (!this.element) {
				throw new Error(`No element found for the selector: "${selector}"`);
			}
		} else if (selector instanceof HTMLElement) {
			this.element = selector;
		} else {
			throw new Error(
				'The selector must be a string or an instance of HTMLElement.',
			);
		}
	}

	/**
	 * Appends a new child element to the current element.
	 *
	 * @param {HTMLElement} childElement - The child element to append.
	 * @returns {RQuery} The current RQuery instance for method chaining.
	 * @throws {Error} Throws an error if the provided childElement is not an instance of HTMLElement.
	 */
	append(childElement) {
		if (!(childElement instanceof HTMLElement)) {
			throw new Error(
				'The provided childElement must be an instance of HTMLElement.',
			);
		}

		this.element.appendChild(childElement);
		return this;
	}

	/**
	 * Inserts a new element immediately before the current element in the DOM.
	 *
	 * @param {HTMLElement} newElement - The new element to insert.
	 * @returns {RQuery} The current RQuery instance for method chaining.
	 * @throws {Error} Throws an error if the provided newElement is not an instance of HTMLElement
	 * or if the current element does not have a parent element.
	 */
	before(newElement) {
		if (!(newElement instanceof HTMLElement)) {
			throw new Error(
				'The provided newElement must be an instance of HTMLElement.',
			);
		}

		const parentElement = this.element.parentElement;

		if (!parentElement) {
			throw new Error('The current element does not have a parent element.');
		}

		parentElement.insertBefore(newElement, this.element);
		return this;
	}

	/**
	 * Finds the first element that matches the specified selector within the current element.
	 *
	 * @param {string} selector - A CSS selector string to search for within the current element.
	 * @returns {RQuery} A new RQuery instance wrapping the found element.
	 * @throws {Error} Throws an error if no element matching the selector is found.
	 */
	find(selector) {
		const element = new RQuery(this.element.querySelector(selector));

		if (element) {
			return element;
		} else {
			throw new Error(`No element found for the selector: "${selector}"`);
		}
	}

	/**
	 * Sets a CSS property to a specified value for the current element.
	 *
	 * @param {string} property - The name of the CSS property to set.
	 * @param {string} value - The value to assign to the CSS property.
	 * @returns {RQuery} The current RQuery instance for method chaining.
	 * @throws {Error} Throws an error if the property or value is not a string.
	 */
	css(property, value) {
		if (typeof property !== 'string' || typeof value !== 'string') {
			throw new Error('Both "property" and "value" must be strings.');
		}

		this.element.style[property] = value;
		return this;
	}
}

/**
 * Creates a new RQuery instance for the specified selector or element.
 *
 * @param {string | HTMLElement} selector - A CSS selector string or an HTMLElement.
 * @returns {RQuery} A new RQuery instance wrapping the selected element.
 */
export const $R = (selector) => new RQuery(selector);
