import Vue from 'vue'
import Vuex from 'vuex'
import member from './modules/member'
import website from './modules/website'
Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		member,
		website
	}
});

export default store
