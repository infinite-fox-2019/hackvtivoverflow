<template>
  <div>
    <b-button @click="show=true" variant="outline-light" size="sm" class="mt-2">Log In</b-button>

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
export default {
  data () {
    return {
      show: false,
      email: '',
      password: ''
    }
  },
  methods: {
    tryLogin () {
      console.log('yuhiii')
      this.show = false
    }
  }
}
</script>
