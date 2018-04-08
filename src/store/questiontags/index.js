import axios from 'axios'
import constants from '../../Utility/constants'
const BASE_URL = constants.BASE_URL
const MODEL_URL = '/questiontag/'
export default {
  state:{
    loadedQuestionTags:[

    ]
  },
  mutations:{
    setLoadedQuestionTags(state, payload){
      state.loadedQuestionTags = payload
    },
    addQuestionTag(state, payload){
      state.loadedQuestionTags.push(payload)
    },
    deleteQuestionTags(state, payload){

    }

  },
  actions:{
    loadQuestionTags({commit, getters}){
      axios.get(BASE_URL + MODEL_URL)
        .then(response=> {
          commit('setLoadedQuestionTags', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addQuestionTag({commit, getters, dispatch}, payload){
      axios.post(BASE_URL + MODEL_URL, payload)
        .then(response => {
          console.log(response.data)
          commit('addQuestionTag', payload)
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteQuestionTags({commit, getters}, payload){
      //NO need to delete from backend as cascade is on, just update the store
      commit('deleteQuestionTags', payload)
    }
  },
  getters:{
    loadedQuestionTags(state){
      return state.loadedQuestionTags
    }
  }
}
