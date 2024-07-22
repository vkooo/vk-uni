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


export function getChargeRule() {
	return request({
		url: '/finance/getChargeRule',
		method: 'GET',
	})
}
