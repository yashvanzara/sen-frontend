import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import LoginComponent from '../components/auth/login'
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
    }

  ]
})
