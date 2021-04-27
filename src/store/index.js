import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    filter: 'all',
    todos : [
      {
        'id':1,
        'title': 'Finish Vue Forms 1',
        'completed': false,
        'editing': false,
      },
      {
        'id':2,
        'title': 'Finish Vue Forms 2',
        'completed': false,
        'editing': false,
      },
      {
        'id':3,
        'title': 'Finish Vue Forms 3',
        'completed': false,
        'editing': false,
      },
    ]
  },
  getters: {
    remaining(state) {
      return state.todos.filter(todo => !todo.completed).length;
    },

    anyRemaining(state, getters) {
      return getters.remaining != 0
    },

    todosFiltered(state) {
      if (state.filter == 'all') {
        return state.todos;
      }
      else if (state.filter == 'active') {
        return state.todos.filter((todo) => !todo.completed);
      }
      else if (state.filter == 'completed') {
        return state.todos.filter((todo) => todo.completed);
      }

      return state.todos;
    },

    showClearCompletedButton(state) {
      return state.todos.filter((todo) => todo.completed).length > 0;
    }
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: false,
        editing: false
      })
    },
    updateTodo(state, todo) {
      const index = state.todos.findIndex(item => item.id == todo.id)
      state.todos.splice(index, 1, {
        'id': todo.id,
        'title': todo.title,
        'completed': todo.completed,
        'editing': todo.editing,
      })
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex(item => item.id == id);
      state.todos.splice(index,1);
    },
    clearCompleted(state) {
      state.todos = state.todos.filter((todo) => !todo.completed)
    },
    updateFilter(state, filter) {
      state.filter = filter
    },
    checkAll(state) {
      state.todos.forEach(todo => (todo.completed = event.target.checked))
    },
  },
  actions: {
    addTodo(context, todo) {
      context.commit('addTodo', todo)
    },
    updateTodo(context, todo) {
      context.commit('updateTodo', todo)
    },
    deleteTodo(context, id) {
      context.commit('deleteTodo', id)
    },
    clearCompleted(context) {
      context.commit('clearCompled')
    },
    updateFilter(context, filter) {
      context.commit('updateFilter', filter)
    },
    checkAll(context) {
      context.commit('checkAll')
    },
  },
  modules: {
  }
})
