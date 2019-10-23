<template>
  <div class="container">
    <form autocomplete="off" @submit.prevent="register()">
      <div class="group">
        <label for="email">Username:</label>
        <input type="text" id="username" name="username" v-model='username'>
      </div>
      <div class="group">
        <label for="password">Password:</label>
        <input id="password" type="password" name="password" v-model='password'>
      </div>
      <div class="group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" v-model='email'>
      </div>
      <input type="submit" value="register" id="submit">
    </form>
  </div>
</template>

<script>
export default {
  data () {
      return {
          username: '',
          password: '',
          email: ''
      }
  },
  methods: {
      register () {
          const payload = {
              username: this.username,
              password: this.password,
              email: this.email
          }
          this.$store.dispatch('register', payload)
            .then(success => {
                this.$awn.success(success.msg);
                this.$router.push('/')
            })
            .catch(err => {
                this.$awn.warning(err.response.data.msg)
            })
      }
  }
}
</script>

<style scoped>
.wrapper{
  min-height:100vh;
  background-color:rgba(0,0,0,.4);
  font-family: 'Open Sans', sans-serif;
  padding-top:40px;
}
.container{
  max-width:400px;
  margin:0 auto;
  background-color:white;
  text-align:center;
  padding:50px 0;
  box-shadow:0 0 20px rgba(0,0,0,.4);
  border-radius:3px;
}
.social-login{
  display:block;
  width:50%;
  margin: 5px auto;
  text-decoration:none;
  padding:10px 15px;
  color:#fff;
  border-radius:3px;
  margin-bottom:10px;
  transition:all .3s ease-in-out;
}
.social-login:hover{
    box-shadow:0 10px 15px -5px rgba(0,0,0,0.4);
}
a.fb-login{
  background-color:#3B5998;
}
a.google-login{
  background-color:#db4437;
}
form{
  max-width:250px;
  margin:0 auto;
  text-align:left;
}

p.seperator{
  margin:25px;
}
div.group{
  margin-top:15px;
}
label{
  display:block;
  margin-bottom:5px;
}

div.group input{
  width:100%;
  padding:10px 4px;
  outline:none;
}

a.forget-link{
  color:black;
  display:block;
  margin:10px 0;
}

input[type="submit"]{
  padding:15px 35px;
  outline:none;
  border:None;
  background-color:#20c198;
  color:white;
  transition:all .3s ease-in-out;
}
input[type="submit"]:hover{
  cursor:pointer;
  box-shadow:0 10px 15px -5px rgba(0,0,0,0.4);
}
</style>