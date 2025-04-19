import { BaseScreen } from '@/core/component/base-screen.component';
import { renderService } from '@/core/services/render.service';

import * as styles from './home.module.scss';
import templateHTML from './home.template.html';
import { $R } from '@/core/rquery/rquery.lib';

export class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' });
	}

	render() {
		const element = renderService.htmlToElement(templateHTML, [], styles);

		$R(element).find('h1').css('color', 'red');

		$R().find();

		return element.outerHTML;
	}
}
