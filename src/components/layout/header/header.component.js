import { Child } from '@/core/component/child.component';
import { renderService } from '@/core/services/render.service';

import * as styles from './header.module.scss';
import templateHTML from './header.template.html';

import { Logo } from './logo/logo.component';
import { LogoutButton } from './logout-button/logout-button.component';
import { Search } from './search/search.component';
import { UserItem } from '@/components/ui/user-item/user-item.component';

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
					() => alert('Hello'),
				),
			],
			styles,
		);
		return this.element;
	}
}
