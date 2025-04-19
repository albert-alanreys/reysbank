import { formatCardNumberWithDashes } from '@/utils/format/format-card-number';

/**
 * A lightweight utility class for DOM manipulation.
 */
class RQuery {
	/**
	 * Initializes a new instance of the RQuery class.
	 *
	 * @param {string | HTMLElement} selector - A CSS selector string or an HTMLElement. If a string is provided, the first matching element in the DOM will be selected. If an HTMLElement is provided, it will be used directly.
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

	/* FIND */

	/**
	 * Finds the first element that matches the specified selector within the current element.
	 *
	 * @param {string} selector - A CSS selector string to search for within the current element.
	 * @throws {Error} Throws an error if no element matching the selector is found.
	 * @returns {RQuery} A new RQuery instance wrapping the found element.
	 */
	find(selector) {
		const element = new RQuery(this.element.querySelector(selector));

		if (element) {
			return element;
		} else {
			throw new Error(`No element found for the selector: "${selector}"`);
		}
	}

	/* INSERT */

	/**
	 * Appends a new child element to the current element.
	 *
	 * @param {HTMLElement} childElement - The child element to append.
	 * @throws {Error} Throws an error if the provided childElement is not an instance of HTMLElement.
	 * @returns {RQuery} The current RQuery instance for method chaining.
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
	 * @throws {Error} Throws an error if the provided newElement is not an instance of HTMLElement or if the current element does not have a parent element.
	 * @returns {RQuery} The current RQuery instance for method chaining.
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
	 * Gets or sets the inner HTML content of the current element.
	 *
	 * @param {string} [htmlContent] - The HTML content to set. If omitted, the method will return the current inner HTML of the element.
	 * @returns {RQuery | string} The current RQuery instance for method chaining when setting HTML content, or the current inner HTML when getting.
	 */
	html(htmlContent) {
		if (typeof htmlContent === 'undefined') {
			return this.element.innerHTML;
		} else {
			this.element.innerHTML = htmlContent;
			return this;
		}
	}

	/* EVENTS */

	/**
	 * Adds a click event listener to the current element.
	 *
	 * @param {function(Event): void} callback - The function to execute when the element is clicked. The callback receives the event object as its argument.
	 * @returns {RQuery} The current RQuery instance for method chaining.
	 */
	click(callback) {
		this.element.addEventListener('click', callback);
		return this;
	}

	/* FORM */

	/**
	 * Sets attributes and event listeners for an input element.
	 * @param {Object} options - An object containing input options.
	 * @param {function(Event): void} [options.onInput] - Function to be called when the input event occurs.
	 * @param {Object} [options.rest] - Additional attributes to set on the input element.
	 * @throws {Error} If the current element is not an input element.
	 * @returns {RQuery} The current RQuery instance for method chaining.
	 */
	input({ onInput, ...rest }) {
		if (this.element.tagName.toLowerCase() !== 'input') {
			throw new Error('Element must be an input.');
		}

		for (const [key, value] of Object.entries(rest)) {
			this.element.setAttribute(key, value);
		}

		if (onInput) {
			this.element.addEventListener('input', onInput);
		}

		return this;
	}

	/**
	 * Restricts the input of a number input field to numeric characters only and optionally limits the length of the input value.
	 *
	 * @param {number} [limit] - The maximum length of input value.
	 * @throws {Error} Throws an error if the element is not an input or its type attribute is not set to "number".
	 * @returns {this} The current RQuery instance for method chaining.
	 */
	numberInput(limit) {
		if (
			this.element.tagName.toLowerCase() !== 'input' ||
			this.element.type !== 'number'
		) {
			throw new Error('Element must be an input with type "number".');
		}

		this.element.addEventListener('input', (event) => {
			let value = event.target.value.replace(/[^0-9]/g, '');
			if (limit) value = value.substring(0, limit);
			event.target.value = value;
		});

		return this;
	}

	/**
	 * Sets attributes and event listeners for a credit card input element.
	 *
	 * @throws {Error} If the element is not an input field of type "text".
	 * @returns {this} The current RQuery instance for method chaining.
	 */
	creditCardInput() {
		const limit = 16;

		if (
			this.element.tagName.toLowerCase() !== 'input' ||
			this.element.type !== 'text'
		) {
			throw new Error('Element must be an input with type "text".');
		}

		this.element.addEventListener('input', (event) => {
			let value = event.target.value.replace(/[^0-9]/g, '');
			if (limit) value = value.substring(0, limit);
			event.target.value = formatCardNumberWithDashes(value);
		});

		return this;
	}

	/* STYLES */

	/**
	 * Sets a CSS property to a specified value for the current element.
	 *
	 * @param {string} property - The name of the CSS property to set.
	 * @param {string} value - The value to assign to the CSS property.
	 * @throws {Error} Throws an error if the property or value is not a string.
	 * @returns {RQuery} The current RQuery instance for method chaining.
	 */
	css(property, value) {
		if (typeof property !== 'string' || typeof value !== 'string') {
			throw new Error('Both "property" and "value" must be strings.');
		}

		this.element.style[property] = value;
		return this;
	}

	/**
	 * Adds one or more CSS classes to the current element.
	 *
	 * @param {string | string[]} classNames - A single class name as a string or an array of class names to add. If an array is provided, each class name in the array will be added to the element.
	 * @throws {Error} Throws an error if the provided classNames is neither a string nor an array of strings.
	 * @returns {RQuery} The current RQuery instance for method chaining.
	 */
	addClass(classNames) {
		if (Array.isArray(classNames)) {
			for (const className of classNames) {
				this.element.classList.add(className);
			}
		} else if (typeof classNames === 'string') {
			this.element.classList.add(classNames);
		} else {
			throw new Error(
				'The "classNames" parameter must be a string or an array of strings.',
			);
		}

		return this;
	}

	/**
	 * Removes one or more CSS classes from the element.
	 *
	 * @param {string | string[]} classNames - The class name(s) to remove. Can be a single class name as a string or an array of class names.
	 * @returns {this} The current RQuery instance for method chaining.
	 */
	removeClass(classNames) {
		if (Array.isArray(classNames)) {
			for (const className of classNames) {
				this.element.classList.remove(className);
			}
		} else {
			this.element.classList.remove(classNames);
		}

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
