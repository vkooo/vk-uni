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
		url: '/setProfile',
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

export function getSmsCode(data) {
	return request({
		url: '/authorize/getSmsCode',
		method: 'POST',
		data
	})
}
