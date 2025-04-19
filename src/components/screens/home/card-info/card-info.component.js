import { Child } from '@/core/component/child.component';
import { renderService } from '@/core/services/render.service';

import * as styles from './card-info.module.scss';
import templateHTML from './card-info.template.html';

export class CardInfo extends Child {
	render() {
		this.element = renderService.htmlToElement(templateHTML, [], styles);
		return this.element;
	}
}
