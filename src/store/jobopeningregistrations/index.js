import axios from 'axios'
import constants from '../../Utility/constants'

const BASE_URL = constants.BASE_URL
const MODEL_URL = '/jobopeningregistration/'
import {EventBus} from "../../Utility/EventBus";

export default {
  state:{
    loadedJobOpeningRegistrations:[

    ]
  },
  mutations:{
    setLoadedJobOpeningRegistrations(state, payload){
      state.loadedJobOpeningRegistrations = payload
    }
  },
  actions: {
    registerForJobOpening({commit, getters, dispatch}, payload) {
      axios.post(BASE_URL + MODEL_URL, payload)
        .then(response => {
          console.log(response.data)
          if ('code' in response.data) {
            if (response.data.code === 'ER_DUP_ENTRY') {
              EventBus.$emit('notify-me', {
                data: {
                  title: 'Already Registered',
                  status: constants.COLOUR_GREEN
                }
              })
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    loadJobOpeningRegistrations({commit, getters}) {
      axios.get(BASE_URL + MODEL_URL)
        .then(response => {
          commit('setLoadedJobOpeningRegistrations', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  getters:{
    loadedJobOpeningRegistrations(state){
      return state.loadedJobOpeningRegistrations
    }
  }
}
