import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App'
import LandingPage from '../components/marketing/LandingPage'
import About from '../components/marketing/About'
import Register from '../components/auth/Register'
import Login from '../components/auth/Login'

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
    component: App
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]

const router = new VueRouter({
  routes, 
  mode: 'history'
})

export default router
