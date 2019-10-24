<template>
  <div class="navbar">
    <b-navbar toggleable="lg" type="dark" variant="dark" class="fixed-top">
      <b-navbar-brand to="/question" class="px-2">
        <i class="fab fa-stack-overflow"></i>
        H8<strong>overflow</strong>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item class="mx-2" to="/question">Question</b-nav-item>
        </b-navbar-nav>
        <form class="search_bar mx-2">
          <input type="text" placeholder="Search..." />
          <button type="submit" value="Search">Search</button>
        </form>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto px-2" v-if="!this.$store.state.isLogin">
          <b-nav-item class="mx-2" to="/login">Log in</b-nav-item>
          <b-button class="mx-2" variant="primary" to="/register">Register</b-button>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto px-2" v-if="this.$store.state.isLogin">
          <b-nav-item class="mx-2">{{ this.$store.state.user }}</b-nav-item>
          <b-button class="mx-2" variant="primary" @click="logout">Logout</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600);
.navbar {
  width: 100vw;
}
.search_bar {
  background: #fff;
  border: #b7b7b7 solid 1px;
  border-radius: 3px;
  box-shadow: 0 0 3px #ccc;
  position: relative;
  font-family: 'Source Sans Pro', sans-serif;
  width: 50vw;
}
.search_bar input[type=text] {
  border: none;
  box-shadow: none;
  font-weight: 600;
  font-size: 14px;
  width: 80%;
  padding: 0.5em;
  margin: 0;
  overflow: hidden;
}
.search_bar input[type=text]:focus {
  outline: none;
}
.search_bar button[type=submit] {
  background: linear-gradient(#237cd4, #1e6ab5);
  color: rgba(255, 255, 255, 0);
  border: 1px solid #1c62a8;
  width: 10%;
  min-width: 56px;
  position: absolute;
  top: -1px;
  right: -1px;
  bottom: -1px;
  border-radius: 0 3px 3px 0;
  margin: 0;
  user-select: none;
}
.search_bar button[type=submit]:after {
  content: '';
  position: absolute;
  top: 18%;
  right: 0;
  bottom: 22%;
  left: 4%;
  background: url("http://media.lib.byu.edu/assets/images/searchbar/1.0/search-icon.svg") no-repeat center center;
  background-size: contain;
}
.search_bar button[type=submit]:hover, .search_bar button[type=submit]:focus {
  background: linear-gradient(#38d, #2174c7);
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}
.search_bar ::placeholder {
  font-weight: 400;
}

</style>
