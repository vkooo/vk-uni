import { website as websiteApi } from "@/api/common.js"

const state = {
	website: {}
},
getters = {
	website(state) {
		return state.website;
	},
	tabbar(state){
		return state.website.tabbar || {};
	},
	balanceObj(state){
		return state.website.balance || {};
	},
	withdrawObj(state){
		return state.website.withdraw || {};
	},
},
mutations = {
	SET_DATA(state, data){
		state.website = data;
	}
}
, actions = {
	init({ commit }){
		websiteApi().then(res=>{
			commit('SET_DATA', res.data)
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
