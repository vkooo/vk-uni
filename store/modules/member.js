import { wechat, login } from '@/api/member.js';
import { getUrlQuery } from '@/utils';
import env from '@/utils/env';
import { reLogin } from '@/utils/platform.js';
let infoHistory = uni.getStorageSync('userInfo') || {};

const state = {
	hasLogin: Boolean(Object.keys(infoHistory).length),
	info: infoHistory
},
getters = {
	info(state) {
		return state.info;
	},
	hasLogin(state){
		return state.hasLogin;
	}
},
mutations = {
	setUserInfo(state, data) { 
		state.hasLogin = true;
		state.info = data;
		if(data.token){
			setToken(data.token)
		}
		uni.setStorageSync('userInfo', data)
	},
	logout(state) {
		state.info = {};
		state.hasLogin = false;
		removeToken();
		uni.removeStorageSync('userInfo')
	}
}
, actions = {
	wxOauth({ commit }) {
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
					commit('setUserInfo', data)
					const redirect = searchParams.get('redirect');
					let url = env.redirectUrl
					// console.log(redirect)
					// if(redirect){
					// 	url = url + "/#/" + redirect
					// 	// window.location.href = url
					// }
					window.location.href = url
				}else{
					this._vm.$u.toast(res.msg)
					uni.showModal({
						title: '授权失败',
						content: '是否重新授权？',
						success: function(res) {
							if (res.confirm) {
								reLogin()
							} 
						}
					})
				}
			})
		}else{
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
	   
	},
	login({ commit }, param) {
	    login(param).then(response => {
	    	if(response.code == 200){
	    		const { data } = response;
	    		commit('setUserInfo', data)
	    	}
	    	
	    }).catch(error => {
	        console.log(error)
	    })
	},
	getInfo({ commit }){
		info().then(response => {
			if(response.code == 200){
				const { data } = response;
				commit('setUserInfo', data)
			}
		}).catch(error => {
		    console.log(error)
		})
	}
};

export default {
    namespaced: true,
	state,
	getters,
	mutations,
    actions
}
