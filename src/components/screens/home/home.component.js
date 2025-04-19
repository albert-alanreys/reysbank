import { BaseScreen } from '@/core/component/base-screen.component';
import { renderService } from '@/core/services/render.service';

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
