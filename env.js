"use strict";

export default { //存放变量的容器
	baseApi: '/api',
	//#ifdef APP || MP
	baseUrl: 'http://vk.ak7.cc',
	//#endif
	
	wxappid: "wx89bc57b9eb5e0e1d",
	//#ifdef H5
	redirectUrl: window.location.origin + "/h5",
	//#endif
	
	wsUrl: 'wss://pw.vk4.cn:8283',
}
