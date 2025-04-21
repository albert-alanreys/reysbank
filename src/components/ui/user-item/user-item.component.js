import { $R } from '@/core/libs/rquery.lib.js';
import { Child } from '@/core/component/child.component.js';
import { renderService } from '@/core/services/render.service.js';

import * as styles from './user-item.module.scss';
import templateHTML from './user-item.template.html';

export class UserItem extends Child {
	constructor(user, isGray = false, onClick = null) {
		super();

		if (!user) throw new Error('User should be passed');
		if (!user?.name) throw new Error('User must have a "name"');
		if (!user?.avatarPath) throw new Error('User must have an "avatarPath"');

		this.user = user;
		this.isGray = isGray;
		this.onClick = onClick;
	}

	render() {
		this.element = renderService.htmlToElement(templateHTML, [], styles);

		this.update(this.user);

		$R(this.element).click(this.onClick || this.#preventDefault.bind(this));

		if (!this.onClick) $R(this.element).attr('disabled', '');
		if (this.isGray) $R(this.element).addClass(styles.gray);

		return this.element;
	}

	update({ avatarPath, name }) {
		if (avatarPath && name) {
			$R(this.element).find('img').attr('src', avatarPath).attr('alt', name);
			$R(this.element).find('span').text(name);
		}
	}

	#preventDefault(event) {
		event.preventDefault();
	}
}
