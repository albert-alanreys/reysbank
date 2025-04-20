import { BaseScreen } from '@/core/component/base-screen.component';
import { renderService } from '@/core/services/render.service';

import * as styles from './auth.module.scss';
import templateHTML from './auth.template.html';

import { Heading } from '@/components/ui/heading/heading.component';

export class Auth extends BaseScreen {
	constructor() {
		super({ title: 'Auth' });
	}

	render() {
		this.element = renderService.htmlToElement(
			templateHTML,
			[new Heading('Auth')],
			styles,
		);
		return this.element;
	}
}
