import axios from 'axios'
import constants from '../../Utility/constants'
const BASE_URL = constants.BASE_URL
const MODEL_URL = '/placementseason/'
export default {
  state:{
    loadedPlacementSeasons:[

    ]
  },
  mutations:{
    setLoadedPlacementSeasons(state,payload){
      state.loadedPlacementSeasons = payload
    },
    createPlacementSeason(state, payload){
      state.loadedPlacementSeasons.push(payload)
    },
    updatePlacementSeason(state, payload){
      var season = state.loadedPlacementSeasons.find(season => {
        return season.placementSeason_Id === payload.placementSeason_Id
      })
      const index = state.loadedPlacementSeasons.indexOf(season)
      if(index!==-1){
        state.loadedPlacementSeasons.splice(index,1)
        state.loadedPlacementSeasons.push(payload)
      }
    },
    deletePlacementSeason(state, payload){
      state.loadedPlacementSeasons = state.loadedPlacementSeasons.filter(season => {
        return season.placementSeason_Id !== payload.placementSeason_Id
      })
    }
  },
  actions:{
    loadPlacementSeasons({commit, getters}){
      axios.get(BASE_URL + MODEL_URL)
        .then(response => {
          commit('setLoadedPlacementSeasons', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    createPlacementSeason({commit, getters, dispatch}, payload){
      axios.post(BASE_URL + MODEL_URL, payload)
        .then(response => {
          commit('createPlacementSeason', payload)
          dispatch('loadPlacementSeasons')
        })
        .catch(error => {
          console.log(error)
        })
    },
    updatePlacementSeason({commit, getters}, payload){
      axios.put(BASE_URL + MODEL_URL + payload.placementSeason_Id, payload)
        .then(response => {
          commit('updatePlacementSeason', payload)
        })
        .catch(errror => {
          console.log(error)
        })
    },
    deletePlacementSeason({commit, getters}, payload){
      axios.delete(BASE_URL + MODEL_URL + payload.placementSeason_Id)
        .then(response => {
          commit('deletePlacementSeason', payload)
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
  getters: {
    loadedPlacementSeasons(state){
      return state.loadedPlacementSeasons
    }
  }
}
