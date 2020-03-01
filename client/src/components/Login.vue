<template>
  <div>
    <b-button @click="openLogin" variant="outline-light" size="sm" class="mt-2">Log In</b-button>

    <b-modal
      v-model="show"
      title="Log In"
      header-bg-variant="danger"
      header-text-variant="light"
      body-bg-variant="dark"
      body-text-variant="light"
      footer-bg-variant="warning"
      footer-text-variant="dark"
    >
      <b-container fluid>
        <form @submit.prevent="tryLogin">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input v-model="email"
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input v-model="password"
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
        </form>
      </b-container>

      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            style="font-weight:700"
            variant="outline-dark"
            class="float-right mr-3"
            @click="tryLogin"
          >Submit</b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import axios from '../config/axios'
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      email: '',
      password: '',
      show: false
    }
  },
  computed: {
    storeshow () {
      return this.$store.state.showLogin
      // return true
    }
  },
  watch: {
    storeshow () {
      if (this.storeshow) {
        this.openLogin()
      }
    },
    show () {
      if (!this.show) {
        this.$store.commit('CHANGE_SHOWLOGIN', false)
      }
    }
  },
  methods: {
    tryClose () {
      this.show = false
    },
    tryLogin () {
      axios({
        method: 'post',
        url: '/users/login',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('email', data.email)
          localStorage.setItem('_id', data._id)
          this.$store.commit('SET_ISLOGIN', true)
        })
        .catch(err => {
          let errors = err.response.data.message || err.response.data.errMsg
          Swal.fire({
            type: 'error',
            title: 'Error!',
            text: errors
          })
        })
        .finally(() => {
          this.email = ''
          this.password = ''
        })
      this.show = false
    },
    openLogin () {
      this.show = true
    }
  }
}
</script>
