import axios from 'axios'
const BASE_URL = 'http://localhost:3000'
const MODEL_URL = '/jobprofile/'

export default {
  state:{
    loadedJobProfiles:[

    ]
  },
  mutations:{
    deleteJobProfile(state, payload){
      state.loadedJobProfiles = state.loadedJobProfiles.filter(jobprofile => {
        return jobprofile.jobProfile_Id !== payload.jobProfile_Id
      })
    },
    updateJobProfile(state, payload){
      var jobprofile = state.loadedJobProfiles.find(jobprofile => {
        return jobprofile.jobProfile_Id === payload.jobProfile_Id
      })
      const index = state.loadedJobProfiles.indexOf(jobprofile)
      if (index !== -1) {
        state.loadedJobProfiles.splice(index, 1)
        state.loadedJobProfiles.push(payload)
      }
    },
    createJobProfile(state, payload){
      state.loadedJobProfiles.push(payload)
    },
    setLoadedJobProfiles(state, payload){
      state.loadedJobProfiles = payload
    }
  },
  actions:{
    loadJobProfiles({commit, getters}){
      axios.get(BASE_URL + MODEL_URL)
        .then(response => {
          commit('setLoadedJobProfiles', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    createJobProfile({commit, getters, dispatch}, payload){
      axios.post(BASE_URL + MODEL_URL, payload)
        .then(response => {
          commit('createJobProfile', payload)
          dispatch('loadJobProfiles')
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteJobProfile({commit, getters}, payload){
      axios.delete(BASE_URL + MODEL_URL + payload.jobProfile_Id)
        .then(response => {
          commit('deleteJobProfile', payload)
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateJobProfile({commit, getters}, payload){
      axios.put(BASE_URL + MODEL_URL + payload.jobProfile_Id, payload)
        .then(response => {
          commit('updateJobProfile', payload)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  getters:{
    loadedJobProfiles(state){
      return state.loadedJobProfiles
    }
  }
}
