import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import { store } from './store'
import App from './App'
import router from './router'

import LoginComponent from './components/auth/LoginComponent'
import StudentRegisterComponent from './components/auth/StudentRegisterComponent'
import ProgramComponent from './components/Utility/ProgramComponent'
import CompanyComponent from './components/Utility/CompanyComponent'
import UserComponent from './components/Utility/UserComponent'
import TagsComponent from './components/Utility/TagsComponent'
import QuestionComponent from './components/Utility/QuestionComponent'
import JobProfileComponent from './components/Utility/JobProfileComponent'
import PlacementSeasonComponent from './components/Utility/PlacementSeasonComponent'
import AddJobOpeningComponent from './components/Placement/AddJobOpening'
import ListJobOpeningsComponent from './components/Placement/ListJobOpenings'
import PlacementPolicyComponent from './components/Utility/PlacementPolicyComponent'
import AreasOfInterestComponent from './components/User/AreaOfInterestComponent'
import UserProfileComponent from './components/User/UserProfileComponent'
import AddQuestionComponent from './components/Training/AddQuestionComponent'
import PracticeCompanyWiseComponent from './components/Training/PracticeCompanyWise'
import PracticeCategoryWiseComponent from './components/Training/PracticeCategoryWise'
import StudentDashboardComponent from './components/Dashboard/StudentDashboard'
import PlacementCellDashboardComponent from './components/Dashboard/SPCDashboard'
import PlacedVsInterestedChart from './components/Charts/PlacementCell/PlacedVsInterestedChart'
import StarRating from 'vue-star-rating'
import VueStars from 'vue-stars'

import CompanyQuestionComponent from './components/Utility/CompanyQuestionsComponent'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Notify from 'vue-notify-me'
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(VueChartkick, {adapter: Chart})
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
Vue.component('app-placement-policy', PlacementPolicyComponent)
Vue.component('app-areas-of-interest', AreasOfInterestComponent)
Vue.component('app-user-profile-component', UserProfileComponent)
Vue.component('notify-me', Notify)
Vue.component('star-rating', StarRating)
Vue.component('app-add-question-component', AddQuestionComponent)
Vue.component('app-practice-component', PracticeCompanyWiseComponent)
Vue.component('app-practice-categorywise', PracticeCategoryWiseComponent)
Vue.component('app-student-dashboard', StudentDashboardComponent)
Vue.component('app-spc-dashboard', PlacementCellDashboardComponent)
Vue.component('vue-stars', VueStars)
Vue.component('app-chart-placed-vs-interested', PlacedVsInterestedChart)
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
    this.$store.dispatch('autoSignIn')
    this.$store.dispatch('loadCompanies')
    this.$store.dispatch('loadJobProfiles')
    this.$store.dispatch('loadPlacementSeasons')
    this.$store.dispatch('loadPrograms')
    this.$store.dispatch('loadCompanyQuestions')
    this.$store.dispatch('loadPlacementSeasons')
    this.$store.dispatch('loadQuestions')
    this.$store.dispatch('loadUsers')
    this.$store.dispatch('loadTags')
    this.$store.dispatch('loadPlacementPolicies')
    this.$store.dispatch('loadAreaOfInterests')
    this.$store.dispatch('loadQuestionTags')
  }
})
