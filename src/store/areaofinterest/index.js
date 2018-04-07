import axios from 'axios'
import constants from '../../Utility/constants'
const BASE_URL = constants.BASE_URL
const MODEL_URL = '/areaofinterest/'

export default {
  state:{
    loadedAreaOfInterests:{

    }
  },
  mutations:{
    setLoadedAreaOfInterests(state, payload){
      state.loadedAreaOfInterests = payload
    },
    updateAreaOfInterest(state, payload){
      const interest = state.loadedAreaOfInterests.find(interest => {
        return interest.areaOfInterest_JobProfileId === payload.areaOfInterest_JobProfileId &&
          interest.areaOfInterest_StudentId === payload.areaOfInterest_StudentId
      })
      const index = state.loadedAreaOfInterests.indexOf(interest)
      if(index!=-1){
        state.loadedAreaOfInterests.splice(index, 1)
        state.loadedAreaOfInterests.push(payload)
      }
    },
    addAreaOfInterest(state, payload){
      state.loadedAreaOfInterests.push(payload)
    },
    deleteAreaOfInterest(state, payload){
      //Bugg AOI
      state.loadedAreaOfInterests = state.loadedAreaOfInterests.filter(interest =>{
        return interest.areaOfInterest_JobProfileId !== payload.areaOfInterest_JobProfileId &&
          interest.areaOfInterest_StudentId !== payload.areaOfInterest_StudentId
      })
    }
  },
  actions:{
    addAreaOfInterest({commit, getters, dispatch}, payload){
      console.log(BASE_URL + MODEL_URL)
      console.log(payload)
      axios.post(BASE_URL + MODEL_URL, payload)
        .then(response => {
          commit('addAreaOfInterest', payload)
          dispatch('loadAreaOfInterests')
        })
    },
    loadAreaOfInterests({commit, getters}){
      axios.get(BASE_URL+MODEL_URL)
        .then(response => {
          commit('setLoadedAreaOfInterests', response.data)
        })
    },
    updateAreaOfInterest({commit, getters}, payload){
      axios.put(BASE_URL + MODEL_URL + payload.areaOfInterest_StudentId + "/" + payload.areaOfInterest_JobProfileId+"/", payload)
        .then(response => {
          commit('updateAreaOfInterest', payload)
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteAreaOfInterest({commit, getters}, payload){
      axios.delete(BASE_URL + MODEL_URL + payload.areaOfInterest_StudentId + "/" + payload.areaOfInterest_JobProfileId+"/")
        .then(response => {
          commit('deleteAreaOfInterest', payload)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  getters:{
    loadedAreaOfInterests(state){
      return state.loadedAreaOfInterests
    }
  }
}
