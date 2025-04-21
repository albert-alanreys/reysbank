import { $R } from '@/core/rquery/rquery.lib.js';
import { Child } from '@/core/component/child.component.js';
import { renderService } from '@/core/services/render.service.js';

import * as styles from './heading.module.scss';
import templateHTML from './heading.template.html';

export class Heading extends Child {
	constructor(title = '') {
		super();

		this.title = title;
	}

	render() {
		this.element = renderService.htmlToElement(templateHTML, [], styles);

		$R(this.element).text(this.title);

		return this.element;
	}
}
