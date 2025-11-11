"use strict";

export default { //存放变量的容器
	baseApi: '/api',
	baseUrl: 'https://vk.ak7.cc',
	
	wxappid: "wx89bc57b9eb5e0e1d",
	//#ifdef H5
	redirectUrl: window.location.origin + "/h5",
	//#endif
	
	wsUrl: 'wss://vk.ak7.cc/wss',
	
	// 加密参数
	cryptoSecret: "MaYoaMQ3zpWJFWtN9mqJqKpHrkdFwLd9DDlFWk2NnVR1mChVRI6THVe6KsCnhpoR",
	
	
	tabs: {
		activeStyle: {
			color: '#000000',
			transform: 'scale(1.05)',
			fontSize: '28rpx',
			fontWeight: '500',
		},
		inactiveStyle: {
			color: '#909090',
			transform: 'scale(1)',
			fontSize: '26rpx',
			fontWeight: '400',
		},
		lineColor: "linear-gradient(135deg, #0A0F4C, #0D1C87)",
		// activeStyle: {
		// 	color: '#ffffff',
		// 	transform: 'scale(1.05)',
		// 	fontSize: '32rpx',
		// 	fontWeight: '500',
		// },
		// inactiveStyle: {
		// 	color: '#8E94B3',
		// 	transform: 'scale(1)',
		// 	fontSize: '32rpx',
		// 	fontWeight: '500',
		// }
	},
	form: {
		labelStyle: {
			color: '#333333',
			fontSize: '14px'
			// color: '#ffffff'
		}
	}
}
