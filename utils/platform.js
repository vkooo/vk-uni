export function isWechat() {
	return String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) === "micromessenger";
}

export function isMiniProgram() {
	return String(navigator.userAgent.toLowerCase().match(/miniProgram/i)) === "miniprogram";
}

export function $reload() {
	let urlWithoutCode = window.location.href.replace(/code=.*/, '');
	
	window.location.href = urlWithoutCode
}