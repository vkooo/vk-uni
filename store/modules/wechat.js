import { wechat } from '@/api/oauth';
import { getUrlQuery } from '@/utils';
import env from '@/utils/env';
import { $reload } from '@/utils/platform.js';

const state = {},
getters = {},
mutations = {}
, actions = {
	authorize({ commit }) {
		let code = getUrlQuery("code")
		if(code){
			wechat({
				code: code
			}).then(res=>{
				console.log(res)
				if(res.code == 200){
					commit('member/setUserInfo', res.data, { root: true })
					uni.reLaunch({
						url: "/pages/tabBar/index",
					})
				}else{
					this._vm.$u.toast(res.msg)
					uni.showModal({
						title: '授权失败',
						content: '是否重新授权？',
						success: function(res) {
							if (res.confirm) {
								$reload()
							} 
						}
					})
				}
			})
		}else{
			let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + env.wxappid +
					'&redirect_uri=' + encodeURIComponent(window.location.href) +
					'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
					
			window.location.href = url
		}
	   
	}
};

export default {
    namespaced: true,
	state,
	getters,
	mutations,
    actions
}
