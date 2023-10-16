import request from './../utils/request';


export function lists(data) {
	return request({
		url: '/member/address/lists',
		method: 'GET',
	})
}

export function create(data) {
	return request({
		url: '/member/address/create',
		method: 'POST',
		data
	})
}

export function findById(id) {
	return request({
		url: '/member/address/findById/' + id,
		method: 'GET',
	})
}

export function update(data) {
	return request({
		url: '/member/address/update',
		method: 'PUT',
		data
	})
}

export function del(id) {
	return request({
		url: '/member/address/delete/' + id,
		method: 'delete',
	})
}

export function setDefault(id) {
	return request({
		url: '/member/address/setDefault/' + id,
		method: 'POST',
	})
}