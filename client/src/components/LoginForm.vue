<template>
  <div class="container">
    <figure class="image is-32x32 has-image-centered">
      <img src="../assets/logo.png">
    </figure>
    <div class="notification has-background-white">
      <form @submit.prevent="login">
        <b-field label="Email">
          <b-input v-model="email"></b-input>
        </b-field>
        <b-field label="Password">
          <b-input type="password" v-model="password"></b-input>
        </b-field>
        <button class="button is-info">Log in</button>
      </form>
    </div>
    Don’t have an account? <router-link to="/register" class="has-text-info">Sign up</router-link>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 350px;
  padding-top: 100px;
}
.notification {
  margin: 10px;
  box-shadow: 0px 2px 10px 5px #e4e4e4;
  text-align: left;
}
.button {
  width: 100%;
}
.has-image-centered {
  margin-left: auto;
  margin-right: auto;
}
</style>
