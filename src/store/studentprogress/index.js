import axios from 'axios'
import constants from '../../Utility/constants'

const BASE_URL = constants.BASE_URL
const MODEL_URL = '/studentprogress/'
export default {
  state:{
    loadedStudentProgress:[

    ]
  },
  mutations:{
    setLoadedStudentProgress(state, payload){
      state.loadedStudentProgress = payload
    }
  },
  actions:{
    loadStudentProgress({commit, getters}){
      axios.get(BASE_URL + MODEL_URL)
        .then(response => {
          commit('setLoadedStudentProgress', response.data)
        })
        .catch(error => {
          console.log(error)
        })

    }
  },
  getters:{
    loadedStudentProgress(state){
      return state.loadedStudentProgress
    }

  }
}
