"use strict";

export default { //存放变量的容器
	baseApi: '/api',
	//#ifdef APP || MP
	baseUrl: 'http://vk.ak7.cc',
	//#endif
	
	wxappid: "wx67ce8b381ff6f3c7",
	//#ifdef H5
	redirectUrl: window.location.origin + "/h5",
	//#endif
}
