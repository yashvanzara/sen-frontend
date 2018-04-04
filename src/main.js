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
import UserComponent from './components/Utility/UserComponent'
import TagsComponent from './components/Utility/TagsComponent'
import QuestionComponent from './components/Utility/QuestionComponent'
import JobProfileComponent from './components/Utility/JobProfile'
import PlacementSeasonComponent from './components/Utility/PlacementSeasonComponent'
import AddJobOpeningComponent from './components/Placement/AddJobOpening'
import ListJobOpeningsComponent from './components/Placement/ListJobOpenings'


import CompanyQuestionComponent from './components/Utility/CompanyQuestions'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Notify from 'vue-notify-me'
/*Spinners*/
Vue.component('half-circle-spinner', HalfCircleSpinner)
Vue.component('fulfilling-bouncing-circle-spinner' ,FulfillingBouncingCircleSpinner)
/*Vuex store*/
Vue.use(Vuex)
/*Vuetify theme*/
Vue.use(Vuetify)
/*Custom Components*/
Vue.use(mavonEditor)

Vue.component('app-student-register-component', StudentRegisterComponent)
Vue.component('app-login-component', LoginComponent)
Vue.component('app-program', ProgramComponent)
Vue.component('app-company', CompanyComponent)
Vue.component('app-users', UserComponent)
Vue.component('app-tags', TagsComponent)
Vue.component('app-questions', QuestionComponent)
Vue.component('app-job-profile', JobProfileComponent)
Vue.component('app-placement-season', PlacementSeasonComponent)
Vue.component('app-add-job-opening', AddJobOpeningComponent)
Vue.component('app-list-job-openings', ListJobOpeningsComponent)
Vue.component('notify-me', Notify)


Vue.component('app-company-questions', CompanyQuestionComponent)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  BASE_URL:'http://localhost:3000/',
  render: h => h(App),
  created(){
    this.$store.dispatch('loadCompanies')
    this.$store.dispatch('loadJobProfiles')
    this.$store.dispatch('loadPlacementSeasons')
    this.$store.dispatch('loadPrograms')
  }
})
