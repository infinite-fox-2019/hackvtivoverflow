
<template>
  <div class="login d-flex justify-content-center align-items-center">
     <div>
         <div class="d-flex justify-content-center mb-1">
        <i  class="fab fa-stack-overflow login-logo">N</i>
        <h1 style="font-family: 'Baloo Bhai', cursive;">overflow</h1>
         </div>
          <div class="login-form">
          <p class="text-center">Login</p>
            <form class="p-3 mt-5">
                <div class="form-group d-flex align-items-center">
                    <i class="fas fa-user"></i>
                    <input v-model="email" type="text" class="form-control ml-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <div class="form-group d-flex align-items-center">
                    <i class="fas fa-lock-open"></i>
                    <input v-model="password" type="password" class="form-control ml-1" id="exampleInputPassword1" placeholder="Password">
                </div>
                <div class="d-flex">
                    <button  @click.prevent="login" class="login-btn">Login</button>
                    <button  @click.prevent="register" class="login-btn">Register</button>
                </div>
            </form>
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
    login () {
      let payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
    },

    register () {
      let payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('register', payload)
      this.$router.push(`/`)
    }
  }

}
</script>

<style>

.login {
    background-color: #9633FF;
    width: 100%;
    height: 90vh;
}
.login-logo{
    color: rgb(255, 255, 255);
    font-size: 50px;
}
.login-form {
    width: 400px;
    height: 400px;
    padding: 15px;
    background-color: aliceblue;
    font-family: 'Baloo Bhai', cursive;
    border-radius: 15px;
    box-shadow: 0px 0px 33px -2px rgba(95, 14, 149, 0.75);
}
.login-form p {
    font-size: 35px;
}
.login-form i {
    color: #9633FF;
    font-size: 20px;

}
.login-form input {
    border-radius: 35px;
    box-shadow: 0px 0px 33px -2px rgba(118, 81, 143, 0.513);

}

.login-btn {
    width: 60%;
    border: none;
    padding: 5px;
    border-radius: 15px;
    background-image: linear-gradient(to right top, #892ae0, #7c20e4, #6d16e9, #590bee, #3c01f3);
    color: white;
    margin-top: 25px;
}

</style>
