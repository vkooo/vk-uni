import {getToken, removeToken} from '../utils/auth';
import env from '@/env';
import { getRedirectUrl } from '@/utils/platform.js';
import store from 'store/index.js'

function service(options = {}) {
	let baseUrl = ""
	if(env.baseUrl){
		baseUrl = env.baseUrl
	}
	options.url = `${baseUrl}${env.baseApi}${options.url}`;
	// 判断本地是否存在token，如果存在则带上请求头
	if (getToken()) {
		options.header = {
			'content-type': 'application/json',
			'Authtoken': `${getToken()}`	// 这里是token(可自行修改)
		};
	}
	options.data = options.data? options.data: {},
	options.data.timestamp = Date.now();
// return new Promise((r, e) => {})
	return new Promise((resolved, rejected) => {
		options.success = (res) => {
			// console.log(res.data)
			uni.hideLoading()
			if (res.data.code !== 200) {
				if (res.data.code === 401) {
					// removeToken()
					store.commit("member/CLEAR_USER_INFO")
					uni.showModal({
						title: '登录状态已过期',
						content: '登录状态已过期，请重新登录？',
						success: function(res) {
							if (res.confirm) {
								let url = getRedirectUrl()
								store.dispatch("member/setRedirect", url)
								uni.reLaunch({
									url: "/pages/auth/login?redirect=" + url
								})
							} 
						}
					})
					return
				}else{
					uni.showToast({
						icon: 'none',
						duration: 3000,
						title: res.data.msg || '服务器错误,请稍后再试'
					});
				}
			} 
			resolved(res.data)
		};
		options.fail = (err) => {
			uni.hideLoading()
			uni.showToast({
				icon: 'none',
				duration: 3000,
				title: '服务器错误,请稍后再试'
			});
			rejected(err);
		};
		uni.request(options);
	});
}

export default service;
