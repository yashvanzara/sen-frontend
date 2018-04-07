import axios from 'axios'
import constants from '../../Utility/constants'
const BASE_URL = constants.BASE_URL
const MODEL_URL = '/jobopening/'

export default {
  state:{
    loadedJobOpenings:[

    ]
  },
  mutations:{
    createJobOpening(state, payload){
      state.loadedJobOpenings.push(payload)
    }
  },
  actions:{
    loadJobOpenings({commit, getters}){

    },
    createJobOpening({commit, getters, dispatch}, payload){
      axios.post(BASE_URL + MODEL_URL, payload)
        .then(response => {
          console.log(response.data)
          dispatch('loadJobOpenings')
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  getters:{
    loadedJobOpenings(state){
      return state.loadedJobOpenings
    }
  }
}
