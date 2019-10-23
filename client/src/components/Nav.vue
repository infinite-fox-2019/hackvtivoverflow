<template>
<div class='container'>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#"><router-link to='/'>Hacktiv Overflow</router-link></b-navbar-brand>
       
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#" disabled v-if='userr'>{{userr}}</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search Title" v-model='searchTitle'></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="button"><router-link :to='{ name: "search", params: { name: searchTitle } }'>Search</router-link></b-button>

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
      userr: '',
      searchTitle: ''
    }
  },
  name: 'home',
  components: {
  },
  methods: {
      signout () {
          this.$store.dispatch('signout');
          this.$router.push('/')
          this.$awn.info('please comeback again :)')
      },
      search () {
        const title = this.searchTitle;
        axios
      }
  },
  computed: {
      ...mapState(['islogin', 'user']),
      status () {
          return this.islogin
      }
  },
  created () {
    this.userr = this.$store.state.user.username
  }
}
</script>
