<template>
  <div class="m-0 py-40 flex justify-center ">
    <div class=" flex justify-center rounded-lg shadow-lg flex-wrap form-container w-1/2 xs:w-full sm:w-1/2 md:w-1/2 lg:w-1/3 ">
        <div class="p-2">
          <p class="font-bold text-2xl text-white ">log in</p>
        </div>
        <form action="" @submit.prevent="login" class="flex flex-wrap justify-start p-4 rounded items-center">
          <label class=" px-2 mx-8 font-bold text-white shadow-4xl text-lg" for="">Email</label>
          <input type="email" name="email" v-model="email" class="w-full rounded-lg shadow border border-blue-100 focus:border-blue-500 text-green-500 p-2 m-4">
          <label class=" px-2 mx-8 font-bold text-white shadow-4xl text-lg" for="password">Password</label>
          <input type="password" name="password" v-model="password" class="w-full rounded-lg shadow border border-blue-100 focus:border-blue-500 text-gray-800 p-2 m-4">
          <button type="button" class="p-2 mx-8 bg-blue-400 hover:bg-blue-800 text-white hover:text-gray-200 shadow rounded px-10 rounded-lg" @click.prevent="login">Login</button>
        </form>
        <div class="flex justify-start w-full p-4 mx-8">
          <a href="" class="text-white p-1 text-lg italic hover:text-blue-700 " @click.prevent="goToRegister">Create a new account?</a>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    goToRegister () {
      this.$router.push('/register')
    },
    login () {
      this.$store.dispatch('login', { email: this.email, password: this.password })
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style>
.form-container {
  background-color: #02837074
}
</style>
