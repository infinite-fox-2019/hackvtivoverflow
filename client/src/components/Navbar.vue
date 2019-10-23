<template>
  <b-navbar class="navbar">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }" class="brand">
        <img
          src="../assets/brand.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        >
      </b-navbar-item>
    </template>

  <template slot="end">
    <b-navbar-item tag="div" class="end-item">
      <div class="buttons">
        <router-link v-if="!$store.state.isLogin" to="/login">
          <a class="button has-text-info login-button">
            Log in
          </a>
        </router-link>
        <router-link v-if="!$store.state.isLogin" to="/register">
          <a class="button is-info">
            <strong>Sign up</strong>
          </a>
        </router-link>
        <button v-if="$store.state.isLogin" class="button is-dark">{{ $store.state.loggedUser.username.charAt(0).toUpperCase() }}</button>
        <router-link v-if="$store.state.isLogin" to="/login">
          <a @click="logout" class="button has-text-dark login-button">
            Log out
          </a>
        </router-link>
      </div>
    </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style scoped>
.navbar {
  box-shadow: 0px 1px 10px 1px #e4e4e4;
}
.brand {
  margin-left: 10%;
}
.end-item {
  margin-right: 10%;
}
.login-button {
  border: none;
}
</style>
