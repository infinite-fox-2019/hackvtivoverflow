<template>
    <div>
        <b-nav-item href="#" @click="showModal">Register</b-nav-item>
        <div>
            <b-modal ref="my-modal" hide-footer title="Register">
                <form>
                    <div class="d-block text-center">
                      <div>
                          <input type="text" placeholder="Username" class="form-control" v-model="username">
                      </div>
                      <div>
                          <input type="text" placeholder="Email" class="form-control" v-model="email">
                      </div>
                      <div>
                          <input type="password" placeholder="Password" class="form-control" v-model="password">
                      </div>
                    </div>
                        <b-button class="mt-3" variant="outline-success" block @click="register">Register</b-button>
                        <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Cancel</b-button>
                </form>
            </b-modal>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'register',
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    showModal () {
      this.username = ''
      this.email = ''
      this.password = ''
      this.$refs['my-modal'].show()
    },
    hideModal () {
      this.$refs['my-modal'].hide()
    },
    register () {
      this.$store.dispatch('register', { username: this.username, email: this.email, password: this.password })
        .then(data => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('username', data.username)
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: `Success Register \nWelcome \n${data.username}`,
            showConfirmButton: false,
            timer: 2000
          })
          // this.hideModal()
        })
        .catch(err => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: JSON.parse(err.response.request.response).message[0]
          })
        })
    }
  }
}
</script>

<style>

</style>
