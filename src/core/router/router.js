import { ROUTES } from './routes.data';
import { Layout } from '@/components/layout/layout.component';

export class Router {
	#layout;
	#routes;
	#currentRoute;

	constructor() {
		this.#routes = ROUTES;
		this.#handleRouteChange();
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
		const component = new this.#currentRoute.component();

		if (!this.#layout) {
			this.#layout = new Layout({
				router: this,
				children: component.render(),
			});
			document.getElementById('app').innerHTML = this.#layout.render();
		} else {
			document.querySelector('main').innerHTML = component.render();
		}
	}
}
