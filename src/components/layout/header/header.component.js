import { Child } from '@/core/component/child.component.js';
import { renderService } from '@/core/services/render.service.js';

import * as styles from './header.module.scss';
import templateHTML from './header.template.html';

import { Logo } from './logo/logo.component.js';
import { LogoutButton } from './logout-button/logout-button.component.js';
import { Search } from './search/search.component.js';
import { UserItem } from '@/components/ui/user-item/user-item.component.js';

export class Header extends Child {
	constructor({ router }) {
		super();

		this.router = router;
	}

	render() {
		this.element = renderService.htmlToElement(
			templateHTML,
			[
				Logo,
				new LogoutButton({ router: this.router }),
				Search,
				new UserItem(
					{
						avatarPath: 'https://avatars.githubusercontent.com/u/181439848?v=4',
						name: 'Albert Alan-Reys',
					},
					false,
					() => console.log('Hello'),
				),
			],
			styles,
		);
		return this.element;
	}
}
