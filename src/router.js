import Vue from 'vue';
import Router from 'vue-router';
import Start from './views/Start.vue';
import Stage from './views/Stage.vue';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'start',
			component: Start,
		},
		{
			path: '/stage',
			name: 'stage',
			component: Stage,
		},
	],
});
