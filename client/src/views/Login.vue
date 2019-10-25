<template>
  <div>
    <nav-bar-start></nav-bar-start>
    <br>
    <div style="width:100%; align-items:center;">
      <form @submit.prevent="login()">
        <label>Email</label>
        <br>
        <input type="email" required placeholder="Input Your Email" v-model="email">
        <br>
        <label>Password</label>
        <br>
        <input type="password" required placeholder="Input Your Pasword" v-model="password">
        <br>
        <input type="submit" class="btn btn-primary"  value="login">
    </form>
    </div>
  </div>
</template>

<script>
import NavBarStart from '../components/NavBarStart'
export default {
  name: 'login',
  components: {
    NavBarStart
  },
  data: () => {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      let payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
      this.email = ''
      this.password = ''
      this.isLogin = true
    }
  }
}
</script>

<style>

</style>
