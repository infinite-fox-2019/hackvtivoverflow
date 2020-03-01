<template>
  <div id="app">
    <Navbar></Navbar>
    <div>
    <router-view/>
    </div>
  </div>
</template>
<script>
import Navbar from './components/Navbar.vue'
export default {
  name: 'app',
  components: {
    Navbar
  },
  created () {
    if (localStorage.getItem('token') && localStorage.getItem('_id') && localStorage.getItem('email')) {
      this.$store.commit('SET_ISLOGIN', true)
      this.$store.dispatch('getMyAcc')
    }
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
