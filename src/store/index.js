import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/index'
import loadedPrograms from './program/index'
import loadedCompanies from './company/index'
import loadedTags from './tags/index'
import loadedQuestions from './question/index'
Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    user: user,
    programs:loadedPrograms,
    companies:loadedCompanies,
    tags:loadedTags,
    questions:loadedQuestions
  }
})
