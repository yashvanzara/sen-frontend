import axios from 'axios'
import constants from '../../Utility/constants'
const BASE_URL = constants.BASE_URL
const MODEL_URL = '/programopening/'
import {EventBus} from "../../Utility/EventBus";

export default {
  state:{
    loadedProgramOpenings:[

    ]
  },
  mutations:{
    addProgramOpening(state, payload){
      state.loadedProgramOpenings.push(payload)
    },
    setLoadedProgramOpenings(state, payload){
      state.loadedProgramOpenings = payload
    }
  },
  actions: {
    loadProgramOpenings({commit, getters}){
      axios.get(BASE_URL + MODEL_URL)
        .then(response => {
          commit('setLoadedProgramOpenings', response.data)
        })
    },
    addProgramOpening({commit, getters}, payload) {
      axios.post(BASE_URL + MODEL_URL, payload)
        .then(respose => {
          commit('addProgramOpening', payload)
        })
        .catch(error => {

        })
    },
  },
  getters:{
    loadedProgramOpenigns(state){
      return state.loadedProgramOpenings
    }
  }
}
