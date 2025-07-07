import env from '@/env';
import {getToken} from '../utils/auth';
/*
 * 单图上传
 * @param object opt
 * @param callable successCallback 成功执行方法 data 
 * @param callable errorCallback 失败执行方法 
 *
 let that = this
 this.$upload.uploadImage({
	count: count, // 默认1
	sizeType: ['compressed'], // 是否压缩
	sourceType: ['album', 'camera'], // 选择位置
 }, function(res) {
 	let url = res.full_url
 	setProfile({
 		avatar: url
 	}).then(res=>{
 		that.avatar = url
 		that.$forceUpdate()
 	})
 })
 
 */
export function uploadFile(opt, successCallback, errorCallback) {
	let that = this;
	if (typeof opt === 'string') {
		let url = opt;
		opt = {};
		opt.url = url;
	}
	let count = opt.count || 1,
		type = opt.type || "all",
		sourceType = opt.sourceType || [],
		is_load = opt.is_load || true;

	uni.chooseFile({
		count: count, //最多可以选择的图片总数  
		type: type, // 所选的文件的类型 默认all  
		sourceType: sourceType, // 可以指定来源是相册还是相机，默认二者都有  
		success: async function(res) {
			//启动上传等待中...  
			uni.showLoading({
				title: '文件上传中',
			});
			
			let arr = []
			for(let i in res.tempFilePaths){
				let uploadApiRes = await uploadApi(res.tempFilePaths[i])
				
				if(uploadApiRes.statusCode == 200){
					let data = uploadApiRes.data ? JSON.parse(uploadApiRes.data) : {};
					if(data.code == 200){
						arr.push(data.data)
					}
				}
			}
			
			uni.hideLoading();
			if(count == 1){
				return successCallback(arr[0])
			}
			successCallback(arr);
			// uni.uploadFile({
			// 	url: env.baseUrl + '/upload',
			// 	filePath: res.tempFilePaths[0],
			// 	name: "file",
			// 	header: {
			// 		// #ifdef MP
			// 		"Content-Type": "multipart/form-data",
			// 		// #endif
			// 		"Token": `${getToken()}`
			// 	},
			// 	success: function(res) {
			// 		uni.hideLoading();
			// 		let data = res.data ? JSON.parse(res.data) : {};
			// 		if (data.code == 200) {
			// 			successCallback && successCallback(data.data)
			// 		} else {
			// 			errorCallback && errorCallback(data);
			// 			that.$u.toast(res.msg)
			// 		}
			// 	},
			// 	fail: function(res) {
			// 		uni.hideLoading();
			// 		that.$u.toast("上传图片失败")
			// 	}
			// })
		},
		fail: function(res) {
			uni.hideLoading();
			console.log(res)
		}
	})
}

export function uploadImage(opt, successCallback, errorCallback) {
	let that = this;
	if (typeof opt === 'string') {
		let url = opt;
		opt = {};
		opt.url = url;
	}
	let count = opt.count || 1,
		sizeType = opt.sizeType || ['compressed'],
		sourceType = opt.sourceType || ['album', 'camera'],
		is_load = opt.is_load || true;
	
	uni.chooseImage({
		count: count, //最多可以选择的图片总数  
		sizeType: sizeType, // 可以指定是原图还是压缩图，默认二者都有  
		sourceType: sourceType, // 可以指定来源是相册还是相机，默认二者都有  
		success: async function(res) {
			//启动上传等待中...  
			uni.showLoading({
				title: '图片上传中',
			});
			
			let arr = []
			for(let i in res.tempFilePaths){
				let uploadApiRes = await uploadApi(res.tempFilePaths[i])
				
				if(uploadApiRes.statusCode == 200){
					let data = uploadApiRes.data ? JSON.parse(uploadApiRes.data) : {};
					if(data.code == 200){
						arr.push(data.data)
					}
				}
				// return
				// uni.uploadFile({
				// 	url: url,
				// 	filePath: res.tempFilePaths[i],
				// 	name: "file",
				// 	header: {
				// 		// #ifdef MP
				// 		"Content-Type": "multipart/form-data",
				// 		// #endif
				// 		"Token": `${getToken()}`
				// 	},
				// 	success: function(res) {
				// 		uni.hideLoading();
				// 		let data = res.data ? JSON.parse(res.data) : {};
				// 		if (data.code == 200) {
				// 			successCallback && successCallback(data.data)
				// 		} else {
				// 			errorCallback && errorCallback(data);
				// 			that.$u.toast(res.msg)
				// 		}
				// 	},
				// 	fail: function(res) {
				// 		uni.hideLoading();
				// 		that.$u.toast("上传图片失败")
				// 	}
				// })
			}
			uni.hideLoading();
			if(count == 1){
				return successCallback(arr[0])
			}
			successCallback(arr);
		}
	})
}

export async function uploadApi(filePath){
	let baseUrl = ""
	if(env.baseUrl){
		baseUrl = env.baseUrl
	}
	let url = baseUrl + env.baseApi + '/upload'
	return uni.uploadFile({
		url: url,
		filePath: filePath,
		name: "file",
		header: {
			// #ifdef MP
			"Content-Type": "multipart/form-data",
			// #endif
			"Authtoken": `${getToken()}`
		}
	})
}