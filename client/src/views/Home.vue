<template>
  <div class="">
    <NavBar>
      <template v-slot:home>
        <router-link to="/" class="btn btn-primary">Home</router-link>
      </template>
      <template v-slot:register>
        <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#myModal" @click.prevent="showRegister">Register</a>
      </template>
      <template v-slot:login>
        <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#myModal" @click.prevent="showLogin">Login</a>
      </template>
    </NavBar>
    <div class="modal fade" id="myModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body" v-if="showFormRegister">
            <form @submit.prevent="register()">
              <label>Name</label>
              <br>
              <input type="text" required placeholder="Input Your Name" v-model="name">
              <br>
              <label>Email</label>
              <br>
              <input type="email" required placeholder="Input Your Email" v-model="email">
              <br>
              <label>Password</label>
              <br>
              <input type="password" required placeholder="Input Your Pasword" v-model="password">
              <br>
              <input type="submit" class="btn btn-primary">
            </form>
          </div>
          <div class="modal-body" v-if="showFormLogin">
            <form @submit.prevent="login()">
              <label>Email</label>
              <br>
              <input type="email" required placeholder="Input Your Email" v-model="email">
              <br>
              <label>Password</label>
              <br>
              <input type="password" required placeholder="Input Your Pasword" v-model="password">
              <br>
              <input type="submit" class="btn btn-primary">
            </form>
          </div>
        </div>
      </div>
    </div>
    <List></List>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '../components/NavBar'
import List from '../components/List'
export default {
  name: 'home',
  components: {
    NavBar,
    List
  },
  data: () => {
    return {
      name: '',
      email: '',
      password: '',
      showFormRegister: false,
      showFormLogin: false
    }
  },
  methods: {
    showRegister () {
      this.showFormRegister = true
      this.showFormLogin = false
    },
    showLogin () {
      this.showFormRegister = false
      this.showFormLogin = true
    },
    register () {
      let payload = {
        name: this.name,
        password: this.password,
        email: this.email
      }
      console.log(payload)
      this.$store.dispatch('register', payload)
      this.name = ''
      this.password = ''
      this.email = ''
    },
    login () {
      let payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
      this.email = ''
      this.password = ''
    }
  }

}
</script>
