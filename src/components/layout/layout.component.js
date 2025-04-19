import { $R } from '@/core/rquery/rquery.lib';
import { renderService } from '@/core/services/render.service';

import * as styles from './layout.module.scss';
import templateHTML from './layout.template.html';

import { Header } from './header/header.component';
import { Child } from '@/core/component/child.component';

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

		mainElement.before(new Header().render());
		contentContainer.append(this.children);

		return this.element;
	}
}
