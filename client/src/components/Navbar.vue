<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">H8-Overflow</b-navbar-brand>

    <button v-if="$store.state.isLogin===false" @click="toLogin" class="btn btn-primary ml-auto">LOGIN</button>

    <b-navbar-toggle v-if="this.$store.state.isLogin == true" target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-if="$store.state.isLogin===true">
        <h6 class="mb-0 text-white"> <strong> Hello ! {{$store.state.username}} </strong></h6>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!-- <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form> -->

        <b-nav-item-dropdown v-if="this.$store.state.isLogin == true" right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item @click="signOut" href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
  methods: {
    toLogin () {
      this.$store.dispatch('inLoginPage', true)
    },
    signOut () {
      localStorage.removeItem('token')
      this.$store.commit('SIGNOUT', false)
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
