<template>
  <div>
    <b-navbar type="dark" variant="dark" class="manual">
        <b-navbar-nav class="col-4 left">
            <b-nav-item href="#" @click="home">Home</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="col-4 center">
            <div class="row">
                <askquestion></askquestion>
                <b-nav-item href="#">|</b-nav-item>
                <b-nav-item href="#">My Question</b-nav-item>
            </div>
        </b-navbar-nav>
        <b-navbar-nav class="col-4 right">
            <div class="row">
                <div class="row" v-if="!this.$store.state.isLogin">
                    <login></login>
                    <b-nav-item href="#">|</b-nav-item>
                    <register></register>
                </div>
                <div v-else>
                    <b-nav-item href="#" @click="signout">Sign Out</b-nav-item>
                </div>
            </div>
        </b-navbar-nav>
    </b-navbar>
    </div>
</template>

<script>
import login from './login'
import register from './register'
import askquestion from './askquestion'
import Swal from 'sweetalert2'

export default {
  name: 'navbar',
  methods: {
    home () {
      this.$router.push('/')
    },
    signout () {
      let username = localStorage.getItem('username')
      localStorage.removeItem('username')
      localStorage.removeItem('token')
      this.$store.commit('logout')
      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: `Success Logout \nSee You Again \n${username}`,
        showConfirmButton: false,
        timer: 2000
      })
    }
  },
  components: {
    login,
    register,
    askquestion
  }
}
</script>

<style scoped>
    .manual {
        display: flex;
        align-content: space-around;
        justify-content: space-around;
        padding-right: 45px;
    }
    .left {
        justify-content: flex-start;
    }
    .right {
        justify-content: flex-end;
    }
    .center {
        justify-content: space-around;
    }
    .col-4 {
        padding: 0px;
    }
</style>
