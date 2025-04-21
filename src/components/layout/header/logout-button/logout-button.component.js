import { $R } from '@/core/libs/rquery.lib.js';
import { Child } from '@/core/component/child.component.js';
import { renderService } from '@/core/services/render.service.js';

import * as styles from './logout-button.module.scss';
import templateHTML from './logout-button.template.html';

export class LogoutButton extends Child {
	constructor({ router }) {
		super();

		this.router = router;
	}

	render() {
		this.element = renderService.htmlToElement(templateHTML, [], styles);

		$R(this.element)
			.find('button')
			.click(() => {
				this.router.navigate('/auth');
			});

		return this.element;
	}
}
