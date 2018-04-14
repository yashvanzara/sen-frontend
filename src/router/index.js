import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import LoginComponent from '../components/auth/LoginComponent'
import StudentRegisterComponent from '../components/auth/StudentRegisterComponent'
import AddJobOpeningComponent from '../components/Placement/AddJobOpening'
import ProgramComponent from '../components/Utility/ProgramComponent'
import CompanyComponent from '../components/Utility/CompanyComponent'
import UserComponent from '../components/Utility/UserComponent'
import QuestionTagsComponent from '../components/Utility/TagsComponent'
import QuestionComponent from '../components/Utility/QuestionComponent'
import JobProfileComponent from '../components/Utility/JobProfileComponent'
import PlacementSeasonComponent from '../components/Utility/PlacementSeasonComponent'
import ListJobOpenings from '../components/Placement/ListJobOpenings'
import PlacementPolicyComponent from '../components/Utility/PlacementPolicyComponent'
import ProfileHolderComponent from '../components/User/ProfileHolderComponent'
import AddQuestionComponent from '../components/Training/AddQuestionComponent'
import PracticeCompanyComponent from '../components/Training/PracticeCompanyWise'
import PracticeCategoryComponent from '../components/Training/PracticeCategoryWise'
import PageNotFoundComponent from '../components/Pages/404'
import SolveSingleCompanyQuestions from '../components/Training/CompanyQuestions'
import ListJobOpeningsComponent from '../components/Placement/ListJobOpenings'
import SendNotificationComponent from '../components/Notification/SendNotificationComponent'
import AuthGuard from './auth-guard'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path:'/login',
      name:'Login',
      component:LoginComponent
    },
    {
      path:'/studentregister',
      name:'StudentRegister',
      component:StudentRegisterComponent
    },
    {
      path:'/jobopening/new/',
      name:'NewJobOpening',
      component:AddJobOpeningComponent
    },
    {
      path:'/manage/programs/',
      name:'ManagePrograms',
      component:ProgramComponent
    },
    {
      path:'/manage/companies/',
      name:'ManageCompanies',
      component:CompanyComponent
    },
    {
      path:'/manage/users/',
      name:'ManageUsers',
      component:UserComponent
    },
    {
      path:'/manage/tags/',
      name:'ManageTags',
      component:QuestionTagsComponent
    },
    {
      path:'/manage/questions/',
      name:'ManageQuestions',
      component:QuestionComponent
    },
    {
      path:'/manage/jobprofiles/',
      name:'ManageJobProfiles',
      component:JobProfileComponent
    },
    {
      path:'/manage/placementseasons/',
      name:'ManagePlacementSeasons',
      component:PlacementSeasonComponent
    },
    {
      path:'/manage/placementpolicies/',
      name:'ManagePlacementPolicies',
      component:PlacementPolicyComponent
    },
    {
      path:'/profile',
      name:'ProfileHolder',
      component:ProfileHolderComponent,
      beforeEnter:AuthGuard
    },
    {
      path:'/training/addquestion/',
      name:'AddQuestion',
      component:AddQuestionComponent
    },
    {
      path:'/practice/company/',
      name:'PracticeCompanySection',
      component:PracticeCompanyComponent
    },
    {
      path:'/practice/category/:category_id',
      name:'PracticeCategorySectionId',
      component:PracticeCategoryComponent
    },
    {
      path:'/practice/category/',
      name:'PracticeCategorySection',
      component:PracticeCategoryComponent
    },
    {
      path:'/404/',
      name:'404NotFound',
      component:PageNotFoundComponent
    },
    {
      path:'/practice/company/:id',
      name:'solvesinglecompanyquestions',
      component:SolveSingleCompanyQuestions
    },
    {
      path:'/jobopenings/',
      name:'ListJobOpenings',
      component:ListJobOpeningsComponent
    },
    {
      path:'/sendnotifications/',
      name:'SendNotifications',
      component:SendNotificationComponent
    },
  ],
  mode:'history',
})
