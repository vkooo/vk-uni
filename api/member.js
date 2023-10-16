import request from './../utils/request';

export function login(data) {
	return request({
		url: '/login',
		method: 'POST',
		data
	})
}

export function info() {
	return request({
		url: '/info',
		method: 'GET',
	})
}

export function setProfile(data) {
	return request({
		url: '/set_profile',
		method: 'POST',
		data
	})
}

export function setMobile(data) {
	return request({
		url: '/set_mobile',
		method: 'POST',
		data
	})
}


export function setPassword(data) {
	return request({
		url: '/set_password',
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