import request from './../utils/request';

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

export function setRealname(data) {
	return request({
		url: '/set_realname',
		method: 'POST',
		data
	})
}
