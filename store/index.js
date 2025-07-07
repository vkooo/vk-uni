import Vue from 'vue'
import Vuex from 'vuex'
import member from './modules/member'
import website from './modules/website'
import kefu from './modules/kefu'
Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		website,
		member,
		kefu
	}
});

export default store
