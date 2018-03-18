import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import { store } from './store'
import App from './App'
import router from './router'
import { HalfCircleSpinner } from 'epic-spinners'
import { FulfillingBouncingCircleSpinner } from 'epic-spinners'
import LoginComponent from './components/auth/LoginComponent'
import StudentRegisterComponent from './components/auth/StudentRegisterComponent'
import ProgramComponent from './components/Utility/ProgramComponent'
import CompanyComponent from './components/Utility/CompanyComponent'

/*Spinners*/
Vue.component('half-circle-spinner', HalfCircleSpinner)
Vue.component('fulfilling-bouncing-circle-spinner' ,FulfillingBouncingCircleSpinner)
/*Vuex store*/
Vue.use(Vuex)
/*Vuetify theme*/
Vue.use(Vuetify)
/*Custom Components*/

Vue.component('app-student-register-component', StudentRegisterComponent)
Vue.component('app-login-component', LoginComponent)
Vue.component('app-program', ProgramComponent)
Vue.component('app-company', CompanyComponent)
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  BASE_URL:'http://localhost:3000/',
  render: h => h(App)
})
