<template>
  <div class="register flex-center flex-column px-2">
    <div>
      <!-- register // id = "register-container" -->
      <div id="register-container" class="container mt-5" style="width: 120vh; text-align: center;">
        <div class="mb-4">
          <h3>Create account</h3>
        </div>
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <div class="card shadow rounded-lg">
              <div class="card-body">
                <form @submit.prevent="sendData" id="register-form" name="register-form">
                  <div class="form-group">
                    <label><strong>Display Name</strong></label>
                    <input
                      autofocus
                      type="text"
                      v-model="name"
                      class="form-control"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label><strong>Email</strong></label>
                    <input
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
                    <small class="form-text text-muted">Passwords must contain at least eight characters</small>
                  </div>
                  <button type="submit" class="btn btn-primary" style="width: 100%;">
                    register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-5" style="font-size: 13px">
          <span>
            Already have account ?
            <a id="linklogin" @click="linkto"><b>Log in</b></a>
          </span>
        </div>
      </div>
      <!-- END register -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    linkto () {
      this.$router.push('/login')
    },
    sendData () {
      this.$store
        .dispatch('register', {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(result => {
          this.$router.push('/login')
          this.$notify({
            group: 'notify',
            title: 'Successfull Create User',
            text: `Login to continue`,
            type: 'success'
          })
        })
        .catch(error => {
          this.$notify({
            group: 'notify',
            title: 'Registration error',
            text: `${error.data.message}`,
            type: 'error'
          })
        })
    }
  }
}
</script>

<style>
.register {
  align-items: center;
  margin-top: 100px;
}
.card {
  text-align: left;
}
#linklogin {
  cursor: pointer;
  color: #007bff
}
</style>
