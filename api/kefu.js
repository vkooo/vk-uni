import request from './../utils/request';

export function init(data) {
	return request({
		url: '/addons/kefu/init',
		method: 'GET',
		data
	})
}

export function sendApi(data) {
	return request({
		url: '/addons/kefu/send',
		method: 'POST',
		data
	})
}

export function history(data) {
	return request({
		url: '/addons/kefu/history',
		method: 'GET',
		data
	})
}