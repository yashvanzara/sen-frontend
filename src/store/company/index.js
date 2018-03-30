import company from "../../models/program";
import axios from 'axios'
const BASE_URL = 'http://localhost:3000'
const MODEL_URL = '/company/'
export default {
  state: {
    loadedCompanies:[
      {
        company_Id:1,
        company_Name:"Placeholder Name",
        company_Address:"Gandhinagar",
        company_Email:"contact@co.com",
        company_CEO:"Me",
        company_Founder:"Me",
        company_Website:"www.google.com",
        company_Information:"Info...",
        company_IsActive:1,
      }
    ],
    loading:false,
    error:null,
  },
  mutations:{
    createCompany(state, payload){
      state.loadedCompanies.push(payload)
    },
    updateCompany(state, payload){
      var company = state.loadedCompanies.find(company => {
        return company.company_Id === payload.company_Id
      })
      const index = state.loadedCompanies.indexOf(company)
      if(index!=-1){
        state.loadedCompanies.splice(index, 1)
        state.loadedCompanies.push(payload)
      }
    },
    deleteCompany(state, payload){
      state.loadedCompanies = state.loadedCompanies.filter(company => {
        return company.company_Id !== payload.company_Id
      })
    },
    setloadedCompanies(state, payload){
      state.loadedCompanies = payload
    }
  },
  actions:{
    loadCompanies({commit}){
      //TODO: Fetch Meetups from Backend and mutate setloaded programs by payload
      axios.get(BASE_URL + MODEL_URL)
        .then(response => {
          console.log(response.data)
          commit('setloadedCompanies', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    createCompany({commit, getters, dispatch}, payload){
      console.log("Create called")
      axios.post(BASE_URL + MODEL_URL, payload)
        .then(response => {
          console.log(response.data)
          const company = response.data
          //TODO: Handle program_Id in the backend so that refresh of page is not required for vuex
          commit('createCompany', company)
          dispatch('loadCompanies')//Handle Backend flaws by requesting new dataset again
        })
        .catch(error => {
          console.log(error)
        })

      //TODO: Push programs to backend
    },
    deleteCompany({commit, getters}, payload){
      axios.delete(BASE_URL + MODEL_URL + payload.company_Id)
        .then(response => {
          console.log(response.data)
          commit('deleteProgram', payload)
        })
        .catch(error => {
          console.log(error)
        })


      //TODO: Delete programs from backend
    },
    updateCompany({commit, getters}, payload){
      console.log("Update called")
      axios.put(BASE_URL + MODEL_URL + payload.company_Id, payload)
        .then(response => {
          commit('updateCompany', payload)
        })
        .catch(error => {
          console.log(error);
        })
      //TODO: Update program in backend
    }
  },
  getters:{
    loadedCompanies (state) {
      return state.loadedCompanies
    }
  }
}
