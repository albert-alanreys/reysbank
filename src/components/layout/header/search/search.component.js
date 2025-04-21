import { $R } from '@/core/libs/rquery.lib.js';
import { Child } from '@/core/component/child.component.js';
import { renderService } from '@/core/services/render.service.js';

import * as styles from './search.module.scss';
import templateHTML from './search.template.html';

export class Search extends Child {
	render() {
		this.element = renderService.htmlToElement(templateHTML, [], styles);

		$R(this.element).find('input').input({
			type: 'search',
			name: 'search',
			placeholder: 'Search contacts...',
		});

		return this.element;
	}
}
