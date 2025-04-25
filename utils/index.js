import env from '@/env';
import store from '@/store';

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

export function back() {
	if (getCurrentPages().length > 1) {
		uni.navigateBack()
	} else {
		const homePath = store.getters["website/tabbar"].btns[0].pagePath;
		reLaunch(homePath);
	}
}

export function getCurrentPage() {
	const pages = getCurrentPages(); //获取加载的页面
	const currentPage = pages[pages.length - 1]; //获取当前页面的对象
	const currentUrl = '/' + (currentPage.route ? currentPage.route : currentPage.__route__); //当前页面url 
	// opts = currentPage.$vm.opt;
	return currentUrl;
}

export function navigateTime(url, timeout = 1000) {
	setTimeout(function() {
		navigate(url)
	}, timeout)
}

export function navigate(url) {
	uni.navigateTo({
		url: url,
		success(e) {
			console.log(e)
		},
		fail(err) {
			console.log(err)
		}
	})
}

export function reLaunch(url) {
	uni.reLaunch({
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

export function hideKeyboard(){
	uni.hideKeyboard()
}

export function timeFormart(value, format = "yyyy-mm-dd") {
	const fun = uni.$u.timeFormat;
	console.log(timeFormat(value, 'yyyy-mm-dd'));
	console.log(timeFormat(value, 'yyyy-mm-dd hh:MM'));
	console.log(timeFormat(value, 'yyyy-mm'));
	return fun(value, format);
}

export function setAvatar(avatar){
	return avatar? avatar: '../../static/image/avatar.png'
}

export function minYear(min = 100){
	let currentDate = new Date();
	// 获取当前年份
	let currentYear = currentDate.getFullYear();
	// 将当前年份减去100
	let newYear = currentYear - min;
	// 将当前时间设置为减去100年后的时间
	currentDate.setFullYear(newYear);
	let timestamp = currentDate.getTime();
	return timestamp
}

export function objectToUrl(obj){
	return Object.keys(obj)
    .map(key => {
        if (obj[key]) {
            return `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`;
        } else {
            return '';
        }
    })
    .filter(param => param !== '') // 过滤掉空参数
    .join('&');
}

/**
 * 获取元素信息
 * let rectOther = await this.getRect(".other")
 * @param {Object} selector
 */
export function getRect(selector){
	return new Promise((resolve,reject)=>{
		let view =  uni.createSelectorQuery().in(this)
		view.select(selector).boundingClientRect(rect=>{
			resolve(rect)
		}).exec();
	})
}

export function previewImg(imgsArray, index = 0){
	uni.previewImage({
	    current: imgsArray[index],
	    urls: imgsArray
	});
}

export function isEmpty(value, checkArr) {
	if (checkArr) {
		if (Array.isArray(value)) {
			if (!value.length) {
				return true;
			}
		}
	}
	return value === '' || value === ' ' || value === undefined || value === null || value === 'null'
}
