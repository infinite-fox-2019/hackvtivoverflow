<template>
  <div id="app">
    <Navbar></Navbar>
    <notifications group="alert" position="top center"/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  },
  created () {
    if (localStorage.getItem('username') && localStorage.getItem('email') && localStorage.getItem('access_token')) {
      this.$store.commit('SET_IS_LOGIN', true)
      this.$store.commit('SET_LOGGED_USER', {
        username: localStorage.getItem('username'),
        email: localStorage.getItem('email')
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
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

.notifications {
  margin-top: 50px;
}
</style>
