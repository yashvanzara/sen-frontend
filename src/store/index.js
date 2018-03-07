import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/index'
import loadedPrograms from './program/index'
Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    user: user,
    programs:loadedPrograms
  }
})
