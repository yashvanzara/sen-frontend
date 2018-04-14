import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import { store } from './store'
import App from './App'
import router from './router'
import VueMarkdown from 'vue-markdown'
import VueMoment from 'vue-moment'
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
import AreaOfInterestChart from './components/Charts/PlacementCell/AreaOfInterestChart'
import StudentProgressChart from './components/Charts/Student/QuestionsStatusChart'
import QuestionsProgressByStudentsChart from './components/Charts/PlacementCell/QuestionsProgressByStudentsChart'
import ResumeManagementComponent from './components/User/ResumeManagementComponent'
import MessageTemplateComponent from './components/Notification/MessageTemplateComponent'
import CompanyQuestionComponent from './components/Utility/CompanyQuestionsComponent'
import PageNotFoundComponent from './components/Pages/404'
import NotificationComponent from './components/Notification/NotificationComponent'
import SendNotificationComponent from './components/Notification/SendNotificationComponent'
import StarRating from 'vue-star-rating'
import VueStars from 'vue-stars'
Vue.use(VueMoment)
import SolveSingleCompanyComponent from './components/Training/CompanyQuestions'

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

Vue.component('vue-markdown', VueMarkdown)
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
Vue.component('app-resume-management-component', ResumeManagementComponent)
Vue.component('app-chart-area-of-interest', AreaOfInterestChart)
Vue.component('app-chart-student-progress', StudentProgressChart)
Vue.component('app-chart-questions-solved-by-students', QuestionsProgressByStudentsChart)
Vue.component('app-message-template', MessageTemplateComponent)
Vue.component('app-company-questions', SolveSingleCompanyComponent)
Vue.component('app-notification-dropdown', NotificationComponent)
Vue.component('app-send-notifications', SendNotificationComponent)
Vue.component('app-404', PageNotFoundComponent)
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
    this.$store.dispatch('loadTags')
    this.$store.dispatch('loadCompanies')
    this.$store.dispatch('loadUsers')
    this.$store.dispatch('loadJobProfiles')
    this.$store.dispatch('loadPlacementSeasons')
    this.$store.dispatch('loadPrograms')
    this.$store.dispatch('loadCompanyQuestions')
    this.$store.dispatch('loadPlacementSeasons')
    this.$store.dispatch('loadQuestions')
    this.$store.dispatch('loadResumes')
    this.$store.dispatch('loadTemplates')
    this.$store.dispatch('loadJobOpenings')
    this.$store.dispatch('loadStudentProgress')
    this.$store.dispatch('loadPlacementPolicies')
    this.$store.dispatch('loadAreaOfInterests')
    this.$store.dispatch('loadQuestionTags')
    this.$store.dispatch('loadNotifications')
    this.$store.dispatch('loadNotificationInstances')
    this.$store.dispatch('loadApp')

  }
})
