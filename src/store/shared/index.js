export default {
  state:{
    appLoaded:false
  },
  mutations:{
    setAppLoaded(state, payload){
      state.appLoaded = payload
    }
  },
  actions:{
    loadApp({commit}){
      commit('setAppLoaded', true)
    }
  },
  getters:{
    isAppLoaded(state){
      return state.appLoaded
    }
  }
}
