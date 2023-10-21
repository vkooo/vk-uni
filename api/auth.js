import request from './../utils/request';

export function login(data) {
	return request({
		url: '/login',
		method: 'POST',
		data
	})
}

export function wechat(data) {
	return request({
		url: '/authorize/wechat',
		method: 'GET',
		data
	})
}

export function wechatMini(data) {
	return request({
		url: '/authorize/wechat/mini',
		method: 'GET',
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

export function getLoginSmsCode(template, data) {
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