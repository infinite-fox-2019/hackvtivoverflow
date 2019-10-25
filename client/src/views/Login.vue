<template>
  <div class="container">
    <form @submit.prevent="login()" style="margin-top: 30px">
      <div class="form-group">
        <label>Email address</label>
        <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter Your email" v-model="email">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" placeholder="Enter Your Password" v-model="password">
      </div>
      <button type="submit" class="btn btn-primary" style="margin-right:10px">Login</button>
      <button class="btn btn-light" @click.prevent="register()">Register Now</button>
    </form>
  </div>
</template>

<script>
export default {
  computed:{
    password:{
      get(){
        return this.$store.state.login.password
      },
      set(value){
        this.$store.commit('CHANGE_PASSWORD_LOGIN', value)
      }
    },
    email:{
      get(){
        return this.$store.state.login.email
      },
      set(value){
        this.$store.commit('CHANGE_EMAIL_LOGIN', value)
      }
    }
  },
  methods:{
    login(){
      this.$store.dispatch('login')
        .then(info=>{
          this.$router.push('/')
        })
        .catch(err=>{
          swal('email/password wrong', '', 'error')
        })
    },
    register(){
      this.$router.push('/register')
    }
  }
}
</script>

<style>

</style>