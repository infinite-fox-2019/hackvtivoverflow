<template>
  <div>
    <NavBar />

    <router-view/>
  </div>
  <!-- <div id="app"> -->
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
  <!-- </div> -->
</template>

<script>
// import { mapState } from 'vuex'
import NavBar from './components/NavBar.vue'
export default {
  components: {
    NavBar
  },
  mounted () {
    let token = localStorage.getItem('token')
    if (token) {
      this.$store.dispatch('logged')
    }
  }
}
</script>

<style>
body {
  font-family: 'Baloo Bhai', cursive;
}

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
