import program from "../../models/program";
import axios from 'axios'
import CONSTANTS from '../../Utility/constants'
const BASE_URL = CONSTANTS.BASE_URL
const MODEL_URL = '/program/'
export default {
  state: {
    loadedPrograms:[
      {
        program_Id:1,
        program_Name: 'Master of Science in Information Technology',
        program_IsActive: true,
      }
    ],
    loading:false,
    error:null,
  },
  mutations:{
    createProgram(state, payload){
      state.loadedPrograms.push(payload)
    },
    updateProgram(state, payload){
      var program = state.loadedPrograms.find(program => {
        return program.program_Id === payload.program_Id
      })
      const index = state.loadedPrograms.indexOf(program)
      if(index!==-1){
        state.loadedPrograms.splice(index,1)
        state.loadedPrograms.push(payload)
      }
    },
    deleteProgram(state, payload){
      state.loadedPrograms = state.loadedPrograms.filter(program => {
        return program.program_Id !== payload.program_Id
      })
    },
    setLoadedPrograms(state, payload){
      state.loadedPrograms = payload
    }
  },
  actions:{
    loadPrograms({commit}){
      axios.get(BASE_URL + MODEL_URL)
        .then(response => {
          console.log(response.data)
          commit('setLoadedPrograms', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    createProgram({commit, getters, dispatch}, payload){
      var program = {
        program_IsActive:payload.program_IsActive,
        program_Name:payload.program_Name,
        program_Id:null
      }
      axios.post(BASE_URL + MODEL_URL, program)
        .then(response => {
          console.log(response.data)
          program = response.data
          commit('createProgram', program);
          dispatch('loadPrograms')
          //Calling dispatch loadPrograms again to mitigate problem where we cannot get newly created object with the new PK
        })

        .catch(error => {
          console.log(error)
        })
    },
    deleteProgram({commit, getters}, payload){
      axios.delete(BASE_URL + MODEL_URL + payload.program_Id)
        .then(response => {
          console.log(response.data)
          commit('deleteProgram', payload)
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateProgram({commit, getters}, payload){
      axios.put(BASE_URL + MODEL_URL + payload.program_Id, payload)
        .then(response => {
          commit('updateProgram', payload)
        })
        .catch(error => {
          console.log(error);
        })
    }
  },
  getters:{
    loadedPrograms (state) {
      return state.loadedPrograms
    }
  }
}
