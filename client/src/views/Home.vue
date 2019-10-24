<template>
  <div class="home mt-5">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Jumbotron v-if="!this.$store.state.isLogin" />
    <!-- <AllQuestion v-if="this.$store.state.isLogin"  class="mt-5"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Jumbotron from '@/components/Jumbotron.vue'

export default {
  name: 'home',
  components: {
    // HelloWorld
    Jumbotron
  }
}
</script>
