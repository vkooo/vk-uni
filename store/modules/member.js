import { wechatOfficial, wechatMini, wechatApp, login, loginBySms } from '@/api/auth.js';
import { info } from '@/api/member.js';
import * as platformUtils from '@/utils/platform';
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
		// console.log(data)
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
			redirectUrl = "pages/index/index"
			if(state.redirect){
				redirectUrl = decodeURIComponent(Base64.decode(state.redirect))
			}
		}
		// console.log(redirectUrl)
		state.redirect = ""
		uni.reLaunch({
			url: "/" + redirectUrl
		})
	}
}
, actions = {
	//#ifdef H5
	wxOauth({ commit }) {
		let code = platformUtils.getUrlQuery("code")
		const searchParams = new URLSearchParams(platformUtils.getUrlQuery("state"));
		if(code){
			wechatOfficial({
				code: code,
				ii: uni.getStorageSync('ii'),
			}).then(res=>{
				if(res.code == 200){
					commit('SET_USER_INFO', res.data)
					let redirect = platformUtils.getUrlQuery('redirect');
					if(redirect){
						redirect = decodeURIComponent(Base64.decode(redirect))
					}
					window.location.href = `${env.redirectUrl}/#/${redirect}`
				}else{
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					})  
					uni.showModal({
						title: '授权失败',
						content: '请重新微信授权',
						success: function(res) {
							if (res.confirm) {
								platformUtils.getWxCode()
							} 
						}
					})
				}
			})
		}else{
			platformUtils.getWxCode()
		}
	},
	//#endif
	//#ifdef MP-WEIXIN || APP-PLUS
	wxOauth({ commit }) {
		uni.login({
		    provider: 'weixin',
			//#ifdef APP-PLUS
			onlyAuthorize: true,
			//#endif
		    success(res) {
				let api
					, params = {
					code: res.code,
					ii: uni.getStorageSync('ii'),
				}
				//#ifdef MP-WEIXIN
				api = wechatMini(params)
				//#endif
				
				//#ifdef APP-PLUS
				api = wechatApp(params)
				//#endif
				api.then(res=>{
					if(res.code == 200){
						commit('SET_USER_INFO', res.data)
						commit('REDIRECT')
					}else{
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						})  
					}
				})
		    },
			fail(err) {
		        console.log(err)
		    }
		})
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
