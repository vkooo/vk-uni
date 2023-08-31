import request from './../utils/request';

export function banner() {
	return request({
		url: 'banner',
		method: 'POST',
	})
}
