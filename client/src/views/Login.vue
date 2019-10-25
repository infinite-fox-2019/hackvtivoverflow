<template>
  <div class="login flex-center flex-column px-2">
    <div>
      <!-- Login // id = "login-container" -->
      <div id="login-container" class="container mt-5" style="width: 120vh; text-align: center;">
        <div class="mb-5" style="font-size: 50px;">
          <i class="fab fa-stack-overflow"></i>
        </div>
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <div class="card shadow rounded-lg">
              <div class="card-body">
                <form id="login-form" name="login-form" @submit.prevent="sendData">
                  <div class="form-group">
                    <label><strong>Email</strong></label>
                    <input
                      autofocus
                      type="email"
                      v-model="email"
                      class="form-control"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label><strong>Password</strong></label>
                    <input
                      type="password"
                      v-model="password"
                      class="form-control"
                      required
                    />
                  </div>
                  <button type="submit" class="btn btn-primary" style="width: 100%;">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-5" style="font-size: 13px">
          <span>
            No account ?
            <a id="linkregister" @click="linkto"><b>Create an account</b></a>
          </span>
        </div>
      </div>
      <!-- END LOGIN -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {},
  methods: {
    linkto () {
      this.$router.push('/register')
    },
    sendData () {
      this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password
        })
        .then(result => {
          // swal
          this.$router.push('/')
          this.$notify({
            group: 'notify',
            title: 'Successfull Login',
            text: `Welcome ${result.name}`,
            type: 'success'
            // type: 'warn'
          })
        })
        .catch(error => {
          console.log(error)
          this.$notify({
            group: 'notify',
            title: 'Login error',
            text: `${error.data.message}`,
            type: 'error'
          })
        })
    }
  }
}
</script>

<style>
.login {
  align-items: center;
  margin-top: 100px;
}
.card {
  text-align: left;
}
#linkregister {
  cursor: pointer;
  color: #007bff
}
</style>
