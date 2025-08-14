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
	cryptoSecret: "MaYoaMQ3zpWJFWtN9mqJqKpHrkdFwLd9DDlFWk2NnVR1mChVRI6THVe6KsCnhpoR"
}
