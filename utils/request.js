import {getToken, removeToken} from '../utils/auth';
import env from '../utils/env';
import { reLogin } from '../utils/platform.js';

function service(options = {}) {
	options.url = `${env.baseUrl}${options.url}`;
	// 判断本地是否存在token，如果存在则带上请求头
	if (getToken()) {
		options.header = {
			'content-type': 'application/json',
			'Authtoken': `${getToken()}`	// 这里是token(可自行修改)
		};
	}
	options.data = options.data? options.data: {}
// return new Promise((r, e) => {})
	return new Promise((resolved, rejected) => {
		options.success = (res) => {
			console.log(res.data)
			uni.hideLoading()
			if (res.data.code !== 200) {
				if (res.data.code === 401) {
					uni.showModal({
						title: '登录状态已过期',
						content: '登录状态已过期，请重新登录？',
						success: function(res) {
							if (res.confirm) {
								reLogin()
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
