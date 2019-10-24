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
                    />
                  </div>
                  <div class="form-group">
                    <label><strong>Password</strong></label>
                    <input
                      type="password"
                      v-model="password"
                      class="form-control"
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
            <a id="linkregister" href="#"><b>Create an account</b></a>
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
            text: `Welcome ${result.name}`
            // type: 'warn'
            // type: 'success'
          })
        })
        .catch(console.log)
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
</style>
