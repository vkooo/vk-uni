import request from './../utils/request';

export function website() {
	return request({
		url: '/website',
		method: 'GET',
	})
}

export function address() {
	return request({
		url: '/common/address',
		method: 'GET',
	})
}
