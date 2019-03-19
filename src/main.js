import Vue from 'vue';
import App from './App.vue';
import router from './router';
import storePlugin from './store/index';
import Default from './layouts/default.vue';

Vue.use(storePlugin);
Vue.component('default-layout', Default);

Vue.config.productionTip = false;

new Vue({
	router,
	// store,
	render: h => h(App),
}).$mount('#app');
