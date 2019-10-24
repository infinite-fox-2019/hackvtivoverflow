<template>
  <div id="sidebar">
    <div class="toregista" v-if="!isLogin">
      <router-link to="/register">
        <h6>Register</h6>
      </router-link>
    </div>
    <div class="toall" @click="toall">
      <router-link to="/questions">
        <h6>Questions</h6>
      </router-link>
    </div>
    <router-link to="/questions/create">
      <div class="modallogin a">
        <h6>Ask Question</h6>
      </div>
    </router-link>
    <div class="modallogin a">
      <router-link to="/questions/tags">
        <h6>Tags</h6>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    toall () {
      this.$store.dispatch('getAll')
    }
  }
}
</script>

<style scoped>
#sidebar {
  width: 17vw;
  min-height: 100vh;
  background:whitesmoke;
}
.a {
  padding: 10px;
}
div a.router-link-exact-active {
  background: white;
  color: #42b983;
}
</style>
