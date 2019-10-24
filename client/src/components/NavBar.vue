<template>
  <b-navbar toggleable="lg" type="dark" variant="danger" style="padding-left:50px; padding-right:50px">
    <NavBarLogo style="cursor:pointer" @click.prevent="toHome()"/>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item>
          <router-link to="/" style="text-decoration:none; color:white">Home</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/Post" style="text-decoration:none; color:white">Ask Question</router-link>
        </b-nav-item>

      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item style="color: white" @click.prevent="logout()">Logout</b-nav-item>
        <Search/>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import Search from '@/components/Search.vue'
import NavBarLogo from '@/components/NavBarLogo.vue'

export default {
  components: {
    Search,
    NavBarLogo
  },
  methods:{
    toHome(){
      this.$router.push('/')
    },
    askQuestion(){
      this.$router.push('/post')
    },
    logout(){
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style>

</style>
