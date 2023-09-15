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

