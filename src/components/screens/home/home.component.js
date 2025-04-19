import { BaseScreen } from '@/core/component/base-screen.component';
import { renderService } from '@/core/services/render.service';
import { Field } from '@/components/ui/field/field.component';
import { UserItem } from '@/components/ui/user-item/user-item.component';

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
				new Field({
					placeholder: 'enter email',
					name: 'test',
					variant: 'credit-card',
					type: 'type',
				}),
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
		return element;
	}
}
