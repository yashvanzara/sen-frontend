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
import JobProfileComponent from '../components/Utility/JobProfile'
import PlacementSeasonComponent from '../components/Utility/PlacementSeasonComponent'
import ListJobOpenings from '../components/Placement/ListJobOpenings'
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
      path:'/jobopenings/',
      name:'ListJobOpenings',
      component:ListJobOpenings
    },
    {
      path:'/jobopenings/new/',
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
    }
  ],
  mode:'history'
})
