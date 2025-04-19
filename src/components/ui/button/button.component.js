import { $R } from '@/core/rquery/rquery.lib';
import { Child } from '@/core/component/child.component';
import { renderService } from '@/core/services/render.service';

import * as styles from './button.module.scss';
import templateHTML from './button.template.html';

export class Button extends Child {
	constructor({ children, onClick, variant }) {
		super();

		if (!children) throw new Error('Children is empty');

		this.children = children;
		this.onClick = onClick;
		this.variant = variant;
	}

	render() {
		this.element = renderService.htmlToElement(templateHTML, [], styles);
		$R(this.element).html(this.children).click(this.onClick);

		if (this.variant) $R(this.element).addClass(styles[this.variant]);

		return this.element;
	}
}
