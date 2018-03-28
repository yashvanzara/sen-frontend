import axios from 'axios'
const BASE_URL = 'http://localhost:3000'
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
    }
  },
  actions:{
    createUser({commit, getters, dispatch}, payload){
      console.log(payload.user_AddressCurrent)
      console.log(BASE_URL+MODEL_URL)
      for(var i in payload) {
        console.log (i, payload[i])
      }
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
          console.log(response.data)
          commit('setLoadedUsers', response.data)
        })
        .catch(error => {
          console.log(error)
        })

    }
  },
  getters:{
    loadedUsers(state){
      return state.loadedUsers
    }
  }
}
