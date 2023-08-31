import Vue from 'vue'
import Vuex from 'vuex'
import member from './modules/member'
import wechat from './modules/wechat'
Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		member,
		wechat
	}
});

export default store
