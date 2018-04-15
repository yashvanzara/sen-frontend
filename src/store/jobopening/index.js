import axios from 'axios'
import constants from '../../Utility/constants'
const BASE_URL = constants.BASE_URL
const MODEL_URL = '/jobopening/'
import {EventBus} from "../../Utility/EventBus";

export default {
  state:{
    loadedJobOpenings:[

    ]
  },
  mutations:{
    createJobOpening(state, payload){
      state.loadedJobOpenings.push(payload)
    },
    setLoadedJobOpenings(state, payload){
      state.loadedJobOpenings = payload
    }
  },
  actions:{
    createJobOpening({commit, getters, dispatch}, payload){
      axios.post(BASE_URL + MODEL_URL, payload.data)
        .then(response => {
          var opening_id = response.data.openings[0].jobOpening_Id
          let opening_payload = {
            ...payload.data,
          }
          opening_payload.jobOpening_Id = opening_id
          commit('createJobOpening', opening_payload)
          for(var i=0; i<payload.openings.length; ++i){
            let prog_opening_payload = {
              programOpening_Batch:2018,
              programOpening_ProgramId:payload.openings[i],
              programOpening_OpeningId:opening_id
            }
            dispatch('addProgramOpening', prog_opening_payload)
          }
          //dispatch('loadJobOpenings')
        })
        .catch(error => {
          console.log(error)
        })
    },
    loadJobOpenings({commit, getters}){
      axios.get(BASE_URL + MODEL_URL)
        .then(response => {
          commit('setLoadedJobOpenings', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
  getters:{
    loadedJobOpenings(state){
      return state.loadedJobOpenings
    }
  }
}
