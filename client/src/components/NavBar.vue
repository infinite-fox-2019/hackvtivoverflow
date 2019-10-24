<template>
<div>
  <q-header  bordered id="test">
    <q-toolbar>
      <a @click="home">HacktivOverflow</a>
      <div id="search">
      <q-input outlined v-model="text" :dense="dense" placeholder="Search...">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
      </div>
       <div class="q-pa-md q-gutter-sm">
        <q-btn color="primary" icon="person" @click='loginModal' v-if="!login"  label="Login"  :size="size"/>
        <q-btn color="primary" icon="person_add" label="Register" @click="register" :size="size" v-if="!login" />
        <q-btn color="primary" label="Profile" @click="profile" :size="size" v-if="login" />
        <q-btn color="primary" label="Logout" @click="logout" :size="size" v-if="login" />
      </div>
    </q-toolbar>
  </q-header>
  <q-dialog v-model="loginModalState">
      <q-card style="width: 500px; max-width: 80vw;">
        <div class="q-pa-md" style="max-width: 400px">
          <h4>Login</h4>
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
          <q-input
            type="email"
            v-model="email"
            label="Your email *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please input your email']"
          />
          <q-input
            type="password"
            v-model="password"
            label="Your password *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please input your password']"
          />
          <div>
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
          </q-form>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import jwt from 'jsonwebtoken'

export default {
  data() {
    return {
      text: "",
      email: '',
      password: '',
      dense: true,
      size: 'sm',
      loginModalState: false
    };
  },
  methods:{
    loginModal(){
      this.loginModalState = true
    },
    onSubmit () {
      let payload = {
        email:this.email,
        password:this.password
      }
      this.$store.dispatch('loggingIn',payload)
        .then(()=>{
        this.loginModalState = false
          this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_box',
          message: 'Logged in'
        })
      })
        .catch((err)=>{
          this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: `${err.response.data.msg}`
        })
      })
    },
    onReset () {
      this.email = ''
      this.password = ''
    },
    logout(){
      this.$router.push('/')
      localStorage.removeItem('token')
      this.$store.commit('LOGIN',false)
    },
    register(){
      this.$router.push('/register')
    },
    home(){
      this.$router.push('/')
    },
    profile(){
      let token = localStorage.getItem('token')
      let verify = jwt.verify(token,'secretecommerce123')
      this.$router.push(`/profile/${verify.id}`)
    }
  },
  computed : mapState(['login'])
}
</script>

<style>
#nav {
  border: black 1px solid;
}
#test {
  background-color: white;
  color: black;
}
#search{
  width: 60%;
  margin: 0 auto
}
h4{
  margin: 10px 10px 30px 10px
}
/* .q-toolbar{
padding: 0px;
min-height: 0%
} */
</style>