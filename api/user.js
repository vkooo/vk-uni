import request from './../utils/request';

export function login(data) {
	return request({
		url: 'login',
		method: 'POST',
		data
	})
}

export function register(data) {
	return request({
		url: 'register',
		method: 'POST',
		data
	})
}

export function captcha() {
	return request({
		url: 'captcha',
		method: 'GET',
	})
}

export function yuebao(data) {
	return request({
		url: 'my/yuamount',
		method: 'POST',
		data
	})
}
export function yeboperation(data) {
	return request({
		url: 'my/yeboperation',
		method: 'POST',
		data
	})
}
export function addbank(data) {
	return request({
		url: 'my/addbank',
		method: 'POST',
		data
	})
}