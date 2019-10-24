<template>
  <div id="app">
    <notifications group="notify" animation-type="velocity" style="margin-top: 70px;"/>
    <Navbar style="padding: 0;"></Navbar>
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  components: {
    Navbar
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.commit('SET_LOGIN')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
</style>
