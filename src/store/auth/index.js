import axios from 'axios'
import constants from '../../Utility/constants'
const BASE_URL = constants.BASE_URL
const MODEL_URL = '/auth/'
import {EventBus} from "../../Utility/EventBus";

export default {
  state:{
    isLoggedIn:false,
    loggedUser:null,
    authToken:null
  },
  mutations:{
    setLoggedUser(state, payload){
      state.loggedUser = payload
      state.isLoggedIn = true
      EventBus.$emit('notify-me', {
        data:{
          title:constants.AUTH_SUCCESS,
          status:constants.COLOUR_GREEN
        }
      })
    },
    signOut(state){
      state.isLoggedIn = false
      state.loggedUser = null
    }

  },
  actions:{
    signIn({commit, getters}, payload){
      payload = getters.loadedUsers[0]
      commit('setLoggedUser', payload)
    },
    autoSignIn({commit, getters}){

    },
    signOut({commit, getters}){
      commit('signOut')
    }
  },
  getters:{
    loggedUser(state){
      return state.loggedUser
    },
    isLoggedIn(state){
      return state.isLoggedIn
    },
    isPlacementCellMember(state){
      return true
    },
    isAdmin(state){
      return true
    },
    isPlacementCellMemberAndStudent(state) {
      return true
    }
  }
}
