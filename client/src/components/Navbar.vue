<template>
  <nav class="p-8 px-14 flex justify-between items-center text-white shadow-lg">
    <div>
      FlowOver
    </div>
    <div class="flex items-center justify-center w-1/4">
      <p>Search   </p>
      <form action="" class="w-full">
        <input type="search" class="rounded shadow-2xl w-full border border-gray-200 focus:shadow-outline focus:boder-blue-500 text-gray-800 p-1 mx-4">
      </form>
    </div>
    <div class="flex justify-between">
      <div class="px-2 mx-10">
        <a href="">My Questions</a>
      </div>
      <a v-if="isLogin" href="" @click.prevent="logout">Logout</a>
      <a v-else href="#" @click.prevent="goToLogin">Login</a>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.commit('LOGOUT')
    },
    goToLogin () {
      this.$router.push('/login')
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  }
}
</script>

<style>
nav {
  background-color: #004d41d2;
}
</style>
