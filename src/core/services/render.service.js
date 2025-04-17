import { Child } from '../component/child.component';

export class RenderService {
	/**
	 * Converts an HTML string into an HTMLElement, applies scoped styles, and replaces custom component tags.
	 *
	 * @param {string} templateHTML - The HTML string to convert into an HTMLElement.
	 * @param {Array} [components=[]] - An array of component classes or instances to replace custom component tags.
	 * @param {Object} [styles] - An object mapping original class names to scoped class names for styling.
	 * @returns {HTMLElement} - The resulting HTMLElement with applied styles and replaced components.
	 */
	htmlToElement(templateHTML, components = [], styles) {
		const template = document.createElement('template');
		template.innerHTML = templateHTML.trim();
		const element = template.content.firstChild;

		if (styles) {
			this.#applyModuleStyles(element, styles);
		}

		this.#replaceComponentTags(element, components);
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
		const componentTagPattern = /^component-/;
		const allElements = parentElement.getElementsByTagName('*');

		for (const element of allElements) {
			const elementTagName = element.tagName.toLowerCase();

			console.log(elementTagName);

			if (componentTagPattern.test(elementTagName)) {
				const componentName = elementTagName
					.replace(componentTagPattern, '')
					.replace(/-/g, '');

				const foundComponent = components.find((Component) => {
					const instance =
						Component instanceof Child ? Component : new Component();

					return instance.constructor.name.toLowerCase() === componentName;
				});

				if (foundComponent) {
					const componentContent =
						foundComponent instanceof Child
							? foundComponent.render()
							: new foundComponent().render();
					element.replaceWith(componentContent);
				} else {
					console.error(
						`Component "${componentName}" not found
            in the provided components array `,
					);
				}
			}
		}
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
