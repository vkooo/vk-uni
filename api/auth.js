import request from './../utils/request';

export function login(data) {
	return request({
		url: '/login',
		method: 'POST',
		data
	})
}

export function logout() {
	return request({
		url: '/logout',
		method: 'GET',
	})
}

export function wechatOfficial(data) {
	return request({
		url: '/authorize/wechat/official',
		method: 'POST',
		data
	})
}

export function wechatMini(data) {
	return request({
		url: '/authorize/wechat/mini',
		method: 'POST',
		data
	})
}

export function wechatApp(data) {
	return request({
		url: '/authorize/wechat/app',
		method: 'POST',
		data
	})
}

export function getCaptcha() {
	return request({
		url: '/get_captcha',
		method: 'GET',
	})
}

export function getSmsCode(template, data) {
	return request({
		url: '/get_sms_code/' + template,
		method: 'POST',
		data
	})
}

export function getLoginSmsCode(data) {
	return request({
		url: '/get_login_sms_code',
		method: 'POST',
		data
	})
}

export function loginBySms(data) {
	return request({
		url: '/login_by_sms',
		method: 'POST',
		data
	})
}