<template>
  <div>
    <b-navbar toggleable="lg" variant="light" class="fixed-top nav-style">
        <b-navbar-brand href="#" v-if="!this.$store.state.isLogin"><img src="../assets/logo.png" alt="logooverflow" style="width:25px; margin-bottom:10px;"><img @click="home()" src="../assets/overflow.png" alt="logo" class="logo"></b-navbar-brand>
        <b-navbar-brand href="#" v-if="this.$store.state.isLogin"><img src="../assets/logo.png" alt="logooverflow" style="width:25px; margin-bottom:10px;"><img @click="questions()" src="../assets/overflow.png" alt="logo" class="logo"></b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="!this.$store.state.isLogin">
            <b-nav-item href="#" @click="questions()">Question</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-if="this.$store.state.isLogin">
            <b-nav-item href="#" @click="myquestion()">My Question</b-nav-item>
        </b-navbar-nav>
        <b-nav-form class="search-bar mx-auto">
            <b-form-input size="sm" class="mr-sm-2 searchform" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0 btn-color" type="submit">Search</b-button>
        </b-nav-form>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="mx-auto" v-if="!this.$store.state.isLogin">
            <!-- Using 'button-content' slot -->
            <b-navbar-nav right>
                <router-link to="/login"><p class="login">Get Started</p></router-link>
            </b-navbar-nav>
        </b-navbar-nav>
        <b-navbar-nav class="mx-auto" v-if="this.$store.state.isLogin">
            <!-- Using 'button-content' slot -->
            <b-navbar-nav right>
                <img :src="this.$store.state.img" alt="">
                <!-- <router-link to="/login"><p class="login">Logout</p></router-link> -->
                <button class="ask" @click="ask()"><i class="fas fa-question-circle pt-1"></i></button>
                <button class="logout" @click="logout()">Logout</button>
            </b-navbar-nav>
        </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      isLogin: this.$store.state.isLogin
    }
  },
  methods: {
    home () {
      this.$router.push('/')
    },
    questions () {
      this.$router.push('/questions')
    },
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/')
    },
    ask () {
      this.$router.push('/ask')
    },
    myquestion () {
      this.$router.push('/myquestion')
    }
  }
}
</script>

<style>
.btn-color {
    background-color: #f48024 !important;
    border: none !important;
}
.nav-style {
    color: gray;
    box-shadow: 1px 1px 1px rgba(189, 195, 199,.8);
}
.logo {
    width: 6vw;
    margin-left: 10px;
    margin-bottom: 8px;
}
i {
    font-size: 25px;
}
.search-bar {
    width: 68vw;
}
.searchform {
    width: 90% !important;
}
.login {
    color: #f48024;
    font-weight: bold;
    margin-top: 10px;
    text-decoration: none !important;
}
.logout {
    background-color: #f48024;
    border: none;
    color: white;
}
.ask {
    background-color: #d35400;
    border: none;
    color: white;
}
</style>
