<template>
  <div id="app" class="flex flex-wrap">
    <notifications group="foo" position="bottom right"/>
    <Navbar/>
    <router-view/>
  </div>
</template>
<script>
import Navbar from './components/Navbar'
export default {
  components: {
    Navbar
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  created () {
    this.$store.dispatch('verifyToken')
      .then()
      .catch(err => {
        this.$notify({
          group: 'foo',
          title: 'Sorry',
          type: 'error',
          speed: 1000,
          text: `${err}`
        })
      })
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
  background-image: url('./assets/photo.png');
  background-attachment:local;
  background-size: cover;
  font-size: 80%;
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
