import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    filter: 'all',
    todos : [
      {
        'id':1,
        'title': 'Finish Vue Forms',
        'completed': false,
        'editing': false,
      },
      {
        'id':2,
        'title': 'Finish Vue Forms',
        'completed': true,
        'editing': false,
      },
      {
        'id':3,
        'title': 'Finish Vue Forms',
        'completed': false,
        'editing': false,
      },
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
