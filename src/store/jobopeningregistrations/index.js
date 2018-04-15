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
    },
    addJobOpeningRegistration(state, payload){
      state.loadedJobOpeningRegistrations.push(payload)
    }
  },
  actions: {
    registerForJobOpening({commit, getters, dispatch}, payload) {
      axios.post(BASE_URL + MODEL_URL, payload)
        .then(response => {
          var dt = new Date();
          var utcDate = dt.toUTCString();
          let commit_data={
            ...payload,
            jobOpeningRegistration_Timestamp:utcDate
          }
          commit('addJobOpeningRegistration', commit_data)
          console.log(payload)
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
          }else{
            EventBus.$emit('notify-me', {
              data: {
                title: constants.REGISTERED_FOR_OPENING,
                status: constants.COLOUR_GREEN
              }
            })
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
