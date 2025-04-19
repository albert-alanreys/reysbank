import { $R } from '@/core/rquery/rquery.lib';
import { Child } from '@/core/component/child.component';
import { renderService } from '@/core/services/render.service';

import * as styles from './field.module.scss';
import templateHTML from './field.template.html';

export class Field extends Child {
	constructor({ placeholder, name, variant, type = 'text', value = '' }) {
		super();

		this.placeholder = placeholder;
		this.name = name;
		this.variant = variant;
		this.type = type;
		this.value = value;
	}

	render() {
		this.element = renderService.htmlToElement(templateHTML, [], styles);

		const inputElement = $R(this.element).find('input').input({
			placeholder: this.placeholder,
			type: this.type,
			value: this.value,
			name: this.name,
		});

		if (this.type === 'number') {
			inputElement.numberInput();
		}

		const isCreditCard = this.variant === 'credit-card';

		if (isCreditCard) {
			inputElement.creditCardInput();
		}

		return this.element;
	}
}
