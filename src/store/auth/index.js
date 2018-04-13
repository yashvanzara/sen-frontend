import axios from 'axios'
import constants from '../../Utility/constants'
const BASE_URL = constants.BASE_URL
const MODEL_URL = '/user/authenticate/'
import {EventBus} from "../../Utility/EventBus";
import {jwt} from 'jsonwebtoken';
var jwtDecode = require('jwt-decode');
export default {
  state:{
    isLoggedIn:false,
    loggedUser:null,
  },
  mutations:{
    setLoggedUser(state, payload){
      state.isLoggedIn = true
      state.loggedUser = payload
      EventBus.$emit('notify-me', {
        data:{
          title:constants.AUTH_SUCCESS,
          status:constants.COLOUR_GREEN
        }
      })
      EventBus.$emit('login-success', {
        data:{
          // Required, do not change
        }
      })
    },
    signOut(state){
      state.isLoggedIn = false
      state.loggedUser = null
      EventBus.$emit('notify-me', {
        data:{
          title:constants.SIGN_OUT,
          status:constants.COLOUR_RED
        }
      })
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
      const token = localStorage.getItem('placement_portal_token')
      if(token){
        var decoded = jwtDecode(token)
        commit('setLoggedUser', decoded.data[0])
      }


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
      return state.loggedUser.user_TypeFlag === constants.ONLY_PLACEMENT_CELL_MEMBER
    },
    isAdmin(state){
      return state.loggedUser.user_TypeFlag === constants.ADMIN
    },
    isPlacementCellMemberAndStudent(state) {
      return state.loggedUser.user_TypeFlag === constants.PLACEMEN_CELL_MEMBER_AND_STUDENT
    }
  }
}
