import program from "../../models/program";

export default {
  state: {
    loadedPrograms:[
      {
        id:1,
        program_name: 'Master of Science in Information Technology',
        program_is_active: true
      }
    ],
    loading:false,
    error:null
  },
  mutations:{
    createProgram(state, payload){
      state.loadedPrograms.push(payload)
    },
    updateProgram(state, payload){
      const program = state.loadedPrograms.find(program => {
        return program.id === payload.id
      })
      const index = state.loadedPrograms.indexOf(program)

      if(payload.program_name){
        program.program_name = payload.program_name
      }
      if(payload.program_is_active != null){
        program.program_is_active = payload.program_is_active
      }
      state.loadedPrograms[index] = program
    },
    deleteProgram(state, payload){
      state.loadedPrograms = state.loadedPrograms.filter(program => {
        return program.id !== payload.id
      })
    },
    setLoadedPrograms(state, payload){
      state.loadedPrograms = payload
    }
  },
  actions:{
    loadPrograms({commit}){
      //TODO: Fetch Meetups from Backend and mutate setloaded programs by payload
    },
    createProgram({commit, getters}, payload){
      const program = {
        program_is_active:payload.program_is_active,
        id:Math.random(),
        program_name:payload.program_name
      }
      commit('createProgram', program)
      //TODO: Push programs to backend
    },
    deleteProgram({commit, getters}, payload){
      commit('deleteProgram', payload)
      //TODO: Delete programs from backend
    },
    updateProgram({commit, getters}, payload){
      commit('updateProgram', payload)
      //TODO: Update program in backend
    }
  },
  getters:{
    loadedPrograms (state) {
      return state.loadedPrograms
    }
  }
}
