<template>
  <b-navbar class="navbar has-background-light">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }" class="brand">
        <div>
        <img
          src="../assets/logo.png"
          alt="Fake Overflow Logo"
        >fake<strong>overflow</strong>
        </div>
      </b-navbar-item>
    </template>

  <template slot="end">
    <b-navbar-item tag="div" class="end-item">
      <div class="buttons">
        <router-link v-if="!$store.state.isLogin" to="/login">
          <a class="button is-light has-text-info login-button">
            Log in
          </a>
        </router-link>
        <router-link v-if="!$store.state.isLogin" to="/register">
          <a class="button is-info">
            <strong>Sign up</strong>
          </a>
        </router-link>
        <router-link to="/users">
        <button v-if="$store.state.isLogin" class="button is-dark">{{ $store.state.loggedUser.username.charAt(0).toUpperCase() }}</button>
        </router-link>
        <router-link v-if="$store.state.isLogin" to="/login">
          <a @click="logout" class="button has-text-dark is-light login-button">
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
  font-family: 'Ubuntu', sans-serif;
  font-size: 20px;
}
.end-item {
  margin-right: 10%;
}
.login-button {
  border: none;
}
</style>
