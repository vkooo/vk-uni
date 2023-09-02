import request from './../utils/request';

export function website() {
	return request({
		url: '/website',
		method: 'GET',
	})
}
