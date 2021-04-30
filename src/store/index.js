import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://127.0.0.1:5000/api/v1'

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    id: localStorage.getItem('id') || null,
    filter: 'all',
    todos : [],
  },
  getters: {
    loggedIn(state) {
      return state.token != null
    },
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
    retrieveToken(state, token, id) {
      state.token = token
      state.id = id
    },
    destroyToken(state) {
      state.token = null
    },
    clearTodos(state) {
      state.todos = []
    },
  },
  actions: {
    clearTodos(context) {
      context.commit('clearTodos')
    },
    register(context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/register', {
          name: data.name,
          email: data.email,
          password: data.password,
        })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    retrieveToken(context, credentials) {
      return new Promise((resolve, reject) => {
        axios.post('/login', {
          email: credentials.email,
          password: credentials.password,
        })
        .then(response => {
          const token = response.data.token
          const id = response.data.user_id
          
          localStorage.setItem('token', token)
          localStorage.setItem('id', id)
          context.commit('retrieveToken', token, id)
          console.log(id)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    destroyToken(context) {
      axios.defaults.headers.common['x-access-token'] = localStorage.token
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('/logout')
          .then(response => { 
            console.log(response)         
            localStorage.removeItem('token')
            localStorage.removeItem('id')
            context.commit('destroyToken')
            resolve(response)
          })
          .catch(error => {
            localStorage.removeItem('token')
            localStorage.removeItem('id')
            context.commit('destroyToken')
            reject(error)
          })
        })
      }
    },
    retrieveTodos(context) {
      axios.defaults.headers.common['x-access-token'] = localStorage.token
      axios.get('users/' + localStorage.id + '/todos', {
        headers: {
          'x-access-token': localStorage.token
        },
      })
      .then(response => {
        context.commit('retrieveTodos', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    retrieveName() {
      axios.defaults.headers.common['x-access-token'] = localStorage.token
      return new Promise((resolve, reject) => {
    
      axios.get('users/' + localStorage.id)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
      })
      
    },
    addTodo(context, todo) {
      axios.defaults.headers.common['x-access-token'] = localStorage.token
      axios.post('users/' + localStorage.id + '/todos', {
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
      axios.defaults.headers.common['x-access-token'] = localStorage.token
      axios.patch('users/' + localStorage.id + '/todos/' + todo.id, {
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
      axios.defaults.headers.common['x-access-token'] = localStorage.token
      axios.delete('users/' + localStorage.id + '/todos/' + id)
      .then(() => {
        context.commit('deleteTodo', id)
      })
      .catch(error => {
        console.log(error)
      })
    },
    clearCompleted(context) {
      axios.defaults.headers.common['x-access-token'] = localStorage.token
      axios.delete('users/' + localStorage.id + '/todos/')
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
      axios.defaults.headers.common['x-access-token'] = localStorage.token
      axios.patch('users/' + localStorage.id + '/todos',{
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
