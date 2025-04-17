import { BaseScreen } from '@/core/component/base-screen.component';
import { renderService } from '@/core/services/render.service';
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
