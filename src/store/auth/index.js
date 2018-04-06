import axios from 'axios'
import constants from '../../Utility/constants'
const BASE_URL = constants.BASE_URL
const MODEL_URL = '/user/authenticate/'
import {EventBus} from "../../Utility/EventBus";
import {jwt} from 'jsonwebtoken';

export default {
  state:{
    isLoggedIn:false,
    loggedUser:null,
  },
  mutations:{
    setLoggedUser(state, payload){
      state.isLoggedIn = true
      state.loggedUser = payload
      // EventBus.$emit('notify-me', {
      //   data:{
      //     title:constants.AUTH_SUCCESS,
      //     status:constants.COLOUR_GREEN
      //   }
      // })
    },
    signOut(state){
      state.isLoggedIn = false
      state.loggedUser = null
    },
    updateLoggedUser(state, payload){
      state.loggedUser = payload
    }

  },
  actions:{
    signIn({commit, getters}, payload){
      axios.post(BASE_URL + MODEL_URL, payload)
        .then(response => {
          if(response.data.success){
            console
            const user = response.data.wholedata.User[0]
            const token = response.data.token
            localStorage.setItem("placement_portal_token", token)
            commit('setLoggedUser', user)
          }else{
            EventBus.$emit('notify-me', {
              data:{
                title:constants.AUTH_FAILURE,
                status:constants.COLOUR_RED
              }
            })
          }
        })
    },
    autoSignIn({commit, getters}){

    },
    signOut({commit, getters}){
      commit('signOut')
      localStorage.removeItem('placement_portal_token')
    },
    updateLoggedUser({commit, getters}, payload){
      commit('updateLoggedUser', payload)
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
