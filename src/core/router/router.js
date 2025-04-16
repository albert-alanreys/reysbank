import { ROUTES } from './routes.data';

export class Router {
	#routes;
	#currentRoute;

	constructor() {
		this.#routes = ROUTES;
		this.#currentRoute = null;

		this.#handleRouteChange();
	}

	getCurrentPath() {
		return globalThis.location.pathname;
	}

	#handleRouteChange() {
		const path = this.getCurrentPath() ?? '/';
		const route =
			this.#routes.find((route) => route.path === path) ??
			this.#routes.find((route) => route.path === '/not-found');

		this.#currentRoute = route;
		this.render();
	}

	render() {
		console.log(this.#currentRoute);

		const component = new this.#currentRoute.component();
		document.getElementById('app').innerHTML = component.render();
	}
}
