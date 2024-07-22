import { website as websiteApi } from "@/api/website.js"

const state = {
	website: {}
},
getters = {
	website(state) {
		return state.website;
	}
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
