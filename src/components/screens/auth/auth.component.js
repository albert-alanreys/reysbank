import { BaseScreen } from '@/core/component/base-screen.component.js';
import { renderService } from '@/core/services/render.service.js';

import * as styles from './auth.module.scss';
import templateHTML from './auth.template.html';

import { Heading } from '@/components/ui/heading/heading.component.js';

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
