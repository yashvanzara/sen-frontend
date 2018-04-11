import axios from 'axios'
import constants from '../../Utility/constants'

const BASE_URL = constants.BASE_URL
const MODEL_URL = '/resume/'

export default {
  state: {
    loadedResumes: []
  },
  mutations: {
    setLoadedResumes(state, payload) {
      state.loadedResumes = payload
    },
    addResume(state, payload) {
      state.loadedResumes.push(payload)
    },
    deleteResume(state, payload) {
      console.log(payload)
      //Not working, do the usual workaround get again
      state.loadedResumes = state.loadedResumes.filter(resume => {
        return (resume.resume_JobProfileId !== payload.resume_JobProfileId)
          && (resume.resume_StudentId !== payload.resume_StudentId)
      })
    }
  },
  actions: {
    loadResumes({commit, getters}) {
      axios.get(BASE_URL + MODEL_URL)
        .then(response => {
          commit('setLoadedResumes', response.data)
        })
        .catch(error => {
          console.log(error)
        })

    },
    updateResume({commit, getters, dispatch}, payload) {
      axios.put(BASE_URL + MODEL_URL + payload.resume_StudentId + "/" + payload.resume_JobProfileId, payload, {headers: {'Content-type': 'multipart/form-data'}})
        .then(response => {
          console.log(payload)
          commit('addResume', payload)
          dispatch('loadResumes')
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteResume({commit, getters, dispatch}, payload) {
      axios.delete(BASE_URL + MODEL_URL + payload.resume_StudentId + "/" + payload.resume_JobProfileId)
        .then(response => {
          commit('deleteResume', payload)
          dispatch('loadResumes')
        })
        .catch(error => {
          console.log(error)
        })
    },
    addResume({commit, getters, dispatch}, payload) {
      axios.post(BASE_URL + MODEL_URL, payload, {headers: {'Content-type': 'multipart/form-data'}})
        .then(response => {
          commit('addResume', payload)
          dispatch('loadResumes')
        })
        .catch(error => {

        })
    },
    downloadResume({commit, getters}, payload) {
      //Download Resume
      axios({
        url: BASE_URL + MODEL_URL + payload.resume_StudentId + "/" + payload.resume_JobProfileId,
        responseType: 'blob',
        method: 'GET'
      })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          var file_name = payload.resume_StudentId + "_" + payload.resume_JobProfileId + ".pdf"
          link.setAttribute('download', file_name);
          document.body.appendChild(link);
          link.click();
        })
        .catch(error => {
          console.log(error)
        })
    },
    openResume({commit, getters}, payload) {
      // axios({
      //   url: BASE_URL + MODEL_URL + payload.resume_StudentId + "/" + payload.resume_JobProfileId,
      //   responseType: 'blob',
      //   method: 'GET'
      // })
      //   .then(response => {
      //     const url = window.URL.createObjectURL(new Blob([response.data]));
      //     const link = document.createElement('a');
      //     link.href = url;
      //     window.open(url, '_blank')
      //   })
      //   .catch(error => {
      //     console.log(error)
      //   })
    }

  },
  getters: {
    loadedResumes(state) {
      return state.loadedResumes
    }
  }

}
