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
