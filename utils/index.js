import env from './env';


export function navigateTo(url) {
	setTimeout(function() {
		uni.navigateTo({
			url: url
		})
	}, 1000)
}

export function getLocation() {
	uni.getLocation({
		type: 'wgs84',
		success: function(res) {
			uni.setStorageSync('lng', res.longitude)
			uni.setStorageSync('lat', res.latitude)
		},
		fail(err) {
			console.log(err)
		}
	});
}
export function getCurrentTime() {
	let date = new Date()
	let Y = date.getFullYear()
	let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
	let D = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()
	let hours = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()
	let minutes = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()
	date = Y + '-' + M + '-' + D + ' ' + hours + ':' + minutes
	// console.log(date) //2019-10-12 15:19
	return date
}

export function copy(data) {
	uni.setClipboardData({
		data: data,
		success: function(res) {
			uni.showToast({
				title: "复制成功",
				icon: "none",
				mask: true
			})
		}
	})
}

export function navigate(url) {
	uni.navigateTo({
		url: url
	})
}

export function redirectTo(url) {
	uni.redirectTo({
		url: url
	});
}

export function switchTab(url) {
	uni.switchTab({
		url: url
	});
}

export function callPhone(phone) {
	uni.makePhoneCall({
		phoneNumber: phone,//电话号码
		success:function(e){
			console.log(e);
		},
		fail:function(e){
			console.log(e);
		}
	})
}

export function getUrlQuery(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) ||[, ''])[1].replace(/\+/g, '%20')) || null
}