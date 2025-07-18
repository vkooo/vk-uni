import store from '@/store'
import { Base64 } from 'js-base64'
import env from '@/env';

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
	
	// #ifdef MP-MP-ALIPAY
	return "ali_mini"
	// #endif
	
	// #ifdef H5
	if(isWechat()){
		return "wx_official"
	}
	return "h5"
	// #endif
	
	// #ifdef APP
	const systemInfo = uni.getSystemInfoSync();
	return systemInfo.platform
	// #endif
}

export function getUrlQuery(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) ||[, ''])[1].replace(/\+/g, '%20')) || null
}

export function getRedirectUrl() {
	let pathOptions = uni.getLaunchOptionsSync()
	const queryString = Object.keys(pathOptions.query)
	  .map(key => `${key}=${encodeURIComponent(pathOptions.query[key])}`)
	  .join('&');
	let redirect = pathOptions.path + (queryString? "?" + queryString: "" )
	
	if(['pages/auth/login', 'pages/auth/code'].indexOf(redirect) < 0){
		return encodeURIComponent(Base64.encodeURL(redirect))
	}
	return ""
}

// #ifdef H5
export function getWxCode() {
	let urlRedirect = `${env.redirectUrl}?redirect=${getRedirectUrl()}`
	let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + env.wxappid +
			'&redirect_uri=' + urlRedirect +
			'&response_type=code&scope=snsapi_userinfo'+
			"&state=1" +
			'#wechat_redirect';
	window.location.href = url
}
// #endif

/**
 * 获取手机型号
 */
export function getBrand(){
	let brand = null
	// #ifdef APP
	if(uni.getSystemInfoSync().platform === 'android'){
		brand = uni.getSystemInfoSync().brand.toLowerCase();
	}
	// #endif
	return brand
}