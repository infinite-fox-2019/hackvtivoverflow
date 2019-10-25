<template>
    <b-navbar class="nav is-light" style="padding-left: 10% !important; padding-right: 10% !important">
        <template slot="brand" >
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
              <img src="../assets/l.jpg" alt="">
              <h6 class="title is-5">Hacktiv8-Overflow</h6>
            </b-navbar-item>
            <FormSearch />
        </template>
        <template slot="end">
            <b-navbar-item tag="div">
                <div v-if="!isLogin" class="buttons">
                  <b-dropdown hoverable position="is-bottom-left" aria-role="menu">
                    <b class="navbar-item button is-info nav-link" slot="trigger" role="button">
                      <span>Login</span>
                      <b-icon icon="menu-down"></b-icon>
                    </b>
                    <b-dropdown-item custom aria-role="menuitem">
                      <FormLogin></FormLogin>
                    </b-dropdown-item>
                  </b-dropdown>
                </div>
                <div v-else class="buttons">
                    <a @click="logout" class="button is-info">
                        <strong>Logout</strong>
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
import FormLogin from '../components/form/FormLogin'
import FormSearch from '../components/form/FormSearch'

export default {
  name: 'Navbar',
  components: {
    FormLogin,
    FormSearch
  },
  data () {
    return {
      username: '',
      email: '',
      password: '',
      isFullPage: true
    }
  },
  methods: {
    register () {
      let data = {
        username: this.username,
        email: this.email,
        password: this.password
      }
      const loadingComponent = this.$buefy.loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      })
      this.$store.dispatch('register', data)
        .then(({ data }) => {
          this.$store.dispatch('auth')
          this.$store.dispatch('getUsername')
          setTimeout(() => loadingComponent.close(), 1 * 1000)
          setTimeout(() => {
            this.$buefy.toast.open({
              message: `Register success`,
              type: 'is-success'
            })
          }, 1200)
          this.$router.push('/')
        })
        .catch(err => {
          setTimeout(() => loadingComponent.close(), 1 * 1000)
          this.$buefy.toast.open({
            message: `${err}`,
            type: 'is-danger'
          })
          this.username = ''
          this.email = ''
          this.password = ''
        })
    },
    logout () {
      localStorage.clear()
      this.$store.dispatch('auth')
      this.$buefy.toast.open({
        message: `Logout success`,
        type: 'is-success'
      })
      this.username = ''
      this.$router.push('/')
    }
  },
  computed: {
    isLogin: {
      get () {
        return this.$store.state.isLogin
      }
    }
  },
  watch: {
    isLogin () {}
  },
  created () {
    this.$store.dispatch('auth')
    // this.x = this.$store.
  }
}
</script>
<style scoped>
  .button {
    padding: 0 5px;
  }
  .buttons {
    margin: auto !important;
  }
  .nav {
    padding: auto 10%;
  }
</style>
