<template>
    <b-navbar toggleable="lg" type="dark" class="sticky-top" variant="primary">
      <router-link to="/"><b-navbar-brand class="nav-title">dipaoverflow</b-navbar-brand></router-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <router-link v-if="!$store.state.isLogin" to="/login"><b-button size="sm" class="my-2 my-sm-0 mr-2">Login</b-button></router-link>
          <router-link v-if="$store.state.isLogin" to="/addquestion"><b-button size="sm" class="my-2 my-sm-0 mr-2">Question?</b-button></router-link>
          <b-button v-if="$store.state.isLogin" @click.prevent="logout()" size="sm" class="my-2 my-sm-0 mr-2">Logout</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</template>

<script>
export default {
  name:'navbar',
  methods:{
    logout(){
      localStorage.removeItem('access_token')
      localStorage.removeItem('name')
      this.$store.commit('LOGIN_STATUS_CHANGE', false)
      this.$store.commit('LOGIN_NAME_CHANGE', null)
      this.$router.push({path:'/about'})
    }
  }
}
</script>

<style>
  .nav-title{
    font-weight: bold;
    margin-left: 15px;
  }
</style>
