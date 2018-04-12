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
    createQuestion({commit, getters, dispatch}, payload) {
      for (var c in payload) {
        console.log(c + ":" + payload[c])
      }
      console.log(payload.data)
      axios.post(BASE_URL + MODEL_URL, payload.data)
        .then(response => {
          console.log(response)
          commit('createQuestion', response.data.questions[0])
          if (payload.tags != undefined && payload.tags != null && payload.tags.length > 0) {
            const question_id = response.data.questions[0].question_Id
            for (var i = 0; i < payload.tags.length; ++i) {
              let tag_payload = {
                questionTag_QuestionId: question_id,
                questionTag_TagId: payload.tags[i]
              }
              dispatch('addQuestionTag', tag_payload)
            }
          }
          if (payload.companies != undefined && payload.companies != null && payload.companies.length > 0){
            const ques_id = response.data.questions[0].question_Id
            for(var i=0; i<payload.companies.length; ++i){
              let company_question_payload = {
                companyQuestion_QuestionId:ques_id,
                companyQuestion_CompanyId: payload.companies[i]
              }
              console.log(company_question_payload)
              dispatch('addCompanyQuestion', company_question_payload)
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteQuestion({commit, getters}, payload) {
      axios.delete(BASE_URL + MODEL_URL + payload.question_Id)
        .then(response => {
          commit('deleteQuestion', payload)
          commit('deleteQuestionTags', payload)
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
