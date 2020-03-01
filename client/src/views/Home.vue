<template>
  <div class="home">
    <div class="box">
      <br>
      <img src="../assets/logo.svg" @click="login" alt="">
      <br>
      <router-link to="/register"><h4>Create Account</h4></router-link>
      <router-link to="/questions"><h6>Looking for Anwer?</h6></router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
  },
  methods: {
    login () {
      this.$store.commit('CHANGE_SHOWLOGIN', true)
    }
  }
}
</script>

<style scoped>
.home {
  background: url(../assets/ld.jpeg);
  background-repeat: no-repeat;
  background-size: 100%;
  height: calc(100vh - 10vh);
  display: flex;
  justify-content: center;
}
.box{
  display: flex;
  flex-direction: column;
  background: rgba(71, 67, 67, 0.678);
  width: 550px;
  margin-top: 21vh;
  height: 250px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 14px 12px 0 rgba(0, 0, 0, 0.19);
}
h4{
  color: white
}
h6{
  color: white
}
</style>
