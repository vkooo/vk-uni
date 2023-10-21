import { wechat, login, loginBySms } from '@/api/auth.js';
import { info } from '@/api/member.js';
import { getUrlQuery } from '@/utils';
import { getRedirectUrl } from '@/utils/platform';
import { setToken, removeToken } from '@/utils/auth.js';
import env from '@/env';
import { Base64 } from 'js-base64';
let infoHistory = uni.getStorageSync('userInfo') || {};

const state = {
	hasLogin: Boolean(Object.keys(infoHistory).length),
	info: infoHistory,
	redirect: ""
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
	SET_USER_INFO(state, data) { 
		state.hasLogin = true;
		state.info = data;
		console.log(data)
		if(data.token){
			setToken(data.token)
		}
		uni.setStorageSync('userInfo', data)
	},
	CLEAR_USER_INFO(state) {
		state.info = {};
		state.hasLogin = false;
		removeToken();
		uni.removeStorageSync('userInfo')
	},
	SET_REDIRECT(state, redirect){
		state.redirect = redirect
	},
	REDIRECT(state, redirectUrl){
		if(redirectUrl){
			redirectUrl = decodeURIComponent(Base64.decode(redirectUrl))
		}else{
			redirectUrl = "pages/tabBar/member"
			if(state.redirect){
				redirectUrl = decodeURIComponent(Base64.decode(state.redirect))
			}
		}
		state.redirect = ""
		setTimeout(function(){
			uni.reLaunch({
				url: "/" + redirectUrl
			})
		},500)
	}
}
, actions = {
	//#ifdef H5
	wxOauth({ commit }) {
		let code = getUrlQuery("code")
		const searchParams = new URLSearchParams(getUrlQuery("state"));
		if(code){
			wechat({
				code: code,
				ii: uni.getStorageSync('ii'),
			}).then(res=>{
				console.log(res)
				if(res.code == 200){
					commit('SET_USER_INFO', data)
					const redirect = searchParams.get('redirect');
					
					commit('REDIRECT', redirect)
					window.location.href = url
				}else{
					this._vm.$u.toast(res.msg)
					uni.showModal({
						title: '授权失败',
						content: '请重新进行授权',
						success: function(res) {
							if (res.confirm) {
								uni.reLaunch({
									url: "/pages/auth/login"
								})
							} 
						}
					})
				}
			})
		}else{
			setTimeout(function(){
				
				let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + env.wxappid +
						'&redirect_uri=' + env.redirectUrl +
						'&response_type=code&scope=snsapi_userinfo'+
						"&state=" + getRedirectUrl()
						'#wechat_redirect';
				window.location.href = url
			}, 100)
		}
	   
	},
	//#endif
	//#ifdef MP-WEIXIN
	wxOauth({ commit }) {
		
	   
	},
	//#endif
	setRedirect({ commit }, url){
		commit('SET_REDIRECT', url)
	},
	login({ commit }, param) {
		param.ii = uni.getStorageSync('ii')
	    login(param).then(response => {
	    	if(response.code == 200){
	    		const { data } = response;
	    		commit('SET_USER_INFO', data)
				commit('REDIRECT')
	    	}
	    	
	    }).catch(error => {
	        console.log(error)
	    })
	},
	loginBySms({ commit }, param) {
		param.ii = uni.getStorageSync('ii')
	    loginBySms(param).then(response => {
	    	if(response.code == 200){
	    		const { data } = response;
	    		commit('SET_USER_INFO', data)
				commit('REDIRECT')
	    	}
	    	
	    }).catch(error => {
	        console.log(error)
	    })
	},
	getInfo({ commit }){
		info().then(response => {
			if(response.code == 200){
				const { data } = response;
				commit('SET_USER_INFO', data)
			}
		}).catch(error => {
		    console.log(error)
		})
	},
	logout({ commit }){
		commit("CLEAR_USER_INFO")
		uni.reLaunch({
			url: "/pages/auth/login"
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
