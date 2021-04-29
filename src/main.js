import Vue from 'vue'
import Master from './components/layouts/Master'
import store from './store'
import router from './router'

Vue.config.productionTip = false

Vue.prototype.$eventBus = new Vue()

new Vue({
  store,
  router,
  render: h => h(Master)
}).$mount('#app')


router.beforeEach((to,from,next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: 'todo',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})