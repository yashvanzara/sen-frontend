import axios from 'axios'
import constants from '../../Utility/constants'
const BASE_URL = constants.BASE_URL
const MODEL_URL = '/questiontag/'
export default {
  state:{
    loadedTags:[

    ]
  },
  mutations:{

  },
  actions:{
    addQuestionTags({commit, getters, dispatch}, payload){
      console.log("Got dispatch! " + payload)
    }

  },
  getters:{

  }
}
