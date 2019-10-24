<template>
    <div>
    <form @submit.prevent="register" class="form-register">
      <img class="mb-4" src="https://image.flaticon.com/icons/svg/1683/1683643.svg" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Register</h1>
      <label for="inputUserName" class="sr-only"></label>
      <input v-model="username" type="text" id="inputUserName" class="form-control" placeholder="User Name"  autofocus>
      <label for="inputEmail" class="sr-only"></label>
      <input v-model="email" type="text" id="inputEmail" class="form-control" placeholder="Email address"  autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" >

      <p class="text-danger">{{$store.state.error}}</p>
      
      <button class="btn btn-lg btn-primary btn-block mt-5" type="submit">Register !</button>
      <p class="mt-5 mb-3 text-muted">&copy; H8-Overflow 2019</p>
    </form>

    </div>

</template>

<script>
export default {
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      let payload = { username: this.username, email: this.email, password: this.password }
      this.$store.dispatch('registerToStateAct', payload)
    }
  },created () {
      this.$store.commit('ERROR', '')
  }
}
</script>

<style scoped>
div {
  height: 100%;
}

div {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-register {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-register .checkbox {
  font-weight: 400;
}
.form-register .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-register .form-control:focus {
  z-index: 2;
}
.form-register input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-register input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
