import { $R } from '../rquery/rquery.lib';
import { ROUTES } from './routes.data';
import { Layout } from '@/components/layout/layout.component';

export class Router {
	#layout;
	#routes;
	#currentRoute;

	constructor() {
		this.#routes = ROUTES;
		this.#init();
	}

	#init() {
		this.#handleLinks();
		this.#handleRouteChange();

		globalThis.addEventListener('popstate', () => {
			this.#handleRouteChange();
		});
	}

	#handleLinks() {
		document.addEventListener('click', (event) => {
			const target = event.target.closest('a');

			if (target) {
				event.preventDefault();
				this.#navigate(target.href);
			}
		});
	}

	#navigate(path) {
		if (path !== this.#getCurrentPath()) {
			globalThis.history.pushState({}, '', path);
			this.#handleRouteChange();
		}
	}

	#handleRouteChange() {
		const path = this.#getCurrentPath() ?? '/';
		const route =
			this.#routes.find((route) => route.path === path) ??
			this.#routes.find((route) => route.path === '/not-found');

		this.#currentRoute = route;
		this.#render();
	}

	#getCurrentPath() {
		return globalThis.location.pathname;
	}

	#render() {
		const component = new this.#currentRoute.component().render();

		if (!this.#layout) {
			this.#layout = new Layout({
				router: this,
				children: component,
			}).render();

			$R('#app').append(this.#layout);
		} else {
			$R('#content').html('').append(component);
		}
	}
}
