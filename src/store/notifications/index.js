import axios from 'axios'

import constants from '../../Utility/constants'

const BASE_URL = constants.BASE_URL
const MODEL_URL = '/notification/'

export default {
  state: {
    loadedNotifications:[

    ]
  },
  mutations: {
    setLoadedNotifications(state, payload){
      state.loadedNotifications = payload
    }

  },
  actions: {
    loadNotifications({commit, getters}){
      axios.get(BASE_URL + MODEL_URL)
        .then(response => {
          commit('setLoadedNotifications', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    sendNotification({commit, getters, dispatch}, payload){
      axios.post(BASE_URL + MODEL_URL, payload)
        .then(response=> {
          console.log(response.data)
          dispatch('loadNotifications')
          dispatch('loadNotificationInstances')
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  getters: {
    loadedNotifications(state){
      return state.loadedNotifications
    }
  }

}
