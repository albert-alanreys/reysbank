import { Child } from '@/core/component/child.component';
import { renderService } from '@/core/services/render.service';

import * as styles from './header.module.scss';
import templateHTML from './header.template.html';

export class Header extends Child {
	render() {
		this.element = renderService.htmlToElement(templateHTML, [], styles);
		return this.element;
	}
}
