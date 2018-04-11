import company from "../../models/program";
import axios from 'axios'
import constants from '../../Utility/constants'
const BASE_URL = constants.BASE_URL
const MODEL_URL = '/messagetemplate/'

export default {
  state:{
    loadedTemplates:[

    ]
  },
  mutations:{
    setLoadedTemplates(state, payload){
      state.loadedTemplates = payload
    },
    addTemplate(state, payload){
      state.loadedTemplates.push(payload)
    },
    deleteTemplate(state, payload){
      state.loadedTemplates = state.loadedTemplates.filter(template => {
        return template.messageTemplate_Id !== payload.messageTemplate_Id
      })
    },
    updateTemplate(state, payload){
      var template = state.loadedTemplates.find(template => {
        return template.messageTemplate_Id === payload.messageTemplate_Id
      })
      const index = state.loadedTemplates.indexOf(template)
      if (index !== -1) {
        state.loadedTemplates.splice(index, 1)
        state.loadedTemplates.push(payload)
      }
    }
  },
  actions:{
    loadTemplates({commit, getters}){
      axios.get(BASE_URL + MODEL_URL)
        .then(response => {
          commit('setLoadedTemplates', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addTemplate({commit, getters, dispatch}, payload){
      axios.post(BASE_URL + MODEL_URL, payload)
        .then(response => {
          dispatch('loadTemplates')
          commit('addTemplate', payload)
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteTemplate({commit, getters}, payload){
      axios.delete(BASE_URL + MODEL_URL + payload.messageTemplate_Id)
        .then(response => {
          commit('deleteTemplate', payload)
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateTemplate({commit, getters}, payload){
      axios.put(BASE_URL + MODEL_URL + payload.messageTemplate_Id, payload)
        .then(response => {
          commit('updateTemplate', payload)
        })
        .catch(error=> {
          console.log(error)
        })
    }
  },
  getters:{
    loadedTemplates(state){
      return state.loadedTemplates
    }
  }
}
