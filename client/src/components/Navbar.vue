<template>
  <div class="q-pa-md" id="navbar">
    <q-toolbar class="bg-white text-black shadow-2 borders">
      <q-btn flat label="SansOverflow" class="text-weight-bolder text-h6" @click="toHome"/>
      <q-space />

      <q-input
        dark
        dense
        borderless
        style="width: 300px; max-width: 50%; padding:0 2vh;"
        v-model="text"
        input-class="text-right"
        class="q-ml-md bg-orange-14"
      >
        <template v-slot:append>
          <q-icon v-if="text === '' " name="search" />
          <q-icon v-else name="clear" class="cursor-pointer" @click="eraseSearch"/>
        </template>
      </q-input>

      <q-space />
  
      <q-tabs shrink>
        <q-tab name="login" v-if="!isLogin" class="text-orange-10" label="Login" @click="login = true" />
        <q-tab name="post" v-if="isLogin" label="Post" @click="toQuestionForm" class="bg-orange-14 text-white"/>
        <q-tab name="logout" v-if="isLogin" label="Logout" @click="logout"/>
      </q-tabs>
    </q-toolbar>

    <q-dialog v-model="login" position="top">
      <q-card style="width: 50%; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6 text-center text-bold text-orage-14">{{ headerDialog }}</div>
        </q-card-section>
        <q-card-section style="min-width: 400px">
          <Login @chemail="mdemail" v-if="!register"  @chpass="mdpass"></Login>
          <Register @chemail="mdemail" v-if="register" @chpass="mdpass" @chusername="mdusername"></Register>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Register" color="orange-14" v-if="register" @click.prevent="registerAsycn" />
          <q-btn label="Back to Login" color="orange-14"  outline v-if="register" @click="toLogin" />
          <q-btn label="Login" color="orange-14" v-if="!register" @click.prevent="loginAsync" />
          <q-btn label="register new account" color="orange-14" v-if="!register" outline @click="toRegister" />
        </q-card-actions>
        <q-inner-loading :showing="visible">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
      </q-card>
    </q-dialog>

    <q-dialog position="top" v-model="notification" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card class="bg-orange-14 text-white">

        <q-card-section>
          <div class="text-h6 text-center">{{  message.status }}</div>
        </q-card-section>

        <q-card-section>{{ message.content }}</q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Login from "./Login";
import Register from './Register';

export default {
  name: "Navbar",
  components: {
    Login,
    Register
  },
  data() {
    return {
      headerDialog : 'Sansoverflow Login',
      register : false,
      text: "",
      visible: false,
      login: false,
      email: "",
      password: "",
      username : "",
      message : {
          status : '',
          content : ''
      },
      notification: false
    };
  },
  methods: {
    eraseSearch(){
      this.text = ''
    },
    toLogin(){
      this.headerDialog = 'Sansoverflow Login'
      this.register = false
      this.email = '';
      this.password = '';
      this.username = '';
    },
    toRegister(){
      this.headerDialog = 'Sansoverflow Register'
      this.register = true
      this.email = '';
      this.password = '';
    },
    toHome(){
      this.$router.push('/')
    },
    logout(){
      this.notification = true,
      this.message.status = "See you"
      this.message.content = "Be careful on this wild world!"
      setTimeout(() => {
        this.notification = false
        this.$router.push('/')
      }, 2000);
      this.$store.commit('CHECKLOGIN' , false)
      localStorage.removeItem('token')
    },
    mdemail(payload) {
      this.email = payload;
    },
    mdpass(payload) {
      this.password = payload;
    },
    mdusername(payload) {
      this.username = payload;
    },
    registerAsycn(){
      this.visible = true;
      this.$store
        .dispatch("register", { email: this.email, password: this.password, username: this.username })
        .then(data => {
          setTimeout(() => {
            this.visible = false;
            this.login = false;
            this.notification = true,
            this.message.status = "Register Success"
            this.message.content = "Successfully register new account to SansOverflow! Enjoy!"
            setTimeout(() => {
                this.notification = false,
                this.register = true
            }, 2000);
          }, 1000);
        })
        .catch(err => {
          setTimeout(() => {
            this.visible = false;
            this.login = false;
            this.notification = true,
            this.message.status = "Register Fail"
            this.message.content = "Oops! " + err.data.message
            setTimeout(() => {
                this.notification = false
            }, 3000);
          }, 1000);
          console.log(err);
        });
    },
    loginAsync() {
      this.visible = true;
      this.$store
        .dispatch("login", { email: this.email, password: this.password })
        .then(data => {
          setTimeout(() => {
            this.visible = false;
            this.login = false;
            this.notification = true,
            this.message.status = "Login Success"
            this.message.content = "Successfully logged in to SansOverflow! Enjoy!"
            setTimeout(() => {
                this.notification = false
            }, 2000);
          }, 1000);
        })
        .catch(err => {
          setTimeout(() => {
            this.visible = false;
            this.login = false;
            this.notification = true,
            this.message.status = "Login Fail"
            this.message.content = "Oops! " + err.data.message
            setTimeout(() => {
                this.notification = false
            }, 2000);
          }, 1000);
          console.log(err);
        });
    },
    toQuestionForm(){
      this.$router.push('/questionForm')
    }
  },
  computed : {
    ... mapState(['isLogin'])
  },
  watch : {
    text : function(){
      console.log('trigger ', this.text)
      this.$store.commit('SEARCHTRIGGER', this.text)
    }
  }
};
</script>

<style scoped>
#navbar {
  padding: 0;
  margin: 0;
}
</style>