<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">Hacktiv Overflow</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
       
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#" disabled>{{ username }}</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>User</em>
          </template>
            <b-dropdown-item href="#">
              <router-link to='/login' v-if='!status'> Login </router-link>
            </b-dropdown-item>
            <div v-if='status'>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#" @click='signout()'>Sign Out</b-dropdown-item>
            </div>
        </b-nav-item-dropdown>
      </b-navbar-nav>
  </b-navbar>
</div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex';

export default {
  data () {
    return {
    }
  },
  name: 'home',
  components: {
  },
  methods: {
      signout () {
          this.$store.dispatch('signout');
      }
  },
  computed: {
      ...mapState(['islogin']),
      status () {
          return this.islogin
      },
      username () {
          return this.$store.state.user.username
      }
  }
}
</script>
