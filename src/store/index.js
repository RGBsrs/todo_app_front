import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://127.0.0.1:5000/api/v1'

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    filter: 'all',
    todos : [],
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
    checkAll(state, checked) {
      state.todos.forEach(todo => (todo.completed = checked))
    },
    retrieveTodos(state, todos) {
      state.todos = todos
    },
    retrieveToken(state, token) {
      state.token = token
    }
  },
  actions: {
    retrieveToken(context, credentials) {
      axios.post('login', {
        email: credentials.email,
        password: credentials.password,
      })
      .then(response => {
        const token = response.data.token
        
        localStorage.setItem('token', token)
        context.commit('retrieveToken', token)
      })
      .catch(error => {
        console.log(error)
      })
    },
    retrieveTodos(context) {
      axios.get('todos')
      .then(response => {
        context.commit('retrieveTodos', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    addTodo(context, todo) {
      axios.post('todos', {
        title: todo.title,
        completed: false,

      })
      .then(response => {
        context.commit('addTodo', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    updateTodo(context, todo) {
      axios.patch('todos/' + todo.id, {
        title: todo.title,
        completed: todo.completed,
      })
      .then(response => {
        context.commit('updateTodo', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    deleteTodo(context, id) {
      axios.delete('todos/' + id)
      .then(() => {
        context.commit('deleteTodo', id)
      })
      .catch(error => {
        console.log(error)
      })
    },
    clearCompleted(context) {
      axios.delete('todos/')
      .then(() => {
        context.commit('clearCompleted')
      })
      .catch(error => {
        console.log(error)
      })
    },
    updateFilter(context, filter) {
        context.commit('updateFilter', filter)
    },
    checkAll(context, checked) {
      axios.patch('todos/',{
        completed: checked
      })
      .then(() => {
        context.commit('checkAll', checked)
      })
      .catch(error => {
        console.log(error)
      })
    },
  },
  modules: {
  }
})
