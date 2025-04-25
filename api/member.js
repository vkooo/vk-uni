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

export function setPayPassword(data) {
	return request({
		url: '/set_pay_password',
		method: 'POST',
		data
	})
}

export function getRealname() {
	return request({
		url: '/get_realname',
		method: 'GET',
	})
}

export function setRealname(data) {
	return request({
		url: '/set_realname',
		method: 'POST',
		data
	})
}


export function bankcardLists(data) {
	return request({
		url: '/member/bankcard/lists',
		method: 'GET',
		data
	})
}

export function bankcardInit(data) {
	return request({
		url: '/member/bankcard/init',
		method: 'GET',
		data
	})
}

export function bankcardSubmit(data) {
	return request({
		url: '/member/bankcard/submit',
		method: 'POST',
		data
	})
}
