import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App'
import LandingPage from '../components/marketing/LandingPage'
import About from '../components/marketing/About'
import Register from '../components/auth/Register'
import Login from '../components/auth/Login'
import Logout from '../components/auth/Logout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: LandingPage
  },
  {
    path: '/todo',
    name: 'todo',
    component: App,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresVisitor: true,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresVisitor: true,
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
]

const router = new VueRouter({
  routes, 
  mode: 'history'
})


export default router
