import Vue from 'vue'
import env from "../env.js"
import store from "@/store"
import { getToken } from '../utils/auth';

// 只有以下方法才能触发事件
const MODE_LIST = [
	"RECEIVE_KEFU_MSG", // 接收客服发送的消息
];

// 开启调试模式
const debug = false
const wsUrl = env.wsUrl

//是否已经连接上ws
let isOpenSocket = false
//心跳间隔，单位毫秒
const heartBeatDelay = 3000
let heartBeatInterval = null
//心跳时发送的消息文本
const heartBeatText = "PING"
//最大重连次数
const reconnectTimes = 10
let reconnectInterval = null
//重连间隔，单位毫秒
const reconnectDelay = 3000


let socketTask = null

//这个参数是防止重连失败之后onClose方法会重复执行reconnect方法，导致重连定时器出问题
//连接并打开之后可重连，且只执行重连方法一次
let canReconnect = false

//封装的对象，最后以模块化向外暴露，
//init方法 初始化socketTask对象
//completeClose方法 完全将socketTask关闭（不重连）
//其他关于socketTask的方法与uniapp的socketTask api一致
let ws = {
	socketTask: null,
	init,
	send,
	completeClose
}

function init() {
	if(isOpenSocket) return
	socketTask = uni.connectSocket({
		url: wsUrl,
		complete: () => {}
	})
	socketTask.onOpen((res) => {
		log("ws连接成功")
		clearInterval(heartBeatInterval)
		clearInterval(reconnectInterval)
		isOpenSocket = true
		canReconnect = true
		//开启心跳机制
		heartBeat()
	})
	socketTask.onMessage((res) => {
		//自定义处理onMessage方法
		try{
			log("接收的原始数据", res)
			const decodedData = atob(res.data);
			const data = JSON.parse(decodedData);
			log("[WebSocket] Received raw data:", res.data);
			log("[WebSocket] Parsed data:", data);
			if (!data || typeof data !== 'object') {
			    throw new Error("Invalid message format: expected object");
			}

			if (data.mode && MODE_LIST.includes(data.mode)) {
				switch(data.mode){
					// 单聊消息
					case "RECEIVE_KEFU_MSG":
						store.dispatch("kefu/receiveMsg", data)
						break;
					
				}
			}
		}catch (error) {
			log("WebSocket message processing failed:", error);
			log("Original message:", res.data);
		}
	})
	socketTask.onClose(() => {
		if (isOpenSocket) {
			log("ws与服务器断开")
		} else {
			log("连接失败")
		}
		isOpenSocket = false
		if (canReconnect) {
			reconnect()
			canReconnect = false
		}
	})
	ws.socketTask = socketTask
}

function heartBeat() {
	heartBeatInterval = setInterval(() => {
		// log(heartBeatText)
		send({
			mode: heartBeatText
		});
	}, heartBeatDelay)
}

function send(value) {
	if(!isOpenSocket)
		Vue.prototype.$throw("ws与服务器断开")
	value.token = getToken()
	value.req_member_id = store.state.member.info.id
	value.identity = "member"
	ws.socketTask.send({
		data: btoa(JSON.stringify(value)),
		success() {
			// success
			store.dispatch('kefu/updateMsgStatus', {
				// id: value.id,
				status: 'success',
				...value
			});
			// log("消息发送成功")
		},
		fail(err) {
			store.dispatch('kefu/updateMsgStatus', {
				// id: value.id,
				status: 'failed',
				...value
			});
			log("消息发送失败", err)
		}
	});
}

function reconnect() {
	//停止发送心跳
	clearInterval(heartBeatInterval)
	//如果不是人为关闭的话，进行重连
	if (!isOpenSocket) {
		let count = 0;
		reconnectInterval = setInterval(() => {
			log("正在尝试重连")
			init();
			count++
			//重连一定次数后就不再重连
			if (count >= reconnectTimes) {
				clearInterval(reconnectInterval)
				log("网络异常或服务器错误")
			}
		}, reconnectDelay)
	}
}

function completeClose() {
	//先将心跳与重连的定时器清除
	clearInterval(heartBeatInterval)
	clearInterval(reconnectInterval)
	canReconnect = false
	if (ws.socketTask) {
		ws.socketTask.close()
	}
}

function log(...data) {
    if(!debug) return

    console.log(data)
}

module.exports = ws