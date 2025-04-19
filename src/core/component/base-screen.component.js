import { getTitle } from '@/config/seo.config';

/**
 * BaseScreen is an abstract class that serves as a foundation for creating screen components.
 * It provides a mechanism to set the document title and enforces the implementation of a render method in derived classes.
 */
export class BaseScreen {
	/**
	 * Creates an instance of the BaseScreen component.
	 *
	 * @param {Object} params - Configuration parameters for the screen.
	 * @param {string} params.title - The title to be set for the document.
	 */
	constructor({ title }) {
		document.title = getTitle(title);
	}

	/**
	 * Renders the content of the child component.
	 * This method must be implemented by any class extending BaseScreen.
	 *
	 * @throws {Error} If the method is not implemented in the derived class.
	 * @returns {HTMLElement} The rendered content of the child component.
	 */
	render() {
		throw new Error(
			'The render method must be implemented in the derived class.',
		);
	}
}
