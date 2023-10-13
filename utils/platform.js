import { removeToken } from '../utils/auth';
import Vue from 'vue';
import store from '@/store'

export function isWechat() {
	return String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) === "micromessenger";
}

export function isMiniProgram() {
	return String(navigator.userAgent.toLowerCase().match(/miniProgram/i)) === "miniprogram";
}