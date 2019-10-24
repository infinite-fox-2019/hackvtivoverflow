<template>
    <div>
    <form @submit.prevent="signin" class="form-signin">
      <img class="mb-4" src="https://image.flaticon.com/icons/svg/1683/1683643.svg" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only"></label>
      <input v-model="email" type="text" id="inputEmail" class="form-control" placeholder="Email address" autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" >

      <p class="text-danger">{{$store.state.error}}</p>

      <div class="d-flex justify-content-center">
          <p>
            Not a member? , <span class="btn btn-link"> <router-link to="/register"> Register Here</router-link> </span>
          </p>

      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-muted">&copy; H8-Overflow 2019</p>
    </form>

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
    signin () {
      let payload = { email: this.email, password: this.password }
      this.$store.dispatch('signinToStateAct', payload)
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

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
