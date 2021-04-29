<template>
  <div class="page-wrapper login-form">
    <h2 class="login-heading">Register</h2>
    <form action="#">

      <!-- <div v-if="successMessage" class="success-message">{{ successMessage }}</div> -->

      <div class="form-control">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" class="login-input" v-model="name">
        <span class="form-error">err</span>
      </div>

      <div class="form-control">
        <label for="email">Email</label>
        <input type="text" name="email" id="email" class="login-input" v-model="email">
        <span class="form-error">err</span>
      </div>

      <div class="form-control mb-more">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" class="login-input" v-model="password">
        <span class="form-error">err</span>
      </div>

      <div class="form-control">
        <button type="submit" class="btn-submit">Create Account</button>
      </div>

    </form>
  </div>
</template>