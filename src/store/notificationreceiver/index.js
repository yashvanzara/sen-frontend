import axios from 'axios'

import constants from '../../Utility/constants'

const BASE_URL = constants.BASE_URL
const MODEL_URL = '/notification_recever/'

export default {
  state: {
    loadedNotificationInstances:[

    ]
  },
  mutations: {
    setLoadedNotificationInstances(state, payload){
      state.loadedNotificationInstances = payload
    },
    addSentNotification(state, payload){

    }
  },
  actions: {
    loadNotificationInstances({commit, getters}){
      axios.get(BASE_URL + MODEL_URL)
        .then(response => {
          commit('setLoadedNotificationInstances', response.data)
        })
    }
  },
  getters: {
    loadedNotificationInstances(state){
      return state.loadedNotificationInstances
    }
  }

}
