import { getTitle } from '@/config/seo.config';

export class BaseScreen {
	/**
	 * Constructs a new instance of the base screen component.
	 *
	 * @param {Object} params - The parameters for the constructor.
	 * @param {string} params.title - The title to set for the document.
	 */
	constructor({ title }) {
		document.title = getTitle(title);
	}

	/**
	 * Render the child component content.
	 * @returns {HTMLElement}
	 */
	render() {
		throw new Error('Render method must be implemented in the child class');
	}
}
