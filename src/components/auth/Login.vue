<template>
  <div class="page-wrapper login-form">
    <h2 class="login-heading">Login</h2>
    <form action="#" @submit.prevent="login">

      <div v-if="serverError" class="server-error">{{serverError}}</div>

      <div class="form-control">
        <label for="email">Email</label>
        <input type="text" name="email" id="username" class="login-input" v-model="email">
      </div>

      <div class="form-control mb-more">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" class="login-input" v-model="password">
      </div>

      <div class="form-control">
        <button type="submit" class="btn-submit" >
          Login
        </button>
      </div>

    </form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      serverError: '',
    }
  },
  methods: {
    login() {
      this.$store.dispatch('retrieveToken', {
        email: this.email,
        password: this.password,
      })
      .then(() => {
        this.$router.push({name : 'todo'})
      })
      .catch(error => {
        this.serverError = error.response.data.message
        this.password = ''
      })
    }
  },
}
</script>