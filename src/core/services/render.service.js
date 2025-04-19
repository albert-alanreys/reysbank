import { Child } from '../component/child.component';

export class RenderService {
	/**
	 * Converts an HTML string into an HTMLElement, applies scoped styles, and replaces custom component tags.
	 *
	 * @param {string} templateHTML - The HTML string to convert into an HTMLElement.
	 * @param {Array} [components=[]] - An array of component classes or instances to replace custom tags.
	 * @param {Object} [styles] - An object mapping original class names to scoped class names for styling.
	 * @returns {HTMLElement} The resulting HTMLElement with applied styles and replaced components.
	 */
	htmlToElement(templateHTML, components = [], styles = null) {
		const template = document.createElement('template');
		template.innerHTML = templateHTML.trim();
		const element = template.content.firstChild;

		this.#replaceComponentTags(element, components);

		if (styles) {
			this.#applyModuleStyles(element, styles);
		}

		return element;
	}

	/**
	 * Replaces custom component tags within the given parent element by rendering
	 * the corresponding components and inserting their content in place.
	 *
	 * @private
	 * @param {HTMLElement} parentElement - The parent DOM element containing custom component tags.
	 * @param {Array<Function|Object>} components - An array of component classes or instances. Each must implement a `render()` method. If a class is provided, it will be instantiated.
	 * @throws {Error} Logs an error to the console if a matching component cannot be found.
	 * @returns {void} This method does not return a value.
	 */
	#replaceComponentTags(parentElement, components) {
		const instanceMap = new Map();
		const componentInstances = components.map((Component) =>
			Component instanceof Child ? Component : new Component(),
		);
		const componentElements = parentElement.querySelectorAll('*');

		componentInstances.forEach((instance) => {
			const name = instance.constructor.name.toLowerCase();
			instanceMap.set(name, instance);
		});

		componentElements.forEach((element) => {
			const componentName = element.tagName
				.toLowerCase()
				.replace(/^component-/, '')
				.replace(/-/g, '');
			const instance = instanceMap.get(componentName);

			if (instance) {
				const content = instance.render();
				element.replaceWith(content);
			}
		});
	}

	/**
	 * Applies scoped styles to an element and its child elements by replacing their original class names with the corresponding scoped class names provided in the `styles` object.
	 *
	 * @private
	 * @param {HTMLElement} element - The root HTML element to which the styles will be applied.
	 * @param {Object<string, string>} styles - An object mapping original class names to scoped class names. Keys represent the original class names, and values represent the corresponding scoped class names.
	 * @returns {void} This method does not return a value.
	 */
	#applyModuleStyles(element, styles) {
		if (!element || !styles) return;

		const elements = element.querySelectorAll('[class]');
		[element, ...elements].forEach((el) => {
			for (const [originalClass, scopedClass] of Object.entries(styles)) {
				if (el.classList.contains(originalClass)) {
					el.classList.replace(originalClass, scopedClass);
				}
			}
		});
	}
}

export const renderService = new RenderService();
