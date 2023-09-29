import { wechat } from '@/api/member.js';
import { getUrlQuery, getCurrentPage } from '@/utils';
import env from '@/utils/env';
import { reLogin } from '@/utils/platform.js';

const state = {},
getters = {},
mutations = {}
, actions = {
	authorize({ commit, dispatch }) {
		let code = getUrlQuery("code")
		const searchParams = new URLSearchParams(getUrlQuery("state"));
		const ii = searchParams.get('ii');
		if(code){
			wechat({
				code: code,
				ii: ii,
			}).then(res=>{
				console.log(res)
				if(res.code == 200){
					commit('member/setUserInfo', res.data, { root: true })
					// #ifdef H5
					const redirect = searchParams.get('redirect');
					let url = env.redirectUrl
					console.log(redirect)
					if(redirect){
						url = url + "/#/" + redirect
						// window.location.href = url
					}
					window.location.href = url
					// #endif
				}else{
					this._vm.$u.toast(res.msg)
					uni.showModal({
						title: '授权失败',
						content: '是否重新授权？',
						success: function(res) {
							if (res.confirm) {
								// reLogin()
								dispatch("location")
							} 
						}
					})
				}
			})
		}else{
			dispatch("location")
		}
	},
	location(){
		let ii = getUrlQuery('ii')
			, state = []
		if(ii)
			state.push("ii=" + ii)
		
		setTimeout(function(){
			let path = uni.getLaunchOptionsSync().path
			if(path)
				state.push("redirect=" + path)
			
			let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + env.wxappid +
					'&redirect_uri=' + env.redirectUrl +
					'&response_type=code&scope=snsapi_userinfo'+
					"&state=" + encodeURIComponent(state.join("&"))
					'#wechat_redirect';
			window.location.href = url
		}, 100)
		
	}
};

export default {
    namespaced: true,
	state,
	getters,
	mutations,
    actions
}
