import axios from 'axios'
import constants from '../../Utility/constants'

const BASE_URL = constants.BASE_URL
const MODEL_URL = '/studentprogress/'
export default {
  state: {
    loadedStudentProgress: []
  },
  mutations: {
    setLoadedStudentProgress(state, payload) {
      state.loadedStudentProgress = payload
    },
    updateStudentProgress(state, payload) {
      var progress = state.loadedStudentProgress.find(progress => {
        return progress.studentProgress_QuestionId === payload.studentProgress_QuestionId &&
          progress.studentProgress_StudentId === payload.studentProgress_StudentId
      })
      const index = state.loadedStudentProgress.indexOf(progress)
      if (index != -1) {
        state.loadedStudentProgress.splice(index, 1)
        state.loadedStudentProgress.push(payload)
      }
    },
    addStudentProgress(state, payload){
      state.loadedStudentProgress.push(payload)
    }
  },
  actions: {
    loadStudentProgress({commit, getters}) {
      axios.get(BASE_URL + MODEL_URL)
        .then(response => {
          commit('setLoadedStudentProgress', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateStudentProgress({commit, getters}, payload) {
      axios.put(BASE_URL + MODEL_URL + payload.studentProgress_StudentId + "/" + payload.studentProgress_QuestionId, payload)
        .then(response => {
          commit('updateStudentProgress', payload)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addStudentProgress({commit, getters}, payload){
      axios.post(BASE_URL + MODEL_URL, payload)
        .then(response => {
          commit('addStudentProgress', payload)
        })
        .catch(error => {
          console.log(error)
        })
    }

  },
  getters: {
    loadedStudentProgress(state) {
      return state.loadedStudentProgress
    }

  }
}
