<template>
  <div>
    <nav-bar-start></nav-bar-start>
    <br>
    <div style="width:100%; align-items:center;">
      <form @submit.prevent="register()">
              <label>Name</label>
              <br>
              <input type="text" required placeholder="Input Your Name" v-model="name">
              <br>
              <label>Email</label>
              <br>
              <input type="email" required placeholder="Input Your Email" v-model="email">
              <br>
              <label>Password</label>
              <br>
              <input type="password" required placeholder="Input Your Pasword" v-model="password">
              <br>
              <input type="submit" class="btn btn-primary" id="btn-register" value="register">
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
      password: '',
      name: ''
    }
  },
  methods: {
    register () {
      let payload = {
        name: this.name,
        password: this.password,
        email: this.email
      }
      console.log(payload)
      this.$store.dispatch('register', payload)
      this.name = ''
      this.password = ''
      this.email = ''
      this.showModal = false
    }
  }
}
</script>

<style>

</style>
