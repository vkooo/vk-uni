import App from './App'

import uView from "uview-ui";
import store from 'store/index.js'
import { isMiniProgram, isWechat } from '@/utils/platform'
import styleMixin from '@/mixins/styleMixin.js'
import ws from '@/utils/ws.js'
import * as utils from '@/utils'
import * as upload from '@/utils/upload'
import '@/static/css/quill/snow.scss'
import GlobalException from '@/exception/GlobalException.js';
Vue.prototype.$utils = utils
Vue.prototype.$upload = upload


Vue.use(uView);
Vue.mixin(styleMixin)

Vue.prototype.$throw = function (message) {
	this.$u.toast(message)
	throw new GlobalException(message);
};

Vue.prototype.$ws = ws
// if (!store.state.member.hasLogin) {
// 	// #ifdef H5
// 	// 公众号
// 	if(isWechat() && !isMiniProgram()){
// 		store.dispatch('wechat/authorize');
// 	}
// 	// #endif
// }

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

try {
	function isPromise(obj) {
		return (
			!!obj &&
			(typeof obj === "object" || typeof obj === "function") &&
			typeof obj.then === "function"
		);
	}

	// 统一 vue2 API Promise 化返回格式与 vue3 保持一致
	uni.addInterceptor({
		returnValue(res) {
			if (!isPromise(res)) {
				return res;
			}
			return new Promise((resolve, reject) => {
				res.then((res) => {
					if (res[0]) {
						reject(res[0]);
					} else {
						resolve(res[1]);
					}
				});
			});
		},
	});
} catch (error) {}

const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif