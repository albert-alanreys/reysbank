import { AboutUs } from '@/components/screens/about-us/about-us.component.js';
import { Auth } from '@/components/screens/auth/auth.component.js';
import { Home } from '@/components/screens/home/home.component.js';
import { NotFound } from '@/components/screens/not-found/not-found.component.js';

export const ROUTES = [
	{
		path: '/',
		component: Home,
	},
	{
		path: '/auth',
		component: Auth,
	},
	{
		path: '/about-us',
		component: AboutUs,
	},
	{
		path: '/not-found',
		component: NotFound,
	},
];
