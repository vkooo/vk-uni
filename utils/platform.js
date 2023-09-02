import {removeToken} from '../utils/auth';
export function isWechat() {
	return String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) === "micromessenger";
}

export function isMiniProgram() {
	return String(navigator.userAgent.toLowerCase().match(/miniProgram/i)) === "miniprogram";
}

export function $reLogin() {
	removeToken()
	uni.removeStorageSync('userInfo')
	if(isMiniProgram()){
		uni.login({
			provider: 'weixin',
			success:res => {
				Vue.prototype.$store.dispatch("user/autoAuth", res.code)
			},
			fail(err) {
				console.log(err)
			}
		});		
		return
	}
	// let platform = uni.getSystemInfoSync().platform
	// console.log(platform)
	// if (platform == "android" || platform == "ios") {
		
	// 	return
	// }
	// #ifdef APP-PLUS
	
	// #endif
	
	
	// #ifdef H5
	if(isWechat()){
		let urlWithoutCode = window.location.href.replace(/code=.*/, '');
		console.log(urlWithoutCode)
		window.location.href = urlWithoutCode
	}else{
		// 浏览器
	}
	// #endif
	return
}