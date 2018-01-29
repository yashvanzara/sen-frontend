import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import LoginComponent from '../components/auth/LoginComponent'
import StudentRegisterComponent from '../components/auth/StudentRegisterComponent'
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
    }
  ],
  mode:'history'
})
