import request from './../utils/request';

export function moneyLog(data) {
	return request({
		url: '/finance/moneyLog',
		method: 'GET',
		data
	})
}


export function scoreLog(data) {
	return request({
		url: '/finance/scoreLog',
		method: 'GET',
		data
	})
}

export function chargeInit() {
	return request({
		url: '/finance/charge/init',
		method: 'GET',
	})
}

export function chargeSubmit(data) {
	return request({
		url: '/finance/charge/submit',
		method: 'POST',
		data
	})
}

export function chargeLists(data) {
	return request({
		url: '/finance/charge/lists',
		method: 'GET',
		data
	})
}

export function chargeRecord(data) {
	return request({
		url: '/finance/charge/record',
		method: 'GET',
		data
	})
}

export function withdrawLists(data) {
	return request({
		url: '/finance/withdraw/lists',
		method: 'GET',
		data
	})
}

export function withdrawInit() {
	return request({
		url: '/finance/withdraw/init',
		method: 'GET',
	})
}

export function withdrawSubmit(data) {
	return request({
		url: '/finance/withdraw/submit',
		method: 'POST',
		data
	})
}

export function withdrawRecord(data) {
	return request({
		url: '/finance/withdraw/record',
		method: 'GET',
		data
	})
}