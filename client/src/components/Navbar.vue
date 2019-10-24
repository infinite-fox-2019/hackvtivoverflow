<template>
  <nav class="p-6 px-14 flex justify-between items-center text-white shadow-lg w-full">
    <div class="ml-24 p-0 flex items-center">
      <a href=""><img src="../assets/logo.png" alt="home" class="h-12" @click.prevent="goHome"></a>
      <a href="" class="mx-4 hover:text-blue-400" @click.prevent="goUser">My Questions</a>
    </div>
    <div v-if="isLogin" class="flex items-center justify-center w-1/4">
      <form action="" class="w-full" @submit.prevent="search">
        <input type="search" placeholder="Search" class="p-2 search-bar w-full" v-model="keyword">
      </form>
    </div>
    <div class="flex justify-between">
      <div v-if="isLogin" class="px-2 mx-10">
        <a href="" @click.prevent="ask" class="border border-blue-400 bg-green-200 hover:bg-green-400 p-2 rounded-lg text-green-800 font-bold">Ask a Question</a>
      </div>
      <a v-if="isLogin" href="" class="hover:text-red-400" @click.prevent="logout">Logout</a>
      <!-- <a v-else href="#" @click.prevent="goToLogin">Login</a> -->
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
    goUser () {
      this.$router.push('/users')
    },
    goHome () {
      this.$router.push('/')
    },
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
  background-color: #01695ad2;
  width: 100%;
  position: sticky;
  top: 0;
}
.search-bar {
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 1px solid black;

}
</style>
