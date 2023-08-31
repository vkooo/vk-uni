import { login, info } from '../../api/member';
import { setToken , getToken, removeToken} from '../../utils/auth';
let infoHistory = uni.getStorageSync('userInfo') || {};

const state = {
	hasLogin: Boolean(Object.keys(infoHistory).length),
	info: infoHistory
},
getters = {
	info(state) {
		return state.info;
	},
	hasLogin(state){
		return state.hasLogin;
	}
},
mutations = {
	setUserInfo(state, data) { 
		state.hasLogin = true;
		state.info = data;
		if(data.token){
			setToken(data.token)
		}
		uni.setStorageSync('userInfo', data)
	},
	logout(state) {
		state.info = {};
		state.hasLogin = false;
		removeToken();
		uni.removeStorageSync('userInfo')
	}
}
, actions = {
	login({ commit }, param) {
	    login(param).then(response => {
	    	if(response.code == 200){
	    		const { data } = response;
	    		commit('setUserInfo', data)
	    	}
	    	
	    }).catch(error => {
	        console.log(error)
	    })
	},
	getInfo({ commit }){
		info().then(response => {
			if(response.code == 200){
				const { data } = response;
				commit('setUserInfo', data)
			}
		}).catch(error => {
		    console.log(error)
		})
	}
};

export default {
    namespaced: true,
	state,
	getters,
	mutations,
    actions
}
