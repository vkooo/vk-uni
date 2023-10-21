import { removeToken } from '../utils/auth';
import Vue from 'vue';
import store from '@/store'
import { Base64 } from 'js-base64'

export function isWechat() {
	return String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) === "micromessenger";
}

export function isMiniProgram() {
	return String(navigator.userAgent.toLowerCase().match(/miniProgram/i)) === "miniprogram";
}

export function getPlatform() {
	// #ifdef MP-WEIXIN
	return "wx_mini"
	// #endif
	
	// #ifdef H5
	if(isWechat()){
		return "wx_official"
	}
	return "h5"
	// #endif
	console.log()
	// #ifdef APP
	return 'app'
	// #endif
}

export function getRedirectUrl() {
	let pathOptions = uni.getLaunchOptionsSync()
	const queryString = Object.keys(pathOptions.query)
	  .map(key => `${key}=${encodeURIComponent(pathOptions.query[key])}`)
	  .join('&');
	let redirect = pathOptions.path + (queryString? "?" + queryString: "" )
	
	if(['pages/auth/login', 'pages/auth/code'].indexOf(redirect) < 0){
		return "redirect=" + encodeURIComponent(Base64.encodeURL(redirect))
	}
	return ""
}
