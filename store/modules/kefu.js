import Vue from 'vue'
import { init, sendApi, history } from '@/api/kefu';

const state = {
	messages: [],
	kefuInfo: {},
	session_id: null,
	hasMore: true,
	scrollToBottomUUID: ""
},
getters = {
	messageList: state => [...state.messages],
	kefuInfo: state => ({ ...state.kefuInfo }),
	unreadCount: state => state.messages.filter(msg => !msg.read).length,
	hasMore: state => state.hasMore,
	scrollToBottomUUID: state => state.scrollToBottomUUID,
},
mutations = {
	/**
	 * 初始化
	 * @param {Object} state
	 */
	INIT(state, { kefu = {}, session_id = null }) {
		state.kefuInfo = kefu
		state.session_id = session_id
	},
	
	/**
	 * 加载聊天记录
	 * @param {Object} state
	 */
	SET_MESSAGE_LIST(state, { message = [], hasMore = true }) {
		state.messages = [...message, ...state.messages]
		state.hasMore = hasMore
	},
	
	/**
	 * 追加数据
	 * @param {Object} state
	 * @param {Object} message
	 */
	PUSH_MSG(state, message){
		if(message.mode === 'RECEIVE_KEFU_MSG'){
			state.scrollToBottomUUID = new Date().getTime()
		}
		state.messages = [...state.messages, message]
	},
	/**
	 * 清空数据
	 * @param {Object} state
	 */
	RESET_CLEAR(state){
		state.kefuInfo = {}
		state.messages = []
		state.hasMore  = true
		state.session_id = null
	},
}, 
actions = {
	async init({ commit }){
		commit('RESET_CLEAR')
		const res = await init()
		
		if(res.code == 200){
			const { kefuInfo, session_id } = res.data
			commit('INIT', {
				kefuInfo: kefuInfo,
				session_id: session_id
			})
		}
		
	},
	// 上拉加载聊天记录
	async loadMore({ commit, state }){
		let params = {}
		if(state.messages.length > 0){
			const minIdItem = state.messages.reduce((min, current) => 
				current.id < min.id ? current : min
			);
			params.conversation_id = minIdItem.id
			// console.log(params.conversation_id)
		}
		const res = await history(params)
		if(res.code == 200){
			const { list, total } = res.data
			commit('SET_MESSAGE_LIST', {
				message: list,
				hasMore: total > 0
			})
		}
	},
	// 给客服推送消息
	async sendMsg({ state, commit }, message){
		message.session_id = state.session_id
		await sendApi(message)
		commit('PUSH_MSG', message)
		
		
		// const payload = {
		// 	mode: "SEND",
		// 	id: Date.now().toString(36) + Math.random().toString(36).substring(2),
		// 	...message,
		// 	timestamp: Date.now()
		// }

		
		
		// Vue.prototype.$ws.send(payload)
		// Vue.prototype.$ws.send({
		// 	data: payload,
		// 	success(res) {
		// 		commit('PUSH_MSG', payload)
		// 	}
		// })
	},
	// 接受客服推送消息
	receiveMsg({ commit }, message){
		commit('PUSH_MSG', {
			...message,
		})
	},
	// 发送后状态
	updateMsgStatus({ commit }, message) {
		const { status, mode } = message
		// console.log(status)
		if(status == "success" && mode == "SEND"){
			commit('PUSH_MSG', message)
		}
	    // state.messages = state.messages.map(msg => 
	    //   (msg.id === id || msg.timestamp === id) ? { ...msg, status } : msg
	    // );
	},
};
export default {
    namespaced: true,
	state,
	getters,
	mutations,
    actions
}
