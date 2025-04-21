import { BaseScreen } from '@/core/component/base-screen.component.js';
import { renderService } from '@/core/services/render.service.js';

import * as styles from './home.module.scss';
import templateHTML from './home.template.html';

export class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' });
	}

	render() {
		const element = renderService.htmlToElement(templateHTML, [], styles);
		return element;
	}
}
