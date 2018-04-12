import axios from 'axios'
import constants from '../../Utility/constants'
const BASE_URL = constants.BASE_URL
const MODEL_URL = '/companyquestions/'

export default {
  state:{
    loadedCompanyQuestions:[

    ]
  },
  mutations:{
    setLoadedCompanyQuestions(state, payload){
      state.loadedCompanyQuestions = payload
    },
    addCompanyQuestion(state, payload){
      state.loadedCompanyQuestions.push(payload)
    }
  },
  actions:{
    loadCompanyQuestions({commit, getters}){
      axios.get(BASE_URL+ MODEL_URL)
        .then(response => {
          commit('setLoadedCompanyQuestions', response.data);
        })
        .catch(error => {
          console.log(error)
        })
    },
    addCompanyQuestion({commit, getters, dispatch}, payload){
      axios.post(BASE_URL + MODEL_URL, payload)
        .then(response => {
          commit('addCompanyQuestion', payload)
        })
        .catch(error => {

        })
    }
  },
  getters:{
    loadedCompanyQuestions(state){
      return state.loadedCompanyQuestions
    }
  }
}
