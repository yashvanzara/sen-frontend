import axios from 'axios'
import CONSTANTS from '../../Utility/constants'
const BASE_URL = CONSTANTS.BASE_URL
const MODEL_URL = '/user/'
export default {
  state: {
    registeredUser:{
      user_StudentId:"",
      user_TypeFlag:2,
      user_FirstName:"",
      user_MiddleName:"",
      user_LastName:"",
      user_Password:"",
      user_DateOfBirth:null,
      user_Gender:"M",
      user_ContactNo:"",
      user_EmailId:"",
      user_AddressPermanent:"",
      user_AddressCurrent:"",
      user_ProgramId:"",
      user_JoinDate:new Date(),
      user_SscYear:"",
      user_HscYear:"",
      user_QualifyingBoard:"",
      user_QualifyingPercentage:"",
      user_QualifyingDegree:"",
      user_Stream:"",
      user_Cpi:0,
      user_CurrentBacklog:0,
      user_TotalBacklog:0,
      user_IsPlaced:0,
      user_IsInterested:1,
      user_IsActive:1
    },
    loadedUsers:[

    ],
    loading:false,
    error:null
  },
  mutations:{
    setLoadedUsers(state, payload){
      state.loadedUsers = payload;
    },
    createUser(state, payload){
      state.loadedUsers.push(payload)
    },
    updateUser(state, payload){
      var user = state.loadedUsers.find(user => {
        return user.user_StudentId === payload.user_StudentId
      })
      const index = state.loadedUsers.indexOf(user)
      if(index!=-1){
        state.loadedUsers.splice(index, 1)
        state.loadedUsers.push(payload)
      }
    },
    deleteUser(state, payload){
      state.loadedUsers = state.loadedUsers.filter(user => {
        return user.user_StudentId !== payload.user_StudentId
      })
    },
  },
  actions:{
    createUser({commit, getters, dispatch}, payload){
      axios.post(BASE_URL + MODEL_URL, payload)
        .then(response => {
          commit('createUser', payload)
          dispatch('loadUsers')
        })
        .catch(error => {
          console.log("Error"+error.data)
        })
    },
    loadUsers({commit, getters}){
      axios.get(BASE_URL + MODEL_URL)
        .then(response => {
          commit('setLoadedUsers', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateUser({commit, getters}, payload){
      axios.put(BASE_URL + MODEL_URL + payload.user_StudentId, payload)
        .then(response => {
          commit('updateUser', payload)
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteUser({commit, getters}, payload){
      axios.delete(BASE_URL + MODEL_URL + payload.user_StudentId)
        .then(response => {
          commit('deleteUser', payload)
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
  getters:{
    loadedUsers(state){
      return state.loadedUsers
    }
  }
}
