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

export function withdrawInit() {
	return request({
		url: '/finance/withdraw/init',
		method: 'GET',
	})
}

export function chargeRecord(data) {
	return request({
		url: '/finance/charge/record',
		method: 'GET',
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