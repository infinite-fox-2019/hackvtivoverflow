<template>
  <nav class="p-6 px-14 flex justify-between items-center text-white shadow-lg w-full">
    <div class="ml-24">
      <img src="../assets/logo.png" alt="logo.png" class="h-10">
    </div>
    <div class="flex items-center justify-center w-1/4">
      <form action="" class="w-full" @submit.prevent="search">
        <input type="search" placeholder="Search" class="rounded shadow-2xl w-full border border-gray-200 focus:shadow-outline focus:boder-blue-500 text-gray-800 p-1 px-4 mx-4" v-model="keyword">
      </form>
    </div>
    <div class="flex justify-between">
      <div class="px-2 mx-10">
        <a href="" @click.prevent="ask">Ask a Question</a>
      </div>
      <a v-if="isLogin" href="" @click.prevent="logout">Logout</a>
      <a v-else href="#" @click.prevent="goToLogin">Login</a>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    ask () {
      this.$router.push('/ask')
    },
    logout () {
      this.$store.commit('LOGOUT')
    },
    goToLogin () {
      this.$router.push('/login')
    },
    search () {
      this.$store.commit('UPDATE_KEYWORD', { keyword: this.keyword })
      this.$router.push('/')
      this.$store.dispatch('fetchQuestions')
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
  width: 100%;
  position: sticky;
  top: 0;
}
</style>
