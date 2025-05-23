import { Child } from '@/core/component/child.component.js';
import { renderService } from '@/core/services/render.service.js';

import * as styles from './notification.module.scss';
import templateHTML from './notification.template.html';

export class Notification extends Child {
	render() {
		this.element = renderService.htmlToElement(templateHTML, [], styles);
		return this.element;
	}
}
