import axios from 'axios'
import constants from '../../Utility/constants'
const BASE_URL = constants.BASE_URL
const MODEL_URL = '/question/'
export default {
  state: {
    loadedQuestions: []
  },
  mutations: {
    deleteQuestion(state, payload) {
      state.loadedQuestions = state.loadedQuestions.filter(question => {
        return question.question_Id !== payload.question_Id
      })
    },
    createQuestion(state, payload) {
      state.loadedQuestions.push(payload)
    },
    updateQuestion(state, payload) {
      var question = state.loadedQuestions.find(question => {
        return question.question_Id === payload.question_Id
      })
      const index = state.loadedQuestions.indexOf(question)
      if (index !== -1) {
        state.loadedQuestions.splice(index, 1)
        state.loadedQuestions.push(payload)
      }
    },
    setLoadedQuestions(state, payload) {
      state.loadedQuestions = payload
    }
  },
  actions: {
    loadQuestions({commit, getters}) {
      axios.get(BASE_URL + MODEL_URL)
        .then(response => {
          console.log(response.data)
          commit('setLoadedQuestions', response.data);
        })
        .catch(error => {
          console.log(error.data)
        })
    },
    createQuestion({commit, getters, dispatch}, payload, tagsPayload) {
      for (var c in payload) {
        console.log(c + ":" + payload[c])
      }
      if(tagsPayload!==null && tagsPayload!==undefined&&tagsPayload.length>0){
        dispatch('addQuestionTags', tagsPayload)
      }
      axios.post(BASE_URL + MODEL_URL, payload)
        .then(response => {
          commit('createQuestion', payload)
          dispatch('loadQuestions')
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteQuestion({commit, getters}, payload) {
      axios.delete(BASE_URL + MODEL_URL + payload.question_Id)
        .then(response => {
          commit('deleteQuestion', payload)
        })
        .catch(error => {
          console.log(error.data)
        })
    },
    updateQuestion({commit, getters}, payload) {
      for (var c in payload) {
        console.log(c + ":" + payload[c])
      }
      axios.put(BASE_URL + MODEL_URL + payload.question_Id, payload)
        .then(response => {
          commit('updateQuestion', payload)
        })
        .catch(error => {
          console.log(error.response.data)
        })
    }
  },
  getters: {
    loadedQuestions(state) {
      return state.loadedQuestions
    }
  }

}
