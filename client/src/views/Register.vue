<template>
  <div class="container">
    <form @submit.prevent="register()" style="margin-top: 30px">
      <div class="form-group">
        <label>Display Name</label>
        <input type="type" class="form-control" placeholder="Enter Your Display Name" v-model="displayName">
      </div>
      <div class="form-group">
        <label>Email address</label>
        <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter Your email" v-model="email">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" placeholder="Enter Your Password" v-model="password">
      </div>
      <button type="submit" class="btn btn-primary" style="margin-right:10px">Register</button>
      <button class="btn btn-light" @click.prevent="login()">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  computed:{
    displayName:{
      get(){
        return this.$store.state.register.displayName
      },
      set(value){
        this.$store.commit('CHANGE_DISPLAY_NAME_REGISTER', value)
      }
    },
    password:{
      get(){
        return this.$store.state.register.password
      },
      set(value){
        this.$store.commit('CHANGE_PASSWORD_REGISTER', value)
      }
    },
    email:{
      get(){
        return this.$store.state.register.email
      },
      set(value){
        this.$store.commit('CHANGE_EMAIL_REGISTER', value)
      }
    }
  },
  methods:{
    register(){
      this.$store.dispatch('register')
        .then(info=>{
          this.$router.push('/')
        })
    },
    login(){
      this.$router.push('/login')
    }
  }
}
</script>

<style>

</style>