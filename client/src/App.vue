<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
      <navbar></navbar>
    </div>
    <router-view/>
  </div>
</template>

<script>
import navbar from './components/navbar'

export default {
  name: 'app',
  components: {
    navbar
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.commit('login')
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
  /* background-color: rgba(40,57,101,.9); */
}
/* #nav {
  padding: 30px;
} */

#nav a {
  font-weight: bold;
  color: #ffffff;
}

/* #nav a.router-link-exact-active {
  color: rgba(40,57,101,.9);
} */
</style>
