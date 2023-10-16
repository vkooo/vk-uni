import { wechat, login, loginBySms, info } from '@/api/member.js';
import { getUrlQuery } from '@/utils';
import { isWechat } from '@/utils/platform';
import { setToken } from '@/utils/auth.js';

import env from '@/env';
import { reLogin } from '@/utils/platform.js';
import { Base64 } from 'js-base64';
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
		console.log(data)
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
	},
	redirect(){
		let redirectUrl = uni.getLaunchOptionsSync().query.redirect;
		if(redirectUrl){
			redirectUrl = decodeURIComponent(Base64.decode(redirectUrl))
		}else{
			redirectUrl = "pages/tabBar/member"
		}
		setTimeout(function(){
			uni.reLaunch({
				url: "/" + redirectUrl
			})
		},500)
	}
}
, actions = {
	//#ifdef MP-WEIXIN
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
	//#endif
	login({ commit }, param) {
	    login(param).then(response => {
	    	if(response.code == 200){
	    		const { data } = response;
	    		commit('setUserInfo', data)
				commit('redirect')
	    	}
	    	
	    }).catch(error => {
	        console.log(error)
	    })
	},
	loginBySms({ commit }, param) {
	    loginBySms(param).then(response => {
	    	if(response.code == 200){
	    		const { data } = response;
	    		commit('setUserInfo', data)
				commit('redirect')
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
