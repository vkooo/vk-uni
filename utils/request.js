import {getToken, removeToken} from '../utils/auth';
import env from '@/env';
import crypto from '@/utils/crypto.js';
import { getRedirectUrl } from '@/utils/platform.js';
import store from 'store/index.js'

function service(options = {}) {
	let baseUrl = ""
	if(env.baseUrl){
		baseUrl = env.baseUrl
	}
	options.url = `${baseUrl}${env.baseApi}${options.url}`;
	// 判断本地是否存在token，如果存在则带上请求头
	const token = getToken();
	if (token) {
		options.header = {
			...options.header,
			'content-type': 'application/json',
			'Authtoken': token
		};
	}
	options.data = options.data || {}
	options.data.timestamp = Date.now().toString();
	
	options.header = options.header || {};
	
	options.header["VK-SK"] = crypto(options.data);
	
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
			uni.getNetworkType({
				success: res=> {
					if(res.networkType === "none"){
						//网络类型 wifi、2g、3g、4g、ethernet、unknown、none
						console.log("当前无网络");
						rejected(err);
						return
					}
					uni.showToast({
						icon: 'none',
						duration: 3000,
						title: '服务器错误,请稍后再试'
					});
				}
			})
			rejected(err);
		};
		uni.request(options);
	});
}

export default service;
