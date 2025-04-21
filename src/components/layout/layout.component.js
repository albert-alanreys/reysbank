import { $R } from '@/core/rquery/rquery.lib.js';
import { renderService } from '@/core/services/render.service.js';

import * as styles from './layout.module.scss';
import templateHTML from './layout.template.html';

import { Header } from './header/header.component.js';
import { Child } from '@/core/component/child.component.js';

export class Layout extends Child {
	constructor({ router, children }) {
		super();

		this.router = router;
		this.children = children;
	}

	render() {
		this.element = renderService.htmlToElement(templateHTML, [], styles);

		const mainElement = $R(this.element).find('main');
		const contentContainer = $R(this.element).find('#content');

		mainElement.before(
			new Header({
				router: this.router,
			}).render(),
		);
		contentContainer.append(this.children);

		return this.element;
	}
}
