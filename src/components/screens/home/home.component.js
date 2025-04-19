import { BaseScreen } from '@/core/component/base-screen.component';
import { renderService } from '@/core/services/render.service';
import { Button } from '@/components/ui/button/button.component';

import * as styles from './home.module.scss';
import templateHTML from './home.template.html';

export class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' });
	}

	render() {
		const element = renderService.htmlToElement(
			templateHTML,
			[
				new Button({
					children: 'Send',
					onClick: () => alert('Hello!'),
					variant: 'green',
				}),
			],
			styles,
		);
		return element;
	}
}
