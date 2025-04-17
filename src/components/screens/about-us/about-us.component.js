import { BaseScreen } from '@/core/component/base-screen.component';
import { renderService } from '@/core/services/render.service';
import template from './about-us.template.html';

export class AboutUs extends BaseScreen {
	constructor() {
		super({ title: 'About Us' });
	}

	render() {
		const element = renderService.htmlToElement(template);
		return element;
	}
}
