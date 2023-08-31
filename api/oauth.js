import request from './../utils/request';

export function wechat(data) {
	return request({
		url: '/authorize/wechat',
		method: 'get',
		data
	})
}

