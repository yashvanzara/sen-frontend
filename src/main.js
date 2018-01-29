import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import { store } from './store'
import App from './App'
import router from './router'
import LoginComponent from './components/auth/LoginComponent'
import StudentRegisterComponent from './components/auth/StudentRegisterComponent'

Vue.use(Vuex)
Vue.use(Vuetify)
Vue.component('app-student-register-component', StudentRegisterComponent)
Vue.component('app-login-component', LoginComponent)
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
