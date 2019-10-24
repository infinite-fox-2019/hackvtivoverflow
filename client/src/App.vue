<template>
  <div id="app">
    <Navbar/>
    <router-view/>
    <!-- <Footer/> -->
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer'
export default {
  name: 'app',
  components: {
    Navbar,
    Footer
  },
  created(){
    if(localStorage.getItem('access_token')){
      console.log('masuk')
      this.$store.commit('LOGIN_STATUS_CHANGE', true)
      this.$router.push({path:'/'})
    }
  }
}
</script>

<style>

</style>
