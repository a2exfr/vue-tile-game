import Vue from 'vue';
import Vuex from 'vuex';
import game from './modules/game';
import timer from './modules/timer';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		game,
		timer,
	},
});

export default {
	store,
	install(Vue, options) {
		Vue.prototype.$store = store;
	},
};
