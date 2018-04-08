import axios from 'axios'
import constants from '../../Utility/constants'
const BASE_URL = constants.BASE_URL
const MODEL_URL = '/alltags/'
export default {
  state:{
    loadedTags:[

    ]
  },
  mutations:{
    setLoadedTags(state, payload){
      state.loadedTags = payload
    },
    deleteTag(state, payload){
        state.loadedTags = state.loadedTags.filter(tag => {
          return tag.allTags_Id !== payload.allTags_Id
        })
      },
    createTag(state, payload){
      state.loadedTags.push(payload)
    },
    updateTag(state, payload){
      var tag = state.loadedTags.find(tag => {
        return tag.allTags_Id === payload.allTags_Id
      })
      const index = state.loadedTags.indexOf(tag)
      if(index!==-1){
        state.loadedTags.splice(index,1)
        state.loadedTags.push(payload)
      }
    }
  },
  actions:{
    loadTags({commit, getters}){
      axios.get(BASE_URL + MODEL_URL)
        .then(response => {
          commit('setLoadedTags', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteTag({commit},payload){
      axios.delete(BASE_URL+MODEL_URL+payload.allTags_Id)
        .then(response => {
          commit('deleteTag', payload)
        })
        .catch(error => {
          console.log(error)
        })
    },
    createTag({commit, getters, dispatch}, payload){
      axios.post(BASE_URL + MODEL_URL, payload)
        .then(response => {
          console.log(response.data)
          commit('createTag', payload)
          dispatch('loadTags')
        })
        .catch(error => {

        })
    },
    updateTag({commit, getters}, payload){
      axios.put(BASE_URL + MODEL_URL + payload.allTags_Id, payload)
        .then(response => {
          commit('updateTag', payload)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  getters:{
    loadedTags(state){
      return state.loadedTags
    }
  }
}
