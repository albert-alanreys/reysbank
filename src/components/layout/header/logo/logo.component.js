import { Child } from '@/core/component/child.component';
import { renderService } from '@/core/services/render.service';

import * as styles from './logo.module.scss';
import templateHTML from './logo.template.html';

export class Logo extends Child {
	render() {
		this.element = renderService.htmlToElement(templateHTML, [], styles);
		return this.element;
	}
}