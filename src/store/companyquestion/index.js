import axios from 'axios'
const BASE_URL = 'http://localhost:3000'
const MODEL_URL = '/companyquestions/'

export default {
  state:{
    loadedCompanyQuestions:[

    ]
  },
  mutations:{
    setLoadedCompanyQuestions(state, payload){
      state.loadedCompanyQuestions = payload
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
    }
  },
  getters:{
    loadedCompanyQuestions(state){
      return state.loadedCompanyQuestions
    }
  }
}