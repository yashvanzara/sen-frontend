import program from "../../models/program";
import axios from 'axios'
const BASE_URL = 'http://localhost:3000'
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
      if(index!=-1){
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
      //TODO: Fetch Meetups from Backend and mutate setloaded programs by payload
      axios.get(BASE_URL + MODEL_URL)
        .then(response => {
          console.log(response.data)
          commit('setLoadedPrograms', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    createProgram({commit, getters}, payload){
      var program = {
        program_IsActive:payload.program_IsActive,
        program_Name:payload.program_Name,
        program_Id:null
      }
      axios.post(BASE_URL + MODEL_URL, program)
        .then(response => {
          console.log(response.data)
          program = response.data
          //TODO: Handle program_Id in the backend so that refresh of page is not required for vuex
          commit('createProgram', program)
        })
        .catch(error => {
          console.log(error)
        })

      //TODO: Push programs to backend
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


      //TODO: Delete programs from backend
    },
    updateProgram({commit, getters}, payload){
      axios.put(BASE_URL + MODEL_URL + payload.program_Id, payload)
        .then(response => {
          commit('updateProgram', payload)
        })
        .catch(error => {
          console.log(error);
        })
      //TODO: Update program in backend
    }
  },
  getters:{
    loadedPrograms (state) {
      return state.loadedPrograms
    }
  }
}
