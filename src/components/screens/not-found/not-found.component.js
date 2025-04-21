import { BaseScreen } from '@/core/component/base-screen.component.js';
import { renderService } from '@/core/services/render.service.js';
import template from './not-found.template.html';

export class NotFound extends BaseScreen {
	constructor() {
		super({ title: 'Not found' });
	}

	render() {
		const element = renderService.htmlToElement(template);
		return element;
	}
}
