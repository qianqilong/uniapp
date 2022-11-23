import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
			topListIds:[],
			nextId:''
		},
	mutations:{
		ADDTOPLIST(state,payload){
			state.topListIds=payload
		},
			
		GET_NEXTID(state,payload){
			for(let i=0;i<state.topListIds.length;i++){
				if(state.topListIds[i].id==payload){
					console.log(state.topListIds[i].id==payload);
					state.nextId=state.topListIds[i+1].id
				}
			}
			
		}
		
	}
	
})