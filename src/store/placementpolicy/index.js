import axios from 'axios'

import constants from '../../Utility/constants'
const BASE_URL = constants.BASE_URL
const MODEL_URL = '/spcpolicy/'

export default {
  state: {
    loadedPlacementPolicies: []
  },
  mutations: {
    setLoadedPlacementPolicies(state, payload) {
      state.loadedPlacementPolicies = payload
    },
    updatePlacementPolicy(state, payload) {
      const policy = state.loadedPlacementPolicies.find(policy => {
        return policy.spcPolicy_Id === payload.spcPolicy_Id
      })
      const index = state.loadedPlacementPolicies.indexOf(policy)
      if(index!=-1){
        state.loadedPlacementPolicies.splice(index, 1)
        state.loadedPlacementPolicies.push(payload)
      }
    },
    deletePlacementPolicy(state, payload){
      state.loadedPlacementPolicies = state.loadedPlacementPolicies.filter(policy => {
        return policy.spcPolicy_Id !== payload.spcPolicy_Id
      })
    },
    createPlacementPolicy(state, payload){
      state.loadedPlacementPolicies.push(payload)
    }

  },
  actions: {
    loadPlacementPolicies({commit, getters}) {
      axios.get(BASE_URL + MODEL_URL)
        .then(response => {
          commit('setLoadedPlacementPolicies', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    deletePlacementPolicy({commit, getters}, payload) {
      axios.delete(BASE_URL + MODEL_URL + payload.spcPolicy_Id)
        .then(response => {
          commit('deletePlacementPolicy', payload)
        })
        .catch(error => {
          console.log(error)
        })
    },
    createPlacementPolicy({commit, getters, dispatch}, payload){
      axios.post(BASE_URL + MODEL_URL, payload)
        .then(response => {
          commit('createPlacementPolicy', payload)
          dispatch('loadPlacementPolicies')
        })
    },
    updatePlacementPolicy({commit, getters}, payload){
      axios.put(BASE_URL + MODEL_URL + payload.spcPolicy_Id, payload)
        .then(response => {
          commit('updatePlacementPolicy', payload)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  getters: {
    loadedPlacementPolicies(state) {
      return state.loadedPlacementPolicies
    }

  }
}
