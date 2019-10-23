<template>
  <div class="background">
      <sidebar></sidebar>
      <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
export default {
  name: 'questions',
  components: {
    Sidebar
  },
  computed: {
    isLogin(){
    return  this.$store.state.isLogin
    }
  },
  created() {
    if (this.isLogin){
      this.$store.dispatch('getMyAcc')
    }
  },
}
</script>

<style>
.background{
    display: flex;
}
sidebar{
    align-self: flex-start;
    min-height: 100vh
}
router-view{
  width: calc(100vw - 17vw)
}

</style>
