<template>
  <section id="navbar-component" style="background: #f0f0f0; width:100%">
    <div class="container py-3">
      <div class="row">
        <div class="col-md-12 d-flex justify-content-between">
          <a @click.prevent="$router.push('/')" href>
            <img
              src="@/assets/logo.png"
              alt="logo"
              style="height: 40px; width: auto;"
            />
          </a>
          <button
            v-if="token === null"
            v-b-modal.modal-login
            class="btn btn-primary px-4"
          >
            Login
          </button>
          <button @click="logout" v-else class="btn btn-primary px-4">
            Logout
          </button>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-login"
      ref="modal-login"
      title="Login"
      :hide-footer="true"
      @show="resetModalLogin"
      @hidden="resetModalLogin"
    >
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="#">Email</label>
          <input
            autofocus
            required
            v-model="user['email']"
            type="email"
            class="form-control"
            placeholder="Enter Your Email"
          />
        </div>
        <div class="form-group">
          <label for="#">Password</label>
          <input
            required
            v-model="user['password']"
            type="password"
            class="form-control"
            placeholder="Enter Password"
          />
        </div>
        <button type="submit" class="btn btn-primary px-4">Login</button>
        <hr />
        <p>
          To create new account
          <a @click.prevent="hideModalLogin" href="#" v-b-modal.modal-register
            >register here</a
          >
        </p>
      </form>
    </b-modal>
    <b-modal
      id="modal-register"
      ref="modal-register"
      title="Register"
      :hide-footer="true"
      @show="resetModalRegister"
      @hidden="resetModalRegister"
    >
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="#">Name</label>
          <input
            autofocus
            required
            v-model="user['name']"
            type="text"
            class="form-control"
            placeholder="Enter Your Name"
          />
        </div>
        <div class="form-group">
          <label for="#">Email</label>
          <input
            required
            v-model="user['email']"
            type="email"
            class="form-control"
            placeholder="Enter Your Email"
          />
        </div>
        <div class="form-group">
          <label for="#">Password</label>
          <input
            required
            v-model="user['password']"
            type="password"
            class="form-control"
            placeholder="Enter Password"
          />
        </div>
        <button type="submit" class="btn btn-primary px-4">Register</button>
      </form>
    </b-modal>
  </section>
</template>

<script>
export default {
  name: "navbar",
  computed: {
    token() {
      return this.$store.state.token;
    },
    user: {
      get() {
        return this.$store.state.user;
      },
      set(val) {
        return this.$store.commit("updateUser", val);
      }
    }
  },
  methods: {
    login() {
      this.$store.dispatch("login").then(() => {
        this.hideModalLogin();
      });
    },

    register() {
      this.$store.dispatch("register").then(() => {
        this.hideModalRegister();
      });
    },

    logout() {
      this.$store.dispatch("logout");
    },

    resetModalLogin() {
      this.user["email"] = "";
      this.user["password"] = "";
    },
    hideModalLogin() {
      this.$refs["modal-login"].hide();
    },
    resetModalRegister() {
      this.user["name"] = "";
      this.user["email"] = "";
      this.user["password"] = "";
    },
    hideModalRegister() {
      this.$refs["modal-register"].hide();
    }
  }
};
</script>

<style></style>
