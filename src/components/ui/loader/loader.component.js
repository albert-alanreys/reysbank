import { $R } from '@/core/libs/rquery.lib.js';
import { Child } from '@/core/component/child.component.js';
import { renderService } from '@/core/services/render.service.js';

import * as styles from './loader.module.scss';
import templateHTML from './loader.template.html';

export const LOADER_SELECTOR = '[data-component="loader"]';

export class Loader extends Child {
	constructor(width = 100, height = 100) {
		super();

		this.width = width;
		this.height = height;
	}

	render() {
		this.element = renderService.htmlToElement(templateHTML, [], styles);

		$R(this.element)
			.css('width', `${this.width}px`)
			.css('height', `${this.height}px`)
			.addClass('bounce');

		return this.element;
	}
}
