<template>
  <div id="app" class="flex flex-wrap">
    <Navbar/>
    <Sidebar v-if="isLogin"/>
    <router-view/>
  </div>
</template>
<script>
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
export default {
  components: {
    Navbar,
    Sidebar
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  created () {
    this.$store.dispatch('verifyToken')
  }
}
</script>
<style>
#app {
  -webkit-font-smoothing: antialiased;
  font-family: 'Comfortaa', cursive;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f7f6f9;
  background-image: url("data:image/svg+xml,%3Csvg width='84' height='48' viewBox='0 0 84 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h12v6H0V0zm28 8h12v6H28V8zm14-8h12v6H42V0zm14 0h12v6H56V0zm0 8h12v6H56V8zM42 8h12v6H42V8zm0 16h12v6H42v-6zm14-8h12v6H56v-6zm14 0h12v6H70v-6zm0-16h12v6H70V0zM28 32h12v6H28v-6zM14 16h12v6H14v-6zM0 24h12v6H0v-6zm0 8h12v6H0v-6zm14 0h12v6H14v-6zm14 8h12v6H28v-6zm-14 0h12v6H14v-6zm28 0h12v6H42v-6zm14-8h12v6H56v-6zm0-8h12v6H56v-6zm14 8h12v6H70v-6zm0 8h12v6H70v-6zM14 24h12v6H14v-6zm14-8h12v6H28v-6zM14 8h12v6H14V8zM0 8h12v6H0V8z' fill='%238ec7b8' fill-opacity='0.11' fill-rule='evenodd'/%3E%3C/svg%3E");
  background-attachment:local;
  background-size: cover;
  /* height: 100vh; */
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
