import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/index'
import loadedPrograms from './program/index'
import loadedCompanies from './company/index'
import loadedTags from './tags/index'
import loadedQuestions from './question/index'
import loadedJobProfiles from './jobprofile/index'
import CompanyQuestions from './companyquestion/index'
import loadedPlacementSeasons from './placementseason'
import loadedJobOpenings from './jobopening'
import Auth from './auth'
import loadedPlacementPolicies from './placementpolicy'
import loadedAreaOfInterests from './areaofinterest'
import loadedQuestionTags from './questiontags'
import loadedStudentProgress from './studentprogress'
import loadedResumes from './resume'
import loadedTemplates from './messagetemplate'
import appLoaded from './shared'
import loadedNotifications from './notifications'
import loadedNotificationInstances from './notificationreceiver'
Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    user: user,
    programs:loadedPrograms,
    companies:loadedCompanies,
    tags:loadedTags,
    questions:loadedQuestions,
    jobProfiles:loadedJobProfiles,
    companyquestions:CompanyQuestions,
    placementseason:loadedPlacementSeasons,
    jobopenings:loadedJobOpenings,
    auth:Auth,
    placementpolicies:loadedPlacementPolicies,
    areaofinterst:loadedAreaOfInterests,
    questiontags:loadedQuestionTags,
    studenrprogress:loadedStudentProgress,
    resume:loadedResumes,
    templates:loadedTemplates,
    app:appLoaded,
    notifications:loadedNotifications,
    notificationInstances:loadedNotificationInstances
  }
})
