<template>
  <div class="ininav">
    <nav id="nav1" class="px-4" v-if="isLogin">
      <div></div>
      <div class="redcode">
        <img src="../assets/logo.svg" height="45px" alt />
      </div>
      <div class="logout">
        <b-button @click="ouut" variant="outline-light" size="sm" class="mt-2 outin">Log Out</b-button>
      </div>
    </nav>
    <nav id="nav12" class="px-4" v-else>
      <div class="redcode">
        <img src="../assets/logo.svg" height="45px" alt />
      </div>
      <div class="login">
    <login v-if="!isLogin"></login>
      </div>
    </nav>
    <nav id="nav2" class="px-4">
      <div class="date">
        <p>{{today}}</p>
      </div>
    </nav>
  </div>
</template>

<script>
import Login from '../components/Login.vue'
export default {
  name: 'navbar',
  components: {
    Login
  },
  data () {
    return {
      modalShow: false
    }
  },
  computed: {
    today () {
      return new Date().toDateString()
    },
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    ouut(){
      this.$store.commit("SET_ISLOGIN", false)
      this.$router.push('/')
    }
  },
}
</script>

<style scoped>
.ininav {
  z-index: 99;
}
#nav1 {
  height: 6vh;
  width: 100vw;
  background-color: black;
  display: flex;
  justify-content: space-between
}
#nav2 {
  height: 4vh;
  width: 100vw;
  background-color: #bbbbbb;
  display: flex;
  justify-content: flex-end;
}
#nav12 {
  height: 6vh;
  width: 100vw;
  background-color: black;
  display: flex;
  justify-content: space-between;
}
p {
  margin-top: 3px;
  display: flex;
  font-weight: 800;
  align-self: center;
}
.outin{
  display: flex;
  justify-self: flex-end
}
</style>
